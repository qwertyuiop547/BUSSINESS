/**
 * Add Twitter (X.com) Monetization Views Services
 * Provider service IDs from the external SMM panel
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Profit margin: ₱16 per 1000
const PROFIT_MARGIN = 16;

// Twitter Monetization Views Services from provider
const twitterServices = [
    {
        providerServiceId: '4977',
        name: 'Twitter Analytics Views Monetization (Max 100M, 10M+ Day, Min 100)',
        providerRate: 3.1393,  // Provider rate per 1000
        minQuantity: 100,
        maxQuantity: 100000000,
        averageTime: '47 minutes',
    },
    {
        providerServiceId: '4978',
        name: 'Twitter Analytics Views Monetization (Max 100M, 10M+ Day, Min 1M)',
        providerRate: 1.8872,  // Provider rate per 1000
        minQuantity: 1000000,
        maxQuantity: 100000000,
        averageTime: '25 minutes',
    },
    {
        providerServiceId: '4979',
        name: 'Twitter Analytics Views Monetization (Max 100M, 10M+ Day, Min 5M)',
        providerRate: 0.9436,  // Provider rate per 1000
        minQuantity: 5000000,
        maxQuantity: 100000000,
        averageTime: '1 hour 43 minutes',
    },
];

async function main() {
    console.log('🐦 Adding Twitter Monetization Views services...\n');

    // Find or create Twitter category
    let twitterCategory = await prisma.category.findFirst({
        where: { slug: 'twitter' }
    });

    if (!twitterCategory) {
        console.log('📁 Creating Twitter category...');
        twitterCategory = await prisma.category.create({
            data: {
                name: 'Twitter',
                slug: 'twitter',
                description: 'Twitter/X services',
                sortOrder: 4,
                isActive: true,
            }
        });
        console.log('✅ Twitter category created!\n');
    }

    console.log(`📁 Using Twitter category: ${twitterCategory.name} (${twitterCategory.id})\n`);

    // Find provider (if exists)
    const provider = await prisma.provider.findFirst({
        where: { status: 'ACTIVE' }
    });

    let addedCount = 0;
    let skippedCount = 0;

    for (const service of twitterServices) {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
            where: {
                providerServiceId: service.providerServiceId,
                categoryId: twitterCategory.id,
            }
        });

        if (existing) {
            console.log(`⏭️  Skipped (exists): ${service.name}`);
            skippedCount++;
            continue;
        }

        // Calculate selling rate (provider rate + profit margin)
        const sellingRate = service.providerRate + PROFIT_MARGIN;

        // Create service
        await prisma.service.create({
            data: {
                categoryId: twitterCategory.id,
                providerId: provider?.id || null,
                name: service.name,
                description: `Twitter/X.com monetization views - ${service.averageTime} average delivery`,
                platform: 'TWITTER',
                type: 'Views',
                rate: sellingRate,
                minQuantity: service.minQuantity,
                maxQuantity: service.maxQuantity,
                providerServiceId: service.providerServiceId,
                providerRate: service.providerRate,
                isActive: true,
                isDripFeed: false,
                isRefill: false,
                averageTime: service.averageTime,
                sortOrder: parseInt(service.providerServiceId),
            }
        });

        console.log(`✅ Added: ${service.name}`);
        console.log(`   Provider Rate: ₱${service.providerRate.toFixed(4)} | Selling Rate: ₱${sellingRate.toFixed(4)} | Profit: ₱${PROFIT_MARGIN}/1000`);
        addedCount++;
    }

    console.log('\n========================================');
    console.log(`✅ Added: ${addedCount} services`);
    console.log(`⏭️  Skipped: ${skippedCount} services`);
    console.log('========================================\n');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
