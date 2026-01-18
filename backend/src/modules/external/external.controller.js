/**
 * External API Controller
 * 
 * Handles external/reseller API requests.
 * Compatible with standard SMM panel API format.
 */

const externalApiService = require('./external.service');

class ExternalApiController {
  /**
   * POST /external/v1
   * 
   * Single endpoint for all actions (standard SMM API format)
   */
  async handleRequest(req, res, next) {
    try {
      const { action, ...params } = req.body;
      const userId = req.apiKey.userId;

      let result;

      switch (action) {
        case 'balance':
          result = await externalApiService.getBalance(userId);
          break;

        case 'services':
          result = await externalApiService.getServices();
          break;

        case 'add':
          if (!params.service || !params.link || !params.quantity) {
            return res.json({ error: 'Missing required parameters' });
          }
          result = await externalApiService.addOrder(
            userId,
            parseInt(params.service),
            params.link,
            parseInt(params.quantity)
          );
          break;

        case 'status':
          if (!params.order) {
            return res.json({ error: 'Missing order parameter' });
          }
          result = await externalApiService.getOrderStatus(
            userId,
            parseInt(params.order)
          );
          break;

        case 'orders':
          if (!params.orders) {
            return res.json({ error: 'Missing orders parameter' });
          }
          const orderNumbers = params.orders.split(',').map((n) => parseInt(n.trim()));
          result = await externalApiService.getMultipleOrderStatus(userId, orderNumbers);
          break;

        case 'refill':
          if (!params.order) {
            return res.json({ error: 'Missing order parameter' });
          }
          result = await externalApiService.createRefill(userId, parseInt(params.order));
          break;

        case 'refill_status':
          if (!params.refill) {
            return res.json({ error: 'Missing refill parameter' });
          }
          result = await externalApiService.getRefillStatus(
            userId,
            parseInt(params.refill)
          );
          break;

        case 'cancel':
          if (!params.orders) {
            return res.json({ error: 'Missing orders parameter' });
          }
          const cancelNumbers = params.orders.split(',').map((n) => parseInt(n.trim()));
          result = await externalApiService.cancelOrders(userId, cancelNumbers);
          break;

        default:
          return res.json({ error: 'Invalid action' });
      }

      return res.json(result);
    } catch (error) {
      // External API returns errors in JSON format
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * GET /external/v2/balance
   */
  async getBalance(req, res, next) {
    try {
      const result = await externalApiService.getBalance(req.apiKey.userId);
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * GET /external/v2/services
   */
  async getServices(req, res, next) {
    try {
      const result = await externalApiService.getServices();
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * POST /external/v2/order
   */
  async addOrder(req, res, next) {
    try {
      const { service, link, quantity } = req.body;
      const result = await externalApiService.addOrder(
        req.apiKey.userId,
        service,
        link,
        quantity
      );
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * GET /external/v2/order/:id
   */
  async getOrderStatus(req, res, next) {
    try {
      const result = await externalApiService.getOrderStatus(
        req.apiKey.userId,
        parseInt(req.params.id)
      );
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * POST /external/v2/orders/status
   */
  async getMultipleOrderStatus(req, res, next) {
    try {
      const { orders } = req.body;
      const orderNumbers = orders.split(',').map((n) => parseInt(n.trim()));
      const result = await externalApiService.getMultipleOrderStatus(
        req.apiKey.userId,
        orderNumbers
      );
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * POST /external/v2/refill
   */
  async createRefill(req, res, next) {
    try {
      const { order } = req.body;
      const result = await externalApiService.createRefill(
        req.apiKey.userId,
        order
      );
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * GET /external/v2/refill/:id
   */
  async getRefillStatus(req, res, next) {
    try {
      const result = await externalApiService.getRefillStatus(
        req.apiKey.userId,
        parseInt(req.params.id)
      );
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * POST /external/v2/cancel
   */
  async cancelOrders(req, res, next) {
    try {
      const { orders } = req.body;
      const orderNumbers = orders.split(',').map((n) => parseInt(n.trim()));
      const result = await externalApiService.cancelOrders(
        req.apiKey.userId,
        orderNumbers
      );
      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message || 'Internal server error' });
    }
  }
}

module.exports = new ExternalApiController();
