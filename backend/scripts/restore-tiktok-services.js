/**
 * Restore TikTok Services
 * 
 * This will restore TikTok services from seed file
 * but without linking them to any provider
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Restoring TikTok services...\n');

  try {
    // Get TikTok category
    const tiktokCat = await prisma.category.findUnique({ 
      where: { slug: 'tiktok' } 
    });

    if (!tiktokCat) {
      console.log('❌ TikTok category not found. Creating it...');
      const newCat = await prisma.category.create({
        data: {
          name: 'TikTok',
          slug: 'tiktok',
          description: 'TikTok services',
          sortOrder: 3,
        },
      });
      console.log('✅ Created TikTok category');
    }

    const categoryId = tiktokCat?.id || (await prisma.category.findUnique({ where: { slug: 'tiktok' } })).id;

    // TikTok services to restore (from seed file)
    const tiktokServices = [
      {
        categoryId,
        providerId: null, // No provider link
        name: 'TikTok Followers',
        description: 'TikTok followers. Fast delivery.',
        platform: 'TIKTOK',
        type: 'followers',
        rate: 3.0000,
        minQuantity: 100,
        maxQuantity: 100000,
        providerServiceId: null, // No provider service ID
        providerRate: null,
        isDripFeed: true,
        isRefill: true,
        averageTime: '0-12 hours',
        sortOrder: 1,
        isActive: true,
      },
      {
        categoryId,
        providerId: null,
        name: 'TikTok Likes',
        description: 'TikTok video likes.',
        platform: 'TIKTOK',
        type: 'likes',
        rate: 1.0000,
        minQuantity: 50,
        maxQuantity: 50000,
        providerServiceId: null,
        providerRate: null,
        isDripFeed: false,
        isRefill: false,
        averageTime: '0-1 hour',
        sortOrder: 2,
        isActive: true,
      },
      {
        categoryId,
        providerId: null,
        name: 'TikTok Views',
        description: 'TikTok video views. Instant start.',
        platform: 'TIKTOK',
        type: 'views',
        rate: 0.3000,
        minQuantity: 500,
        maxQuantity: 1000000,
        providerServiceId: null,
        providerRate: null,
        isDripFeed: false,
        isRefill: false,
        averageTime: '0-15 minutes',
        sortOrder: 3,
        isActive: true,
      },
    ];

    console.log(`Creating ${tiktokServices.length} TikTok services...\n`);

    for (const serviceData of tiktokServices) {
      // Check if service already exists
      const existing = await prisma.service.findFirst({
        where: {
          platform: 'TIKTOK',
          type: serviceData.type,
          name: serviceData.name,
        },
      });

      if (existing) {
        console.log(`⏭️  Skipping ${serviceData.name} (already exists)`);
        continue;
      }

      const service = await prisma.service.create({
        data: serviceData,
      });

      console.log(`✅ Created: ${service.name}`);
    }

    console.log('\n✨ TikTok services restored successfully!');
    console.log('💡 Note: These services are not linked to any provider.');
    console.log('   You can link them to your provider later through the admin panel.');

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
