/**
 * Cleanup Script
 * 
 * Deletes:
 * 1. All Facebook services with type "Select"
 * 2. APIseller provider and all its services
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Starting cleanup...\n');

  try {
    // 1. Find and delete Facebook Select type services
    console.log('📋 Finding Facebook Select services...');
    const facebookSelectServices = await prisma.service.findMany({
      where: {
        platform: 'FACEBOOK',
        type: {
          contains: 'Select',
          mode: 'insensitive',
        },
      },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });

    console.log(`Found ${facebookSelectServices.length} Facebook Select services`);
    
    if (facebookSelectServices.length > 0) {
      for (const service of facebookSelectServices) {
        console.log(`  - ${service.name} (${service.type}) - ${service._count.orders} orders`);
      }

      const deleteResult = await prisma.service.deleteMany({
        where: {
          platform: 'FACEBOOK',
          type: {
            contains: 'Select',
            mode: 'insensitive',
          },
        },
      });

      console.log(`✅ Deleted ${deleteResult.count} Facebook Select services\n`);
    } else {
      console.log('✅ No Facebook Select services found\n');
    }

    // 2. Find and delete APIseller provider
    console.log('📋 Finding APIseller provider...');
    const apisellerProvider = await prisma.provider.findFirst({
      where: {
        name: {
          contains: 'APIseller',
          mode: 'insensitive',
        },
      },
      include: {
        _count: {
          select: { services: true, orders: true },
        },
      },
    });

    if (apisellerProvider) {
      console.log(`Found provider: ${apisellerProvider.name}`);
      console.log(`  - Services: ${apisellerProvider._count.services}`);
      console.log(`  - Orders: ${apisellerProvider._count.orders}`);

      // First, delete all services linked to this provider
      if (apisellerProvider._count.services > 0) {
        console.log('\n📋 Deleting services linked to APIseller...');
        const deletedServices = await prisma.service.deleteMany({
          where: {
            providerId: apisellerProvider.id,
          },
        });
        console.log(`✅ Deleted ${deletedServices.count} services`);
      }

      // Then delete the provider
      console.log('\n📋 Deleting APIseller provider...');
      await prisma.provider.delete({
        where: {
          id: apisellerProvider.id,
        },
      });
      console.log(`✅ Deleted provider: ${apisellerProvider.name}\n`);
    } else {
      console.log('✅ No APIseller provider found\n');
    }

    console.log('✨ Cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
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
