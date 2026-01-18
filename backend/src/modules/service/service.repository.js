/**
 * Service Repository
 * 
 * Data access layer for SMM services.
 */

const { prisma } = require('../../config/database');

class ServiceRepository {
  /**
   * Get all active services
   */
  async findAll({ skip, take, where, orderBy }) {
    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where: { ...where, isActive: true },
        skip,
        take,
        orderBy,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.service.count({ where: { ...where, isActive: true } }),
    ]);

    return { data, total };
  }

  /**
   * Get service by ID
   */
  async findById(id) {
    return prisma.service.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
        provider: {
          select: { id: true, name: true, status: true },
        },
      },
    });
  }

  /**
   * Get services by category
   */
  async findByCategory(categoryId, { skip, take }) {
    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where: { categoryId, isActive: true },
        skip,
        take,
        orderBy: { sortOrder: 'asc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.service.count({ where: { categoryId, isActive: true } }),
    ]);

    return { data, total };
  }

  /**
   * Get services by platform
   */
  async findByPlatform(platform, { skip, take }) {
    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where: { platform, isActive: true },
        skip,
        take,
        orderBy: { sortOrder: 'asc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.service.count({ where: { platform, isActive: true } }),
    ]);

    return { data, total };
  }

  /**
   * Get all categories
   */
  async findAllCategories() {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { services: { where: { isActive: true } } },
        },
      },
    });
  }

  /**
   * Get category by slug
   */
  async findCategoryBySlug(slug) {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  /**
   * Search services
   */
  async search(query, { skip, take }) {
    const where = {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    };

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take,
        orderBy: { sortOrder: 'asc' },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.service.count({ where }),
    ]);

    return { data, total };
  }
}

module.exports = new ServiceRepository();
