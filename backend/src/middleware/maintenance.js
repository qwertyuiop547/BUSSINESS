/**
 * Maintenance Mode Middleware
 * 
 * Blocks non-admin users when maintenance mode is enabled.
 * Caches the setting to avoid database hits on every request.
 */

const { prisma } = require('../config/database');
const { errorResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Cache maintenance mode status (refresh every 30 seconds)
let maintenanceCache = {
  enabled: false,
  expiry: null,
  reason: null,
  lastChecked: 0,
};
const CACHE_TTL = 30 * 1000; // 30 seconds

// Skip paths during maintenance mode
const SKIP_PATHS = [
  '/health',
  '/v1/auth/login',
  '/v1/auth/register',
  '/v1/auth/refresh',
  '/v1/auth/forgot-password',
  '/v1/auth/reset-password',
  '/v1/public',
  '/v1/admin', // Allow admin endpoints to always work
];

/**
 * Get maintenance mode status from database (with caching)
 */
async function getMaintenanceStatus() {
  const now = Date.now();
  
  // Return cached value if still valid
  if (now - maintenanceCache.lastChecked < CACHE_TTL) {
    // Check if maintenance mode has expired
    if (maintenanceCache.expiry && now > maintenanceCache.expiry) {
      // Maintenance mode has expired, disable it
      await disableExpiredMaintenance();
      return false;
    }
    return maintenanceCache.enabled;
  }

  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'maintenanceMode' },
    });

    let enabled = false;
    let expiry = null;
    
    if (setting && setting.value !== null) {
      // Handle different value formats
      if (typeof setting.value === 'boolean') {
        enabled = setting.value;
      } else if (typeof setting.value === 'string') {
        enabled = setting.value === 'true' || setting.value === '1';
      } else if (typeof setting.value === 'object' && setting.value !== null) {
        // New format: { enabled: boolean, expiry?: number, reason?: string }
        enabled = Boolean(setting.value.enabled);
        expiry = setting.value.expiry || null;
        
        // Check if maintenance mode has expired
        if (expiry && now > expiry) {
          // Maintenance mode has expired, disable it
          await disableExpiredMaintenance();
          enabled = false;
          expiry = null;
        }
      }
    }

    // Update cache
    maintenanceCache = {
      enabled,
      expiry,
      lastChecked: now,
    };

    return enabled;
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
    // On error, use cached value or default to false
    return maintenanceCache.enabled;
  }
}

/**
 * Clear the maintenance cache (call this when settings are updated)
 */
function clearMaintenanceCache() {
  maintenanceCache.lastChecked = 0;
}

/**
 * Check if the request is from an admin user
 */
async function isAdminRequest(req) {
  try {
    // Check if user is already attached (from auth middleware)
    if (req.user && req.user.role === 'ADMIN') {
      return true;
    }

    // Try to decode token to check if admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { role: true, status: true },
      });

      if (user && user.status === 'ACTIVE' && user.role === 'ADMIN') {
        return true;
      }
    } catch (error) {
      console.warn('Invalid token in maintenance check:', error.message);
      return false;
    }

    return false;
  } catch (error) {
    console.warn('Error checking admin status:', error.message);
    return false;
  }
}

/**
 * Maintenance mode middleware
 * Blocks access for non-admin users when maintenance mode is enabled
 */
const maintenanceMode = async (req, res, next) => {
  try {
    // Skip for certain paths (allow auth and public endpoints)
    if (SKIP_PATHS.some(path => req.path.startsWith(path))) {
      return next();
    }

    // Check maintenance status
    const isMaintenanceEnabled = await getMaintenanceStatus();

    if (!isMaintenanceEnabled) {
      return next();
    }

    // Allow admin users to bypass maintenance mode
    const isAdmin = await isAdminRequest(req);
    if (isAdmin) {
      console.log(`Admin user accessed ${req.method} ${req.path} during maintenance`);
      return next();
    }

    // Block access for non-admin users
    console.log(`Blocked ${req.method} ${req.path} from ${req.ip || 'unknown'} during maintenance`);
    return errorResponse(res, 'System is under maintenance. Please try again later.', 503, {
      maintenance: true,
      retryAfter: 300, // Suggest retry after 5 minutes
    });
  } catch (error) {
    console.error('Maintenance middleware error:', error);
    // On error, allow request to proceed to avoid blocking legitimate traffic
    next();
  }
};

/**
 * Maintenance check endpoint (public)
 * Returns maintenance status without blocking
 */
const getMaintenanceStatusHandler = async (req, res) => {
  try {
    const now = Date.now();
    
    // Get raw setting to include expiry info
    const setting = await prisma.setting.findUnique({
      where: { key: 'maintenanceMode' },
    });
    
    let response = {
      maintenance: false,
      expiry: null,
      timeRemaining: null,
      reason: null
    };
    
    if (setting && setting.value !== null) {
      if (typeof setting.value === 'boolean') {
        response.maintenance = setting.value;
      } else if (typeof setting.value === 'string') {
        response.maintenance = setting.value === 'true' || setting.value === '1';
      } else if (typeof setting.value === 'object' && setting.value !== null) {
        // New format: { enabled: boolean, expiry?: number, reason?: string }
        response.maintenance = Boolean(setting.value.enabled);
        response.expiry = setting.value.expiry || null;
        response.reason = setting.value.reason || null;
        
        // Calculate time remaining if there's an expiry
        if (response.expiry) {
          const timeLeft = response.expiry - now;
          response.timeRemaining = Math.max(0, timeLeft);
          
          // If expired, disable maintenance mode
          if (timeLeft <= 0) {
            await disableExpiredMaintenance();
            response.maintenance = false;
            response.timeRemaining = 0;
          }
        }
      }
    }
    
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error getting maintenance status:', error);
    res.json({
      success: true,
      data: {
        maintenance: false,
        expiry: null,
        timeRemaining: null,
        reason: null
      },
    });
  }
};

// Utility function to get detailed maintenance status
async function getDetailedMaintenanceStatus() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'maintenanceMode' },
    });
    
    if (!setting || !setting.value) {
      return {
        enabled: false,
        reason: null,
        expiry: null,
        timeRemaining: null,
      };
    }
    
    if (typeof setting.value === 'boolean') {
      return {
        enabled: setting.value,
        reason: null,
        expiry: null,
        timeRemaining: null,
      };
    } else if (typeof setting.value === 'string') {
      return {
        enabled: setting.value === 'true' || setting.value === '1',
        reason: null,
        expiry: null,
        timeRemaining: null,
      };
    } else if (typeof setting.value === 'object' && setting.value !== null) {
      const now = Date.now();
      const expiry = setting.value.expiry || null;
      let timeRemaining = null;
      
      if (expiry) {
        timeRemaining = Math.max(0, expiry - now);
      }
      
      return {
        enabled: Boolean(setting.value.enabled),
        reason: setting.value.reason || null,
        expiry,
        timeRemaining,
      };
    }
    
    return {
      enabled: false,
      reason: null,
      expiry: null,
      timeRemaining: null,
    };
  } catch (error) {
    console.error('Error getting detailed maintenance status:', error);
    return {
      enabled: false,
      reason: null,
      expiry: null,
      timeRemaining: null,
    };
  }
}

module.exports = {
  maintenanceMode,
  getMaintenanceStatus,
  getMaintenanceStatusHandler,
  clearMaintenanceCache,
  getDetailedMaintenanceStatus,
};

// Function to disable expired maintenance mode
async function disableExpiredMaintenance() {
  try {
    await prisma.setting.upsert({
      where: { key: 'maintenanceMode' },
      update: {
        value: { enabled: false },
        updatedAt: new Date(),
      },
      create: {
        key: 'maintenanceMode',
        value: { enabled: false },
      },
    });
    
    // Clear cache to refresh the status
    clearMaintenanceCache();
    console.log('Maintenance mode automatically disabled - expiry reached');
  } catch (error) {
    console.error('Error disabling expired maintenance mode:', error);
  }
}
