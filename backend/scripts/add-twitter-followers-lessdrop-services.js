/**
 * Add Twitter Followers (Less Drop) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-followers-lessdrop-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Followers (Less Drop) services...\n');

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

    // Twitter Followers (Less Drop) services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers East Asia (Japanese, Korea, Hong Kong, Drop rate 0-5%, 15 Days Refill, HQ Accounts)',
            description: 'East Asia Followers! Japan, Korea, HK. 0-5% Drop. 15 Days Refill. HQ Accounts.',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 378.42,       // ₱362.4178 + ₱16
            providerRate: 362.4178,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1632',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 463,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter EN/US Real Followers (Max: 50K, Very Low Drop, 15 Days Refill, HQ Accounts)',
            description: 'EN/US Real Followers! Very Low Drop. 15 Days Refill. HQ Accounts.',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 378.42,       // ₱362.4178 + ₱16
            providerRate: 362.4178,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1634',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 464,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Real Followers S6 (Max: 500K, Very Low Drop, 15 Days Refill, HQ Accounts)',
            description: 'Real Followers S6! Max 500K. Very Low Drop. 15 Days Refill. HQ Accounts.',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 378.42,       // ₱362.4178 + ₱16
            providerRate: 362.4178,
            minQuantity: 100,
            maxQuantity: 500000,
            providerServiceId: '1638',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 465,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers East Asia (Japanese, Korea, Hong Kong, Drop rate 0-5%, 30 Days Refill, HQ Accounts)',
            description: 'East Asia Followers! Japan, Korea, HK. 0-5% Drop. 30 Days Refill. HQ Accounts.',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 426.88,       // ₱410.8766 + ₱16
            providerRate: 410.8766,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1633',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 466,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter EN/US Real Followers (Max: 50K, Very Low Drop, 30 Days Refill, HQ Accounts)',
            description: 'EN/US Real Followers! Very Low Drop. 30 Days Refill. HQ Accounts.',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 426.88,       // ₱410.8766 + ₱16
            providerRate: 410.8766,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1635',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 467,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Real Followers S6 (Max: 500K, Very Low Drop, 30 Days Refill, HQ Accounts)',
            description: 'Real Followers S6! Max 500K. Very Low Drop. 30 Days Refill. HQ Accounts.',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 426.88,       // ₱410.8766 + ₱16
            providerRate: 410.8766,
            minQuantity: 100,
            maxQuantity: 500000,
            providerServiceId: '1639',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 468,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'YouTube Social Shares from Twitter (Lifetime Refill, Instant Start, Superfast 100k/Day)',
            description: 'YouTube shares from Twitter! Lifetime Refill. Instant start. 100k/Day speed!',
            platform: 'TWITTER',
            type: 'Twitter Followers (Less Drop)',
            rate: 26.09,        // ₱10.0895 + ₱16
            providerRate: 10.0895,
            minQuantity: 50,
            maxQuantity: 500000000,
            providerServiceId: '2556',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 minute',
            sortOrder: 469,
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
    console.log(`🎉 Tapos na! ${count} Twitter Followers (Less Drop) services na-add!`);
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
