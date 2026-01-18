/**
 * Add Instagram Likes Refill Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-likes-refill-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('❤️ Adding Instagram Likes Refill services...\n');

    // Get or create Instagram category
    let instagramCat = await prisma.category.findUnique({ where: { slug: 'instagram' } });

    if (!instagramCat) {
        instagramCat = await prisma.category.create({
            data: {
                name: 'Instagram',
                slug: 'instagram',
                description: 'Instagram services',
                sortOrder: 2,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Instagram Likes Refill services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes + Reach & Impressions E1 (R30, Mixed quality with Reach and Impressions, 500K per day)',
            description: 'Likes + Reach & Impressions! 30 Days Refill. 500K/day speed!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 26.21,        // ₱10.2135 + ₱16
            providerRate: 10.2135,
            minQuantity: 10,
            maxQuantity: 200000,
            providerServiceId: '4912',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 hours 47 minutes',
            sortOrder: 450,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes E1 (R30, Fast start)',
            description: 'E1 Likes! 30 Days Refill. Fast start.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 27.19,        // ₱11.1866 + ₱16
            providerRate: 11.1866,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4917',
            isDripFeed: false,
            isRefill: true,
            averageTime: '42 hours 24 minutes',
            sortOrder: 451,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Real E2 (Instant, Old accounts, 30 days refill)',
            description: 'Real Likes from Old accounts! Instant. 30 Days Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 27.29,        // ₱11.2883 + ₱16
            providerRate: 11.2883,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4909',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 minutes',
            sortOrder: 452,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram likes E2 (Instant, Old accounts, 365 days refill)',
            description: 'E2 Likes! 365 Days Refill. Min 5 only!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 30.23,        // ₱14.2315 + ₱16
            providerRate: 14.2315,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '196',
            isDripFeed: false,
            isRefill: true,
            averageTime: '37 hours 10 minutes',
            sortOrder: 453,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Real E2 (Instant, Fast, Old accounts, 30 days refill)',
            description: 'Real Fast Likes from Old accounts! 30 Days Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 30.44,        // ₱14.4431 + ₱16
            providerRate: 14.4431,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4907',
            isDripFeed: false,
            isRefill: true,
            averageTime: '23 minutes',
            sortOrder: 454,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Real E2 (Instant, Super Fast, Old accounts, 30 days refill)',
            description: 'Real Super Fast Likes! Old accounts. 30 Days Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 33.28,        // ₱17.2779 + ₱16
            providerRate: 17.2779,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4908',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 43 minutes',
            sortOrder: 455,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes E1 (Superfast, R30, With avatars & photos, 150K per day)',
            description: 'Superfast Likes! With avatars & photos. 150K/day. 30 Days Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 33.79,        // ₱17.7886 + ₱16
            providerRate: 17.7886,
            minQuantity: 50,
            maxQuantity: 200000,
            providerServiceId: '4910',
            isDripFeed: false,
            isRefill: true,
            averageTime: '18 minutes',
            sortOrder: 456,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes + Reach & photo views E1 (Instant, AR90, Mixed countries with avatars & photos, 100K per day)',
            description: 'Likes + Reach & Photo views! 90 Days Auto Refill. 100K/day.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 36.53,        // ₱20.5308 + ₱16
            providerRate: 20.5308,
            minQuantity: 50,
            maxQuantity: 100000,
            providerServiceId: '4914',
            isDripFeed: false,
            isRefill: true,
            averageTime: '78 hours 4 minutes',
            sortOrder: 457,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Real E2 (Instant, Ultra Fast, Old accounts, 30 days refill)',
            description: 'Real ULTRA FAST Likes! Old accounts. 30 Days Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 38.32,        // ₱22.321 + ₱16
            providerRate: 22.321,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4900',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 8 minutes',
            sortOrder: 458,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes AR30 E1 (30 days Auto Refill, Accounts with avatars, 5K per day)',
            description: '30 Days Auto Refill! Accounts with avatars. 5K/day.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 39.49,        // ₱23.4921 + ₱16
            providerRate: 23.4921,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4915',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 459,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes + Reach & photo views E1 (Auto refill 30 days, Mixed quality with Reach and impressions, 250K per day)',
            description: 'Likes + Reach & Photo views! 30 Days Auto Refill. 250K/day. 9 min avg!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 41.02,        // ₱25.0188 + ₱16
            providerRate: 25.0188,
            minQuantity: 10,
            maxQuantity: 300000,
            providerServiceId: '4913',
            isDripFeed: false,
            isRefill: true,
            averageTime: '9 minutes',
            sortOrder: 460,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes AR60 E1 (30 days Auto Refill, Bots with real posts, avatars and names, 5K per day)',
            description: '60 Days Auto Refill! Bots with real posts, avatars and names.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 50.31,        // ₱34.3073 + ₱16
            providerRate: 34.3073,
            minQuantity: 10,
            maxQuantity: 60000,
            providerServiceId: '4916',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 461,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes with Reach & photo views (Instant, R30, Mixed countries with avatars & photos, 150K per day)',
            description: 'Likes + Reach & Photo views! 30 Days Refill. 150K/day. 8 min avg!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 79.20,        // ₱63.2009 + ₱16
            providerRate: 63.2009,
            minQuantity: 50,
            maxQuantity: 200000,
            providerServiceId: '4911',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 minutes',
            sortOrder: 462,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'YouTube Likes (instagram.com) | 650K/Day | Non-Drop | Lifetime Refill 🔄 | Instant',
            description: 'YouTube Likes via Instagram! 650K/Day. LIFETIME Refill! Non-Drop!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Refill',
            rate: 230.21,       // ₱214.2122 + ₱16
            providerRate: 214.2122,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4925',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 minutes',
            sortOrder: 463,
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
    console.log(`🎉 Tapos na! ${count} Instagram Likes Refill services na-add!`);
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
