/**
 * Add TikTok Followers No Refill Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-followers-norefill-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👥 Adding TikTok Followers No Refill services...\n');

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

    // TikTok Followers No Refill services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ TikTok Followers S13 (Instant, HQ, Ultrafast 50k per day)',
            description: '⭐ RECOMMENDED! HQ followers. Ultrafast 50k/day! Best value!',
            platform: 'TIKTOK',
            type: 'TikTok Followers No Refill',
            rate: 34.96,        // ₱18.9607 + ₱16
            providerRate: 18.9607,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1818',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 hours 7 minutes',
            sortOrder: 310,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Mixed Brazil E1 (Updated 12 October 2025)',
            description: 'Mixed Brazil followers. Updated October 2025. Massive capacity!',
            platform: 'TIKTOK',
            type: 'TikTok Followers No Refill',
            rate: 79.58,        // ₱63.5773 + ₱16
            providerRate: 63.5773,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '4308',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 hours 40 minutes',
            sortOrder: 311,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Real E5 (Instant, Speed 10K per day, HQ Real, No Refill)',
            description: 'HQ Real followers. 10K/Day speed. Massive capacity!',
            platform: 'TIKTOK',
            type: 'TikTok Followers No Refill',
            rate: 79.58,        // ₱63.5773 + ₱16
            providerRate: 63.5773,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '1596',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 312,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ TikTok Followers S7 (Instant, Fast 5k per day, Max 50K)',
            description: '⭐ RECOMMENDED! Fast 5k/day. Great for organic growth!',
            platform: 'TIKTOK',
            type: 'TikTok Followers No Refill',
            rate: 87.14,        // ₱71.1421 + ₱16
            providerRate: 71.1421,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '505',
            isDripFeed: false,
            isRefill: false,
            averageTime: '5 hours 13 minutes',
            sortOrder: 313,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S6 (Instant, Slow 200/Day, Real, Max 500k)',
            description: 'REAL followers! Super slow 200/Day for natural growth. Premium!',
            platform: 'TIKTOK',
            type: 'TikTok Followers No Refill',
            rate: 104.93,       // ₱88.9276 + ₱16
            providerRate: 88.9276,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '882',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 314,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S12 (Instant, 10K/Day, Mixed Quality, Max 100k)',
            description: 'Mixed Quality. 10K/Day. Max 100K per order.',
            platform: 'TIKTOK',
            type: 'TikTok Followers No Refill',
            rate: 139.31,       // ₱123.3129 + ₱16
            providerRate: 123.3129,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '465',
            isDripFeed: false,
            isRefill: false,
            averageTime: '25 hours 27 minutes',
            sortOrder: 315,
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
    console.log(`🎉 Tapos na! ${count} TikTok Followers No Refill services na-add!`);
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
