/**
 * Add Twitter Comments, Mentions & DM Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-comments-dm-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Comments, Mentions & DM services...\n');

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

    // Twitter Comments, Mentions & DM services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Comments Custom (Ultra fast)',
            description: 'Custom Comments! Ultra fast delivery. Write your own comments.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 2223.80,      // ₱2207.8014 + ₱16
            providerRate: 2207.8014,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '1494',
            isDripFeed: false,
            isRefill: false,
            averageTime: '171 hours 59 minutes',
            sortOrder: 499,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Mentions User Followers (3 users per reply)',
            description: 'Mention your followers! 3 users per reply. Great for engagement.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 3695.67,      // ₱3679.669 + ₱16
            providerRate: 3679.669,
            minQuantity: 500,
            maxQuantity: 50000000,
            providerServiceId: '1496',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 500,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Direct Message DM Mass',
            description: 'Mass DM service! Send direct messages to many users.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 7375.34,      // ₱7359.338 + ₱16
            providerRate: 7359.338,
            minQuantity: 5000,
            maxQuantity: 10000000,
            providerServiceId: '1493',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 501,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Comments Custom HQ (30 Days Refill, Refill Button Active, Low Drop)',
            description: 'HQ Custom Comments! 30 Days Refill. Low Drop. Premium quality.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 7375.34,      // ₱7359.338 + ₱16
            providerRate: 7359.338,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1495',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 502,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers S12 (Instant, 20k/Day, Premium Quality, No drop, 30D Refill Button, Max 200K)',
            description: 'Premium Followers S12! 20K/Day. No drop. 30 Days Refill. Max 200K.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 757.87,       // ₱741.8688 + ₱16
            providerRate: 741.8688,
            minQuantity: 500,
            maxQuantity: 10000000,
            providerServiceId: '1068',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 503,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers S14 (Instant, Superfast 100k Day, No refill)',
            description: 'Superfast Followers S14! 100K/Day speed. No refill.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 163.19,       // ₱147.1868 + ₱16
            providerRate: 147.1868,
            minQuantity: 500,
            maxQuantity: 10000000,
            providerServiceId: '1074',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 504,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Website 100% Real Traffic From Twitter',
            description: '100% Real Traffic to your website from Twitter! Great for SEO.',
            platform: 'TWITTER',
            type: 'Twitter Comments, Mentions & DM',
            rate: 30.72,        // ₱14.7187 + ₱16
            providerRate: 14.7187,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '767',
            isDripFeed: false,
            isRefill: false,
            averageTime: '52 minutes',
            sortOrder: 505,
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
    console.log(`🎉 Tapos na! ${count} Twitter Comments, Mentions & DM services na-add!`);
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
