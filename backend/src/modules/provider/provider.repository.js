/**
 * Provider Repository
 * 
 * Data access layer for providers.
 */

const { prisma } = require('../../config/database');

class ProviderRepository {
  /**
   * Get all providers
   */
  async findAll() {
    return prisma.provider.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { services: true, orders: true },
        },
      },
    });
  }

  /**
   * Get provider by ID
   */
  async findById(id) {
    return prisma.provider.findUnique({
      where: { id },
      include: {
        _count: {
          select: { services: true, orders: true },
        },
      },
    });
  }

  /**
   * Create provider
   */
  async create(data) {
    return prisma.provider.create({
      data,
    });
  }

  /**
   * Update provider
   */
  async update(id, data) {
    return prisma.provider.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete provider
   */
  async delete(id) {
    return prisma.provider.delete({
      where: { id },
    });
  }

  /**
   * Get active providers
   */
  async findActive() {
    return prisma.provider.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Update provider balance
   */
  async updateBalance(id, balance) {
    return prisma.provider.update({
      where: { id },
      data: { balance },
    });
  }
}

module.exports = new ProviderRepository();
