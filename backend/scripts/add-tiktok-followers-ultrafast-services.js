/**
 * Add TikTok Followers (Ultrafast) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-followers-ultrafast-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('⚡ Adding TikTok Followers (Ultrafast) services...\n');

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

    // TikTok Followers Ultrafast services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers NR E1 (HQ Accounts, Low Drop, No Refill, Instant, Ultrafast 100K/Day, Max 1M)',
            description: 'HQ Accounts! Low Drop. No Refill. Ultrafast 100K/Day! Cheapest option.',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Ultrafast)',
            rate: 78.61,        // ₱62.605 + ₱16
            providerRate: 62.605,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4473',
            isDripFeed: false,
            isRefill: false,
            averageTime: '33 minutes',
            sortOrder: 300,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R30 E1 (HQ Accounts, Low Drop, 30 Days Refill, Instant, Ultrafast 100K/Day, Max 1M)',
            description: 'HQ Accounts! Low Drop. 30 Days Refill. Ultrafast 100K/Day!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Ultrafast)',
            rate: 82.52,        // ₱66.5178 + ₱16
            providerRate: 66.5178,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4474',
            isDripFeed: false,
            isRefill: true,
            averageTime: '53 minutes',
            sortOrder: 301,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R60 E1 (HQ Accounts, Low Drop, 60 Days Refill, Instant, Ultrafast 100K/Day, Max 1M)',
            description: 'HQ Accounts! Low Drop. 60 Days Refill. Ultrafast 100K/Day!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Ultrafast)',
            rate: 83.30,        // ₱67.3004 + ₱16
            providerRate: 67.3004,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4475',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 302,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R90 E1 (HQ Accounts, Low Drop, 90 Days Refill Button, Instant, Ultrafast 100K/Day, Max 1M)',
            description: 'HQ Accounts! Low Drop. 90 Days Refill Button. Ultrafast 100K/Day!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Ultrafast)',
            rate: 84.00,        // ₱68.003 + ₱16
            providerRate: 68.003,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4476',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 303,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R365 E1 (HQ Accounts, Low Drop, 365 Days Refill Button, Instant, Ultrafast 100K/Day, Max 1M)',
            description: 'HQ Accounts! Low Drop. 365 Days Refill! Ultrafast 100K/Day! Best long-term!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Ultrafast)',
            rate: 84.87,        // ₱68.8655 + ₱16
            providerRate: 68.8655,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4477',
            isDripFeed: false,
            isRefill: true,
            averageTime: '158 hours 59 minutes',
            sortOrder: 304,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers R∞ E1 (HQ Accounts, Low Drop, Lifetime Refill, Instant, Ultrafast 100K/Day, Max 1M)',
            description: 'HQ Accounts! Low Drop. LIFETIME REFILL! Ultrafast 100K/Day! Ultimate protection!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Ultrafast)',
            rate: 85.65,        // ₱69.6481 + ₱16
            providerRate: 69.6481,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4478',
            isDripFeed: false,
            isRefill: true,
            averageTime: '35 minutes',
            sortOrder: 305,
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
        const refill = service.name.match(/R\d+|NR|R∞/)?.[0] || '';
        console.log(`✅ ${refill}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} TikTok Followers (Ultrafast) services na-add!`);
    console.log('⚡ Speed: 100K/Day');
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
