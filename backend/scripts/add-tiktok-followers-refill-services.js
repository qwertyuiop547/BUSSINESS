/**
 * Add TikTok Followers Refill Guaranteed Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-followers-refill-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎵 Adding TikTok Followers Refill Guaranteed services...\n');

    // Get TikTok category
    let tiktokCat = await prisma.category.findUnique({ where: { slug: 'tiktok' } });

    if (!tiktokCat) {
        console.log('📁 Creating TikTok category...');
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

    // TikTok Followers Refill Guaranteed services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S7 (Instant, Ultrafast 10k per day, 30 Days refill guarantee)',
            description: 'Ultrafast 10k/day! 30 Days Refill Guarantee. Instant start.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 78.48,        // ₱62.4768 + ₱16
            providerRate: 62.4768,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '883',
            isDripFeed: false,
            isRefill: true,
            averageTime: '11 hours 1 minute',
            sortOrder: 230,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S48 (Start in 5 minutes, UltraFast 100k/Day, 30 Days refill guarantee)',
            description: 'UltraFast 100k/Day! Starts in 5 min. 30 Days Refill. Best value!',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 70.89,        // ₱54.8883 + ₱16
            providerRate: 54.8883,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2441',
            isDripFeed: false,
            isRefill: true,
            averageTime: '13 hours 53 minutes',
            sortOrder: 231,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers E1 (Instant, Slow 5k/Day, HQ Real Mixed, R30)',
            description: 'HQ Real Mixed followers. Slow 5k/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 105.69,       // ₱89.685 + ₱16
            providerRate: 89.685,
            minQuantity: 10,
            maxQuantity: 50000000,
            providerServiceId: '2444',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 hours 4 minutes',
            sortOrder: 232,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers E4 (Instant, 10k per day, High Quality Brazil Mixed, R30)',
            description: 'High Quality Brazil Mixed. 10k/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 101.07,       // ₱85.065 + ₱16
            providerRate: 85.065,
            minQuantity: 10,
            maxQuantity: 50000000,
            providerServiceId: '3693',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 hours 4 minutes',
            sortOrder: 233,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S19 (Mix, 30 Days Refill, Fast)',
            description: 'Mix followers. Fast delivery. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 81.48,        // ₱65.4768 + ₱16
            providerRate: 65.4768,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '3797',
            isDripFeed: false,
            isRefill: true,
            averageTime: '23 hours 7 minutes',
            sortOrder: 234,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R7 E3 (Instant, HQ accounts with followers, 200K/Day, 7 days refill)',
            description: 'HQ accounts with followers. Super fast 200K/Day! 7 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 87.14,        // ₱71.1431 + ₱16
            providerRate: 71.1431,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4817',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 minutes',
            sortOrder: 235,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users, Max 500K, Very Low Drop, NR, 30K/Day)',
            description: '100% Real Global Users! 30K/Day. Very Low Drop. Max 500K.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 343.88,       // ₱327.8834 + ₱16
            providerRate: 327.8834,
            minQuantity: 100,
            maxQuantity: 500000,
            providerServiceId: '4827',
            isDripFeed: false,
            isRefill: false,
            averageTime: '5 hours 2 minutes',
            sortOrder: 236,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R16 E1 (Instant, HQ accounts with followers, 100K/Day, 16 days refill)',
            description: 'HQ accounts. 100K/Day. 16 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 97.83,        // ₱81.8314 + ₱16
            providerRate: 81.8314,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4818',
            isDripFeed: false,
            isRefill: true,
            averageTime: '28 minutes',
            sortOrder: 237,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers E2 (Instant, Slow 10k/Day, Worldwide + Brazil, R30)',
            description: 'Worldwide + Brazil mix. 10k/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 93.54,        // ₱77.5448 + ₱16
            providerRate: 77.5448,
            minQuantity: 10,
            maxQuantity: 50000000,
            providerServiceId: '4814',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 238,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers E3 (Instant, 100% Real HQ, Fast, R30)',
            description: '100% Real HQ followers! Fast delivery. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 113.34,       // ₱97.3444 + ₱16
            providerRate: 97.3444,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '745',
            isDripFeed: false,
            isRefill: true,
            averageTime: '57 minutes',
            sortOrder: 239,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R30E1 (Instant, HQ accounts with followers, 100K/Day, 30 days refill)',
            description: 'HQ accounts. 100K/Day. 30 Days Refill. Super fast 4 min start!',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 101.08,       // ₱85.0839 + ₱16
            providerRate: 85.0839,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4819',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 240,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S12 (Premium quality real active, 30 Days Refill, Fast 5K per day)',
            description: 'Premium quality! Real active followers. 5K/Day. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 109.29,       // ₱93.2883 + ₱16
            providerRate: 93.2883,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '3788',
            isDripFeed: false,
            isRefill: true,
            averageTime: '33 hours 38 minutes',
            sortOrder: 241,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers E8 (Instant, Ultrafast, Non Drop, Real HQ, R30, Max 100K)',
            description: 'Ultrafast! Non Drop. Real HQ. 30 Days Refill. Max 100K.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 124.50,       // ₱108.5019 + ₱16
            providerRate: 108.5019,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '2347',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 4 minutes',
            sortOrder: 242,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers 30 Days Refill E1 (Updated 12 October 2025)',
            description: 'Updated October 2025! 30 Days Refill. Reliable service.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 116.72,       // ₱100.7191 + ₱16
            providerRate: 100.7191,
            minQuantity: 10,
            maxQuantity: 50000000,
            providerServiceId: '4350',
            isDripFeed: false,
            isRefill: true,
            averageTime: '18 hours 28 minutes',
            sortOrder: 243,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers E6 (Instant, Ultrafast, Real HQ, Non Drop, 30 Days Guarantee, Max 1M)',
            description: 'Ultrafast! Real HQ. Non Drop. 30 Days Guarantee. Max 1M!',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 164.46,       // ₱148.4585 + ₱16
            providerRate: 148.4585,
            minQuantity: 10,
            maxQuantity: 50000000,
            providerServiceId: '2384',
            isDripFeed: false,
            isRefill: true,
            averageTime: '68 hours 32 minutes',
            sortOrder: 244,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S11 (Super Instant, Ultrafast 20k/Day, 365 Days Guarantee)',
            description: '365 DAYS GUARANTEE! Super Instant. 20k/Day. Best long-term!',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 158.20,       // ₱142.2041 + ₱16
            providerRate: 142.2041,
            minQuantity: 10,
            maxQuantity: 250000,
            providerServiceId: '2415',
            isDripFeed: false,
            isRefill: true,
            averageTime: '12 minutes',
            sortOrder: 245,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S2 (Instant, HQ, Ultrafast 100k/day, 30 days refill guarantee, Max 200K)',
            description: 'HQ Ultrafast 100k/day! 30 Days Refill. Max 200K.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Refill Guaranteed',
            rate: 129.43,       // ₱113.4281 + ₱16
            providerRate: 113.4281,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '406',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 14 minutes',
            sortOrder: 246,
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
        console.log(`✅ Added: ID ${service.providerServiceId} - ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} TikTok Followers Refill Guaranteed services na-add!`);
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
