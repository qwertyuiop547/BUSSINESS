/**
 * Add TikTok Share/Saves Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-shares-saves-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Adding TikTok Share/Saves services...\n');

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

    // TikTok Share/Saves services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Saves S7 (Instant, Max 30K, Lifetime Refill)',
            description: 'Saves with LIFETIME Refill! Max 30K. Best protection!',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 16.71,        // ₱0.7117 + ₱16
            providerRate: 0.7117,
            minQuantity: 10,
            maxQuantity: 1500000,
            providerServiceId: '2417',
            isDripFeed: false,
            isRefill: true,
            averageTime: '33 hours 32 minutes',
            sortOrder: 330,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Shares WW (Instant, 365 Days Refill, 100K/Day)',
            description: 'Worldwide shares! 365 Days Refill. 100K/Day speed!',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 16.71,        // ₱0.7117 + ₱16
            providerRate: 0.7117,
            minQuantity: 10,
            maxQuantity: 1500000,
            providerServiceId: '717',
            isDripFeed: false,
            isRefill: true,
            averageTime: '10 hours 40 minutes',
            sortOrder: 331,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Share S3 (Instant, Fast, No Refill)',
            description: 'Fast shares! No refill. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 21.19,        // ₱5.1889 + ₱16
            providerRate: 5.1889,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '876',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 58 minutes',
            sortOrder: 332,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Shares S9 (Instant, Max 1M, Speed 5K/Day, 365 days guaranteed)',
            description: 'Max 1M! 5K/Day speed. 365 Days Guarantee!',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 22.52,        // ₱6.5216 + ₱16
            providerRate: 6.5216,
            minQuantity: 10,
            maxQuantity: 214748333,
            providerServiceId: '1696',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 333,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Saves S9 (Instant, Max 20K, Refill 30 Days)',
            description: 'Saves with 30 Days Refill! Max 20K.',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 23.35,        // ₱7.3534 + ₱16
            providerRate: 7.3534,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '1697',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 334,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Saves S1 (Instant, Ultrafast, Max 20k)',
            description: 'Ultrafast saves! Massive capacity. 6 min average!',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 29.05,        // ₱13.0463 + ₱16
            providerRate: 13.0463,
            minQuantity: 10,
            maxQuantity: 2147483647,
            providerServiceId: '1833',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 minutes',
            sortOrder: 335,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Story Shares S10 (HQ, Max 100K, Speed 100K/Day)',
            description: 'Story Shares! HQ. 100K/Day speed. 4 min average!',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 34.53,        // ₱18.5316 + ₱16
            providerRate: 18.5316,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '1699',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 minutes',
            sortOrder: 336,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Share S2 (Instant, Fast, 30 Days Refill)',
            description: 'Fast shares with 30 Days Refill! 1 minute average!',
            platform: 'TIKTOK',
            type: 'TikTok Share/Saves',
            rate: 80.05,        // ₱64.0451 + ₱16
            providerRate: 64.0451,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '875',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 minute',
            sortOrder: 337,
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
    console.log(`🎉 Tapos na! ${count} TikTok Share/Saves services na-add!`);
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
