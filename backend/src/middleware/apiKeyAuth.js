/**
 * API Key Authentication Middleware
 * 
 * Validates API keys for external/reseller API endpoints.
 */

const { prisma } = require('../config/database');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Authenticate via API key (for reseller endpoints)
 */
const authenticateApiKey = async (req, res, next) => {
  try {
    // Get API key from header or query
    const apiKey = req.headers['x-api-key'] || req.query.key;

    if (!apiKey) {
      return errorResponse(res, 'API key required', 401);
    }

    // Find API key in database
    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
            status: true,
            balance: true,
          },
        },
      },
    });

    if (!keyRecord) {
      return errorResponse(res, 'Invalid API key', 401);
    }

    if (!keyRecord.isActive) {
      return errorResponse(res, 'API key is deactivated', 401);
    }

    if (keyRecord.user.status !== 'ACTIVE') {
      return errorResponse(res, 'Account is not active', 403);
    }

    // Update last used timestamp (don't await, fire and forget)
    prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: {
        lastUsedAt: new Date(),
        requestCount: { increment: 1 },
      },
    }).catch(console.error);

    // Attach key and user to request
    req.apiKey = keyRecord;
    req.user = keyRecord.user;

    next();
  } catch (error) {
    console.error('API key auth error:', error);
    return errorResponse(res, 'Authentication failed', 500);
  }
};

module.exports = {
  authenticateApiKey,
};
