/**
 * Add TikTok Views Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-views-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👁️ Adding TikTok Views services...\n');

    // Get TikTok category
    let tiktokCat = await prisma.category.findUnique({ where: { slug: 'tiktok' } });

    if (!tiktokCat) {
        tiktokCat = await prisma.category.create({
            data: {
                name: 'TikTok',
                slug: 'tiktok',
                description: 'TikTok services',
                sortOrder: 3,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // TikTok Views services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Video Views S3 (Instant, Ultrafast)',
            description: 'Ultrafast views! Instant start. Cheapest option! Massive capacity.',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.01,        // ₱0.0119 + ₱16
            providerRate: 0.0119,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '1083',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 15 minutes',
            sortOrder: 320,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Views S2 (Instant, Superfast, 5 million/day)',
            description: 'Superfast 5M/day! Instant start. Great value!',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.26,        // ₱0.2573 + ₱16
            providerRate: 0.2573,
            minQuantity: 50,
            maxQuantity: 2147483647,
            providerServiceId: '739',
            isDripFeed: false,
            isRefill: false,
            averageTime: '60 hours 24 minutes',
            sortOrder: 321,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Video Views Cheapest S19 (Ultrafast, Instant)',
            description: 'Cheapest S19! Ultrafast delivery. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.44,        // ₱0.4399 + ₱16
            providerRate: 0.4399,
            minQuantity: 10,
            maxQuantity: 2147483647,
            providerServiceId: '2455',
            isDripFeed: false,
            isRefill: false,
            averageTime: '87 hours 33 minutes',
            sortOrder: 322,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Views S4 (Instant, 10 million per day speed)',
            description: '10M/day speed! Super fast delivery. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.47,        // ₱0.4745 + ₱16
            providerRate: 0.4745,
            minQuantity: 50,
            maxQuantity: 2147483647,
            providerServiceId: '467',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 minutes',
            sortOrder: 323,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Views S1 (Instant, Superfast, 10M Per day)',
            description: 'Superfast S1! 10M/day. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.53,        // ₱0.5336 + ₱16
            providerRate: 0.5336,
            minQuantity: 50,
            maxQuantity: 2147483647,
            providerServiceId: '3804',
            isDripFeed: false,
            isRefill: false,
            averageTime: '29 minutes',
            sortOrder: 324,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Views S8 (Instant, 10 million per day speed)',
            description: 'S8 views! 10M/day. 2 minute average! Super fast!',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.59,        // ₱0.5931 + ₱16
            providerRate: 0.5931,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '1490',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 minutes',
            sortOrder: 325,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Views S7 (Instant, 10 million per day speed)',
            description: 'S7 views! 10M/day. 1 minute average! Fastest option!',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.64,        // ₱0.6405 + ₱16
            providerRate: 0.6405,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '1569',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 minute',
            sortOrder: 326,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Views (Instant, Ultrafast, 10M per day speed)',
            description: 'Ultrafast views! 10M/day. Reliable service.',
            platform: 'TIKTOK',
            type: 'TikTok Views',
            rate: 16.64,        // ₱0.6405 + ₱16
            providerRate: 0.6405,
            minQuantity: 50,
            maxQuantity: 2147483333,
            providerServiceId: '387',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 45 minutes',
            sortOrder: 327,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.providerServiceId}`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ ID ${service.providerServiceId}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} TikTok Views services na-add!`);
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
