/**
 * Add Twitter Views Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-views-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Views services...\n');

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

    // Twitter Views services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views E5 (Instant, Superfast, 10M)',
            description: 'Instant start! Superfast delivery. Max 10M views.',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.32,        // ₱0.3205 + ₱16
            providerRate: 0.3205,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '4804',
            isDripFeed: false,
            isRefill: false,
            averageTime: '15 minutes',
            sortOrder: 420,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Views S6 (Instant, Superfast, Unlimited)',
            description: 'Instant start! Superfast. Unlimited max quantity!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.46,        // ₱0.463 + ₱16
            providerRate: 0.463,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '1630',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 24 minutes',
            sortOrder: 421,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet/Video Views S11 (Instant, Fast, Non drop, 365 Days refill)',
            description: 'Instant! Fast. Non-drop. 365 Days Refill Guarantee!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.45,        // ₱0.4511 + ₱16
            providerRate: 0.4511,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1575',
            isDripFeed: false,
            isRefill: true,
            averageTime: '23 hours 4 minutes',
            sortOrder: 422,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views S11 (Instant, Superfast, 10M)',
            description: 'Instant! Superfast delivery. Max 10M.',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.45,        // ₱0.4511 + ₱16
            providerRate: 0.4511,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1576',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 minutes',
            sortOrder: 423,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet View Completes in 10 hours (Gradually Increase)',
            description: 'Gradual increase. Completes in 10 hours. Natural looking!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.63,        // ₱0.6292 + ₱16
            providerRate: 0.6292,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4793',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 424,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Views S5 (Gradual Increase, Superfast)',
            description: 'Gradual increase pattern. Superfast delivery!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.64,        // ₱0.641 + ₱16
            providerRate: 0.641,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '740',
            isDripFeed: false,
            isRefill: false,
            averageTime: '10 minutes',
            sortOrder: 425,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views S5 (Gradual Increase complete in 5 hours, Superfast)',
            description: 'Gradual increase. Completes in 5 hours. Superfast!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.65,        // ₱0.647 + ₱16
            providerRate: 0.647,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '1460',
            isDripFeed: false,
            isRefill: false,
            averageTime: '31 minutes',
            sortOrder: 426,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Tweet Views (Cheapest server, Max 10M)',
            description: 'Cheapest Twitter views! Max 10M.',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.65,        // ₱0.6529 + ₱16
            providerRate: 0.6529,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4798',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 427,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet View Superfast (Instant, 1 Million/day)',
            description: 'Instant start! Superfast 1M/day speed!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 16.81,        // ₱0.8131 + ₱16
            providerRate: 0.8131,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1076',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 hours 57 minutes',
            sortOrder: 428,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Impression Bundle (Views + Impression + Detail Expand + Profile Click)',
            description: 'Complete bundle! Views + Impressions + Detail Expand + Profile Clicks!',
            platform: 'TWITTER',
            type: 'Twitter Views',
            rate: 18.60,        // ₱2.5996 + ₱16
            providerRate: 2.5996,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4795',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 429,
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
    console.log(`🎉 Tapos na! ${count} Twitter Views services na-add!`);
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
