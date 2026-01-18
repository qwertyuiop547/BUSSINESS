/**
 * API Key Repository
 * 
 * Data access layer for API keys.
 */

const { prisma } = require('../../config/database');

class ApiKeyRepository {
  /**
   * Create API key
   */
  async create(data) {
    return prisma.apiKey.create({
      data,
    });
  }

  /**
   * Find API key by key string
   */
  async findByKey(key) {
    return prisma.apiKey.findUnique({
      where: { key },
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
  }

  /**
   * Find API key by ID
   */
  async findById(id) {
    return prisma.apiKey.findUnique({
      where: { id },
    });
  }

  /**
   * Get user's API keys
   */
  async findByUser(userId) {
    return prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        key: true,
        isActive: true,
        lastUsedAt: true,
        requestCount: true,
        createdAt: true,
      },
    });
  }

  /**
   * Update API key
   */
  async update(id, data) {
    return prisma.apiKey.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete API key
   */
  async delete(id) {
    return prisma.apiKey.delete({
      where: { id },
    });
  }

  /**
   * Count user's API keys
   */
  async countByUser(userId) {
    return prisma.apiKey.count({
      where: { userId },
    });
  }
}

module.exports = new ApiKeyRepository();
