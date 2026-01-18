/**
 * Suggestion Service
 */

const { prisma } = require('../../config/database');

class SuggestionService {
  /**
   * Create a new suggestion
   */
  async create(userId, data) {
    return prisma.suggestion.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        category: data.category || 'OTHER',
      },
      include: {
        user: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  /**
   * Get user's suggestions
   */
  async getUserSuggestions(userId, options = {}) {
    const { page = 1, limit = 10, status, category } = options;
    const skip = (page - 1) * limit;

    const where = { userId };
    if (status) where.status = status;
    if (category) where.category = category;

    const [data, total] = await Promise.all([
      prisma.suggestion.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.suggestion.count({ where }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get all suggestions (admin)
   */
  async getAll(options = {}) {
    const { page = 1, limit = 20, status, category, search } = options;
    const skip = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.suggestion.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ createdAt: 'desc' }],
        include: {
          user: {
            select: { id: true, username: true, email: true },
          },
        },
      }),
      prisma.suggestion.count({ where }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get suggestion by ID
   */
  async getById(id) {
    const suggestion = await prisma.suggestion.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true, email: true },
        },
      },
    });

    if (!suggestion) {
      throw { statusCode: 404, message: 'Suggestion not found' };
    }

    return suggestion;
  }

  /**
   * Update suggestion status (admin)
   */
  async updateStatus(id, status, adminId, adminNote = null) {
    const suggestion = await this.getById(id);

    return prisma.suggestion.update({
      where: { id },
      data: {
        status,
        adminNote,
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
      include: {
        user: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  /**
   * Delete suggestion (admin)
   */
  async delete(id) {
    await this.getById(id);
    return prisma.suggestion.delete({ where: { id } });
  }

  /**
   * Get suggestion stats (admin)
   */
  async getStats() {
    const [
      totalCount,
      pendingCount,
      underReviewCount,
      approvedCount,
      implementedCount,
      rejectedCount,
      categoryStats,
    ] = await Promise.all([
      prisma.suggestion.count(),
      prisma.suggestion.count({ where: { status: 'PENDING' } }),
      prisma.suggestion.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.suggestion.count({ where: { status: 'APPROVED' } }),
      prisma.suggestion.count({ where: { status: 'IMPLEMENTED' } }),
      prisma.suggestion.count({ where: { status: 'REJECTED' } }),
      prisma.suggestion.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
    ]);

    return {
      total: totalCount,
      pending: pendingCount,
      underReview: underReviewCount,
      approved: approvedCount,
      implemented: implementedCount,
      rejected: rejectedCount,
      byCategory: categoryStats.reduce((acc, item) => {
        acc[item.category] = item._count.category;
        return acc;
      }, {}),
    };
  }
}

module.exports = new SuggestionService();
