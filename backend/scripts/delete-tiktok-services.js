/**
 * Delete TikTok Services
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Deleting TikTok services...\n');

  try {
    // Find all TikTok services
    const tiktokServices = await prisma.service.findMany({
      where: {
        platform: 'TIKTOK',
      },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });

    console.log(`Found ${tiktokServices.length} TikTok services`);

    if (tiktokServices.length > 0) {
      for (const service of tiktokServices) {
        console.log(`  - ${service.name} (${service.type}) - ${service._count.orders} orders`);
      }

      // Delete all TikTok services
      const deleteResult = await prisma.service.deleteMany({
        where: {
          platform: 'TIKTOK',
        },
      });

      console.log(`\n✅ Deleted ${deleteResult.count} TikTok services`);
    } else {
      console.log('✅ No TikTok services found');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
