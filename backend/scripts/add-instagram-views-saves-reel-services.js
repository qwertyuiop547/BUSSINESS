/**
 * Add Instagram Views/Saves/Reel Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-views-saves-reel-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding Instagram Views/Saves/Reel services...\n');

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

    // Instagram Views/Saves/Reel services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '*** Instagram Video Views (Instant, 100k per day, Max 10M) (Updated October 2025)',
            description: 'Video Views! Instant start. 100k per day. Max 10M. Updated October 2025!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.1779,         // Final rate with markup
            providerRate: -15.8221,  // ₱0.1779 - ₱16
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '953',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 39 minutes',
            sortOrder: 560,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views (Instant, Super Fast 10 million per day, Max 50 M)',
            description: 'Views! Instant start. Super Fast 10M per day. Max 50M capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.1779,         // Final rate with markup
            providerRate: -15.8221,  // ₱0.1779 - ₱16
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '21',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 561,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views Fast (Updated October 2025)',
            description: 'Fast Views! Updated October 2025. Quick delivery!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.1779,         // Final rate with markup
            providerRate: -15.8221,  // ₱0.1779 - ₱16
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '1572',
            isDripFeed: false,
            isRefill: false,
            averageTime: '27 minutes',
            sortOrder: 562,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views + IGTV + Reel S11 (Instant, Ultra Fast, Max 50 M)',
            description: 'Views + IGTV + Reel! Instant start. Ultra Fast. Max 50M capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.593,          // Final rate with markup
            providerRate: -15.407,   // ₱0.593 - ₱16
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '1249',
            isDripFeed: false,
            isRefill: false,
            averageTime: '16 hours 45 minutes',
            sortOrder: 563,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '*** Instagram Views S7 (Super Instant, All type, Superfast, Max 10M)',
            description: 'Views S7! Super Instant start. All type supported. Superfast. Max 10M!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.0831,         // Final rate with markup
            providerRate: -15.9169,  // ₱0.0831 - ₱16
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '373',
            isDripFeed: false,
            isRefill: false,
            averageTime: '7 hours 43 minutes',
            sortOrder: 564,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views S1 (Instant-2 Minute, Super Fast, 1 Million Per Day, Max Unlimited)',
            description: 'Views S1! Instant-2 Minute start. Super Fast. 1M per day. Max Unlimited!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.1068,         // Final rate with markup
            providerRate: -15.8932,  // ₱0.1068 - ₱16
            minQuantity: 10,
            maxQuantity: 2147483647,
            providerServiceId: '87',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 49 minutes',
            sortOrder: 565,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Video Views S2 (Updated october 2025) (All Type Link work, Max 1M)',
            description: 'Video Views S2! Updated October 2025. All Type Link work. Max 1M!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.1186,         // Final rate with markup
            providerRate: -15.8814,  // ₱0.1186 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1571',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 43 minutes',
            sortOrder: 566,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Story Views (Instant, All Stories, Add Username Only, 5k per day)',
            description: 'Story Views! Instant start. All Stories. Add Username Only. 5k per day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.1602,         // Final rate with markup
            providerRate: -15.8398,  // ₱0.1602 - ₱16
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '81',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 27 minutes',
            sortOrder: 567,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Story Views (Instant, All Stories, Add Username Only, 200k per day)',
            description: 'Story Views! Instant start. All Stories. Add Username Only. 200k per day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.2017,         // Final rate with markup
            providerRate: -15.7983,  // ₱0.2017 - ₱16
            minQuantity: 100,
            maxQuantity: 400000,
            providerServiceId: '4699',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 3 minutes',
            sortOrder: 568,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Story Views (Story Views + Profile Visits + Impressions + Interactions, 10k/hour)',
            description: 'Story Views + Profile Visits + Impressions + Interactions! 10k/hour speed!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.2135,         // Final rate with markup
            providerRate: -15.7865,  // ₱0.2135 - ₱16
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '671',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 2 minutes',
            sortOrder: 569,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views S11 (Instant, Ultrafast 500k per day, Maximum 10M)',
            description: 'Views S11! Instant start. Ultrafast 500k per day. Maximum 10M!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.2372,         // Final rate with markup
            providerRate: -15.7628,  // ₱0.2372 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1528',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 42 minutes',
            sortOrder: 570,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Video Views + Impressions IGTV + Reel Views (Instant, Superfast 50M per day)',
            description: 'Video Views + Impressions IGTV + Reel Views! Instant start. Superfast 50M per day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.261,          // Final rate with markup
            providerRate: -15.739,   // ₱0.261 - ₱16
            minQuantity: 10,
            maxQuantity: 200000000,
            providerServiceId: '762',
            isDripFeed: false,
            isRefill: false,
            averageTime: '33 minutes',
            sortOrder: 571,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Video Views + Impressions IGTV + Reel Views (Instant, Superfast 100M per day)',
            description: 'Video Views + Impressions IGTV + Reel Views! Instant start. Superfast 100M per day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.338,          // Final rate with markup
            providerRate: -15.662,   // ₱0.338 - ₱16
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '80',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 49 minutes',
            sortOrder: 572,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Video Reel IGTV Views E5 (Super Instant, Superfast 1M/Day, Max 10M)',
            description: 'Video Reel IGTV Views E5! Super Instant start. Superfast 1M/Day. Max 10M!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 0.5219,         // Final rate with markup
            providerRate: -15.4781,  // ₱0.5219 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '190',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 23 minutes',
            sortOrder: 573,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram - Saves (Instant, Superfast, Max 50k)',
            description: 'Saves! Instant start. Superfast delivery. Max 50k!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 1.188,          // Final rate with markup
            providerRate: -14.812,   // ₱1.188 - ₱16
            minQuantity: 50,
            maxQuantity: 200000,
            providerServiceId: '333',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 hours 26 minutes',
            sortOrder: 574,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Video Reel IGTV Views (Updated Jun 2023) (All Type Link work, Max 10K)',
            description: 'Video Reel IGTV Views! Updated Jun 2023. All Type Link work. Max 10K!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 2.704,          // Final rate with markup
            providerRate: -13.296,   // ₱2.704 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '1570',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 minutes',
            sortOrder: 575,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Reach & Impressions (Instant, 100%, 100k/Day)',
            description: 'Reach & Impressions! Instant start. 100% delivery. 100k/Day speed!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 4.6253,         // Final rate with markup
            providerRate: -11.3747,  // ₱4.6253 - ₱16
            minQuantity: 100,
            maxQuantity: 250000,
            providerServiceId: '672',
            isDripFeed: false,
            isRefill: false,
            averageTime: '22 minutes',
            sortOrder: 576,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Saves WWW (Instant, 10k/hour)',
            description: 'Saves WWW! Instant start. 10k/hour speed!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 5.3962,         // Final rate with markup
            providerRate: -10.6038,  // ₱5.3962 - ₱16
            minQuantity: 100,
            maxQuantity: 9000,
            providerServiceId: '670',
            isDripFeed: false,
            isRefill: false,
            averageTime: '8 hours 49 minutes',
            sortOrder: 577,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Reel Views Plays (Super Instant, Superfast, Max 10m)',
            description: 'Reel Views Plays! Super Instant start. Superfast delivery. Max 10m!',
            platform: 'INSTAGRAM',
            type: 'Instagram Views/Saves/Reel',
            rate: 20.1614,        // Final rate with markup
            providerRate: 4.1614,   // ₱20.1614 - ₱16
            minQuantity: 100,
            maxQuantity: 5000000,
            providerServiceId: '82',
            isDripFeed: false,
            isRefill: false,
            averageTime: '18 minutes',
            sortOrder: 578,
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
        console.log(`✅ ID ${service.providerServiceId}: ₱${service.rate.toFixed(4)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Views/Saves/Reel services na-add!`);
    console.log('📺 Feature: Views, Saves, Story Views, Reel Views');
    console.log('📸 Platform: Instagram');
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
