/**
 * Add Twitter Interactions Vote Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-interactions-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Interactions Vote services...\n');

    // Get Twitter / X category
    let twitterCat = await prisma.category.findFirst({ 
        where: { 
            OR: [
                { name: { contains: 'Twitter' } },
                { slug: { contains: 'twitter' } }
            ]
        } 
    });

    if (!twitterCat) {
        console.log('📁 Creating Twitter / X category...');
        twitterCat = await prisma.category.create({
            data: {
                name: 'Twitter / X',
                slug: 'twitter-x',
                description: 'Twitter / X services',
                sortOrder: 4,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Twitter Interactions Vote services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet + Video Views S2 (Instant, Superfast)',
            description: 'Tweet + Video Views combo! Instant start. Superfast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 16.30,        // ₱0.2968 + ₱16
            providerRate: 0.2968,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1938',
            isDripFeed: false,
            isRefill: false,
            averageTime: '14 minutes',
            sortOrder: 481,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Link Click S2 (Max 100M, 30M/Day, Cheapest In The World)',
            description: 'Link Clicks! Max 100M. 30M/Day speed. Cheapest worldwide!',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 16.68,        // ₱0.6826 + ₱16
            providerRate: 0.6826,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '2408',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 482,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Profile Click S2 (Max 100M, 30M/Day, Cheapest In The World)',
            description: 'Profile Clicks! Max 100M. 30M/Day speed. Cheapest worldwide!',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 16.68,        // ₱0.6826 + ₱16
            providerRate: 0.6826,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '2409',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 483,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Detail Click S2 (Max 100M, 30M/Day, Cheapest In The World)',
            description: 'Detail Clicks! Max 100M. 30M/Day speed. Cheapest worldwide!',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 16.68,        // ₱0.6826 + ₱16
            providerRate: 0.6826,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '2410',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 484,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Media View S2 (Max 100M, 30M/Day, Cheapest In The World)',
            description: 'Media Views! Max 100M. 30M/Day speed. Cheapest worldwide!',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 16.68,        // ₱0.6826 + ₱16
            providerRate: 0.6826,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '2411',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 minutes',
            sortOrder: 485,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Hashtag Click S2 (Max 100M, 30M/Day, Cheapest In The World)',
            description: 'Hashtag Clicks! Max 100M. 30M/Day speed. Cheapest worldwide!',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 16.68,        // ₱0.6826 + ₱16
            providerRate: 0.6826,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '2412',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 486,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Media View (Max 100M, Cheapest In The World)',
            description: 'Media Views! Max 100M. Cheapest worldwide!',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 17.37,        // ₱1.3651 + ₱16
            providerRate: 1.3651,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1292',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 487,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views S2 (Instant, Superfast)',
            description: 'Tweet Views S2! Instant start. Superfast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 17.37,        // ₱1.3651 + ₱16
            providerRate: 1.3651,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1595',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 minutes',
            sortOrder: 488,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Poll Votes (Instant, Fast, Max 1m)',
            description: 'Poll Votes! Instant start. Fast delivery. Max 1M votes.',
            platform: 'TWITTER',
            type: 'Twitter Interactions Vote',
            rate: 219.12,       // ₱203.1178 + ₱16
            providerRate: 203.1178,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1501',
            isDripFeed: false,
            isRefill: false,
            averageTime: '8 minutes',
            sortOrder: 489,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: {
                    name: service.name,
                    description: service.description,
                    rate: service.rate,
                    providerRate: service.providerRate,
                    minQuantity: service.minQuantity,
                    maxQuantity: service.maxQuantity,
                    averageTime: service.averageTime,
                    isRefill: service.isRefill,
                    type: service.type,
                }
            });
            console.log(`🔄 Updated: ID ${service.providerServiceId} - ₱${service.rate.toFixed(2)}`);
            count++;
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ Added: ID ${service.providerServiceId} - ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Twitter Interactions Vote services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─────────────────────────────────────────────────');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
