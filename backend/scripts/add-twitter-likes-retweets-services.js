/**
 * Add Twitter Likes & Retweets Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-likes-retweets-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Likes & Retweets services...\n');

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

    // Twitter Likes & Retweets services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Retweets (Instant, Max 20K, No Refill, 20K/Days)',
            description: 'Instant Retweets! Max 20K. 20K/Day speed. No Refill.',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 23.12,        // ₱7.122 + ₱16
            providerRate: 7.122,
            minQuantity: 100,
            maxQuantity: 20000,
            providerServiceId: '2071',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 470,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes/Favorites (Instant, Max 20K, No Refill, 20K/Day)',
            description: 'Instant Likes! Max 20K. 20K/Day speed. No Refill.',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 23.12,        // ₱7.122 + ₱16
            providerRate: 7.122,
            minQuantity: 100,
            maxQuantity: 20000,
            providerServiceId: '2072',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 471,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Retweet (Instant, Old Account, Mixed Data, No Guaranteed, Maximum 5k)',
            description: 'Retweets from Old Accounts! Mixed Data. Max 5K.',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 42.85,        // ₱26.8498 + ₱16
            providerRate: 26.8498,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '1201',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 472,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes S9 (Instant, Superfast, No refill may drop)',
            description: 'Superfast Likes S9! Instant start. May drop.',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 89.59,        // ₱73.5934 + ₱16
            providerRate: 73.5934,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '16',
            isDripFeed: false,
            isRefill: false,
            averageTime: '13 hours 10 minutes',
            sortOrder: 473,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Retweets S9 (Instant, Superfast, No refill may drop)',
            description: 'Superfast Retweets S9! Instant start. May drop.',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 89.59,        // ₱73.5934 + ₱16
            providerRate: 73.5934,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1303',
            isDripFeed: false,
            isRefill: false,
            averageTime: '346 hours 17 minutes',
            sortOrder: 474,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes REAL S5 (Instant, REAL, Fast 10K/Day, No drop)',
            description: 'REAL Likes S5! Fast 10K/Day. No drop guarantee!',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 89.59,        // ₱73.5934 + ₱16
            providerRate: 73.5934,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '450',
            isDripFeed: false,
            isRefill: false,
            averageTime: '238 hours 2 minutes',
            sortOrder: 475,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes S11 (Instant, Superfast 100k Day, 30 days refill button)',
            description: 'Superfast Likes S11! 100K/Day speed. 30 Days Refill!',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 163.19,       // ₱147.1868 + ₱16
            providerRate: 147.1868,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1241',
            isDripFeed: false,
            isRefill: true,
            averageTime: '39 hours 53 minutes',
            sortOrder: 476,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes S8 (Instant, Old Accounts, Zero Drop, Refill Button)',
            description: 'Likes from Old Accounts! Zero Drop. Refill available!',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 163.19,       // ₱147.1868 + ₱16
            providerRate: 147.1868,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1242',
            isDripFeed: false,
            isRefill: true,
            averageTime: '70 hours 57 minutes',
            sortOrder: 477,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Retweets S11 (Instant, Superfast 100k Day, 30 days refill button)',
            description: 'Superfast Retweets S11! 100K/Day speed. 30 Days Refill!',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 163.19,       // ₱147.1868 + ₱16
            providerRate: 147.1868,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1245',
            isDripFeed: false,
            isRefill: true,
            averageTime: '203 hours 56 minutes',
            sortOrder: 478,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Retweets S8 (Instant, Old Accounts, Zero Drop, Refill Button)',
            description: 'Retweets from Old Accounts! Zero Drop. Refill available!',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 163.19,       // ₱147.1868 + ₱16
            providerRate: 147.1868,
            minQuantity: 100,
            maxQuantity: 5000000,
            providerServiceId: '1246',
            isDripFeed: false,
            isRefill: true,
            averageTime: '346 hours 16 minutes',
            sortOrder: 479,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes S5 (Super instant, Super fast 100k/Day)',
            description: 'Super Instant Likes S5! Superfast 100K/Day speed!',
            platform: 'TWITTER',
            type: 'Twitter Likes & Retweets',
            rate: 192.62,       // ₱176.6242 + ₱16
            providerRate: 176.6242,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '742',
            isDripFeed: false,
            isRefill: false,
            averageTime: '43 hours 54 minutes',
            sortOrder: 480,
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
    console.log(`🎉 Tapos na! ${count} Twitter Likes & Retweets services na-add!`);
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
