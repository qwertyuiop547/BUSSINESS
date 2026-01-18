/**
 * Add TikTok Likes Refill Guaranteed Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-likes-refill-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('❤️ Adding TikTok Likes Refill Guaranteed services...\n');

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

    // TikTok Likes Refill Guaranteed services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes Bot E5 (Instant, Superfast 20k/Day, 30 Days refill)',
            description: 'Superfast 20k/Day! 30 Days Refill. Cheapest option!',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 16.97,        // ₱0.965 + ₱16
            providerRate: 0.965,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '4568',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 47 minutes',
            sortOrder: 250,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes Bot E5 (Instant, Superfast 100k/Day, 30 Days refill)',
            description: 'Superfast 100k/Day! 30 Days Refill. Super fast delivery!',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 17.19,        // ₱1.1858 + ₱16
            providerRate: 1.1858,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4580',
            isDripFeed: false,
            isRefill: true,
            averageTime: '24 minutes',
            sortOrder: 251,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes Bot E5 (Instant, Superfast 20k/Day, 365 Days manual refill)',
            description: 'Superfast 20k/Day! 365 Days Manual Refill. Best long-term!',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 17.31,        // ₱1.3102 + ₱16
            providerRate: 1.3102,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4569',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 12 minutes',
            sortOrder: 252,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S2 (Instant, Superfast, 3k/day, 30 Days guarantee)',
            description: 'Superfast 3k/Day! 30 Days Guarantee. Stable service.',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 20.62,        // ₱4.6243 + ₱16
            providerRate: 4.6243,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '2416',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 36 minutes',
            sortOrder: 253,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S3 (Instant, Superfast, 4k/day, 365 Days guarantee)',
            description: 'Superfast 4k/Day! 365 DAYS Guarantee! Ultimate protection!',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 21.34,        // ₱5.3357 + ₱16
            providerRate: 5.3357,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '2415-likes',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 3 minutes',
            sortOrder: 254,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes + Views REAL E5 (Instant, Superfast 50k/Day, 30 Days refill)',
            description: 'Likes + Views combo! REAL accounts. 50k/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 24.11,        // ₱8.1102 + ₱16
            providerRate: 8.1102,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4810',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 minutes',
            sortOrder: 255,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ TikTok Likes S6 (Instant, Fast, Real, 500/Hour, Max 1000, R30)',
            description: '⭐ RECOMMENDED! Real likes. Fast 500/Hour. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 24.38,        // ₱8.3848 + ₱16
            providerRate: 8.3848,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '1070',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 256,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes + Views Male E5 (Instant, Superfast 50k/Day, HQ REAL, 30 Days refill)',
            description: 'Likes + Views from MALE accounts! HQ REAL. 50k/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 28.09,        // ₱12.0942 + ₱16
            providerRate: 12.0942,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4812',
            isDripFeed: false,
            isRefill: true,
            averageTime: '11 minutes',
            sortOrder: 257,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes + Views Female E5 (Instant, Superfast 50k/Day, HQ REAL, 30 Days refill)',
            description: 'Likes + Views from FEMALE accounts! HQ REAL. 50k/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 28.09,        // ₱12.0942 + ₱16
            providerRate: 12.0942,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4813',
            isDripFeed: false,
            isRefill: true,
            averageTime: '19 minutes',
            sortOrder: 258,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Likes S6 (Instant, Fast, Max 10k, R30)',
            description: 'Fast likes! Max 10k per order. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Likes Refill Guaranteed',
            rate: 30.09,        // ₱14.0882 + ₱16
            providerRate: 14.0882,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '403',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 minutes',
            sortOrder: 259,
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
        console.log(`✅ Added: ₱${service.rate.toFixed(2)} - ${service.name.substring(0, 50)}...`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} TikTok Likes Refill Guaranteed services na-add!`);
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
