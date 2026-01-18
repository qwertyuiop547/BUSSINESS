/**
 * Check what services were deleted
 * This script checks the seed file to see what services should exist
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('📋 Checking current services in database...\n');

  try {
    // Check current services
    const currentServices = await prisma.service.findMany({
      include: {
        category: true,
        provider: true,
      },
      orderBy: [
        { category: { sortOrder: 'asc' } },
        { sortOrder: 'asc' },
      ],
    });

    console.log(`Current services in database: ${currentServices.length}\n`);

    if (currentServices.length === 0) {
      console.log('⚠️  No services found. All services were deleted.');
      console.log('\n💡 You can restore services by:');
      console.log('   1. Running: npm run db:seed (to restore from seed file)');
      console.log('   2. Or manually adding services through admin panel');
    } else {
      console.log('Current services by platform:');
      const byPlatform = {};
      currentServices.forEach(service => {
        if (!byPlatform[service.platform]) {
          byPlatform[service.platform] = [];
        }
        byPlatform[service.platform].push(service);
      });

      Object.keys(byPlatform).forEach(platform => {
        console.log(`\n${platform}: ${byPlatform[platform].length} services`);
        byPlatform[platform].forEach(s => {
          console.log(`  - ${s.name} (${s.type})`);
        });
      });
    }

    // Check categories
    console.log('\n\n📋 Categories:');
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.slug})`);
    });

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
