/**
 * Add TikTok Likes No Refill Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-likes-norefill-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('❤️ Adding TikTok Likes No Refill services...\n');

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

    // TikTok Likes No Refill services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Likes (Instant, Superfast, Max 1M)',
            description: 'Live Stream Likes! Superfast delivery. Max 1M. Cheapest!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.24,        // ₱0.238 + ₱16
            providerRate: 0.238,
            minQuantity: 100,
            maxQuantity: 500000,
            providerServiceId: '1211',
            isDripFeed: false,
            isRefill: false,
            averageTime: '13 minutes',
            sortOrder: 260,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Likes S10 (Instant, Superfast)',
            description: 'Live Stream Likes S10! Superfast. Massive capacity!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.31,        // ₱0.3083 + ₱16
            providerRate: 0.3083,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '1887',
            isDripFeed: false,
            isRefill: false,
            averageTime: '67 hours 23 minutes',
            sortOrder: 261,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S41 (Instant, 800/Day)',
            description: 'Slow and steady 800/Day. Instant start. Natural-looking!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.46,        // ₱0.457 + ₱16
            providerRate: 0.457,
            minQuantity: 10,
            maxQuantity: 8000000,
            providerServiceId: '1183',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 262,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ TikTok Likes S9 (Instant, Real Looking, 4k/Day, 10Min)',
            description: '⭐ RECOMMENDED! Real looking likes. 4k/Day. Starts in 10 min!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.53,        // ₱0.526 + ₱16
            providerRate: 0.526,
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '404',
            isDripFeed: false,
            isRefill: false,
            averageTime: '41 minutes',
            sortOrder: 263,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes bot E3 (Instant, Superfast 20k/Day)',
            description: 'Superfast 20k/Day bot likes. Instant start. Budget option!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.67,        // ₱0.67 + ₱16
            providerRate: 0.67,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '4567',
            isDripFeed: false,
            isRefill: false,
            averageTime: '27 hours 42 minutes',
            sortOrder: 264,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes bot E9 (Instant, Superfast 100k/Day)',
            description: 'Superfast 100k/Day! Instant start. Fast delivery!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.75,        // ₱0.747 + ₱16
            providerRate: 0.747,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '4061',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 18 minutes',
            sortOrder: 265,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Story Likes S9 (Instant, Max 5K, Speed 1K/Day)',
            description: 'Story Likes! Max 5K. 1K/Day speed. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 16.92,        // ₱0.9163 + ₱16
            providerRate: 0.9163,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '1588',
            isDripFeed: false,
            isRefill: false,
            averageTime: '20 minutes',
            sortOrder: 266,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ TikTok Likes S73 (Superinstant, High quality, Superfast)',
            description: '⭐ RECOMMENDED! Superinstant start! High quality. Superfast!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 17.00,        // ₱1.0012 + ₱16
            providerRate: 1.0012,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '401',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 3 minutes',
            sortOrder: 267,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S12 (Instant, Superfast)',
            description: 'Superfast S12! Instant start. 1 minute average time!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 18.05,        // ₱2.0517 + ₱16
            providerRate: 2.0517,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '744',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 minute',
            sortOrder: 268,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes + Views REAL E5 (Instant, Ultrafast 50k/Day, High quality, Non drop)',
            description: 'Likes + Views combo! REAL. Ultrafast 50k/Day. Non drop. High quality!',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 22.04,        // ₱6.0361 + ₱16
            providerRate: 6.0361,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4811',
            isDripFeed: false,
            isRefill: false,
            averageTime: '18 hours 31 minutes',
            sortOrder: 269,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes E1 (HQ, Max100K, No Refill)',
            description: 'High Quality likes. Max 100K per order.',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 23.60,        // ₱7.5972 + ₱16
            providerRate: 7.5972,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4464',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 hours 23 minutes',
            sortOrder: 270,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S12 (Instant, 3K per day)',
            description: 'Steady 3K/Day delivery. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 33.34,        // ₱17.3406 + ₱16
            providerRate: 17.3406,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '1401',
            isDripFeed: false,
            isRefill: false,
            averageTime: '5 hours 28 minutes',
            sortOrder: 271,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes E9 (HQ, Max 50K, No Refill)',
            description: 'High Quality likes. Max 50K. Premium option.',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 33.28,        // ₱17.2797 + ₱16
            providerRate: 17.2797,
            minQuantity: 10,
            maxQuantity: 10000,
            providerServiceId: '1804',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 28 minutes',
            sortOrder: 272,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S10 (HQ, Max 10K, No Refill)',
            description: 'High Quality S10 likes. Max 10K per order.',
            platform: 'TIKTOK',
            type: 'TikTok Likes No Refill',
            rate: 34.58,        // ₱18.5784 + ₱16
            providerRate: 18.5784,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '1056',
            isDripFeed: false,
            isRefill: false,
            averageTime: '12 hours 51 minutes',
            sortOrder: 273,
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
        console.log(`✅ Added: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} TikTok Likes No Refill services na-add!`);
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
