/**
 * Add Instagram Followers Targeted (Refill) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-targeted-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎯 Adding Instagram Followers Targeted (Refill) services...\n');

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

    // Instagram Followers Targeted services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers Persian Iran (Super Instant Start, 20k per day, Real Persian Account, 30Days Refill, Max 50k)',
            description: '🇮🇷 Iran targeted! Real Persian accounts. Super instant start. 20k/day. 30 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 219.4027,       // Final rate with markup
            providerRate: 203.4027,  // ₱219.4027 - ₱16
            minQuantity: 200,
            maxQuantity: 50000,
            providerServiceId: '315',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 450,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram ARAB Followers (AR30, Instant start, Superfast)',
            description: '🇸🇦 Arab targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 256.6181,       // Final rate with markup
            providerRate: 240.6181,  // ₱256.6181 - ₱16
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2610',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 451,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram South Asia Followers (India, Pakistan, etc.) (AR30, Instant start, Superfast)',
            description: '🌏 South Asia (India, Pakistan, etc.) targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 256.6181,       // Final rate with markup
            providerRate: 240.6181,  // ₱256.6181 - ₱16
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2820',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours',  // Estimated (not enough data provided)
            sortOrder: 452,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Asia Followers (Indonesia, Thailand, etc.) (AR30, Instant start, Superfast)',
            description: '🌏 Asia (Indonesia, Thailand, etc.) targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 256.6181,       // Final rate with markup
            providerRate: 240.6181,  // ₱256.6181 - ₱16
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2621',
            isDripFeed: false,
            isRefill: true,
            averageTime: '48 minutes',
            sortOrder: 453,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Europe Followers (AR30, Instant start, Superfast)',
            description: '🇪🇺 Europe targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 256.6181,       // Final rate with markup
            providerRate: 240.6181,  // ₱256.6181 - ₱16
            minQuantity: 5,
            maxQuantity: 2000,
            providerServiceId: '2622',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 hours 14 minutes',
            sortOrder: 454,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Latinos Followers (Latin America and Mexico) (AR30, Instant start, Superfast)',
            description: '🇲🇽 Latin America & Mexico targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 256.6181,       // Final rate with markup
            providerRate: 240.6181,  // ₱256.6181 - ₱16
            minQuantity: 10,
            maxQuantity: 10000,
            providerServiceId: '2623',
            isDripFeed: false,
            isRefill: true,
            averageTime: '15 hours 11 minutes',
            sortOrder: 455,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Turkey Followers (AR30, Instant start, Superfast)',
            description: '🇹🇷 Turkey targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 256.6181,       // Final rate with markup
            providerRate: 240.6181,  // ₱256.6181 - ₱16
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2824',
            isDripFeed: false,
            isRefill: true,
            averageTime: '80 hours 45 minutes',
            sortOrder: 456,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers Indian S2 (Instant, Real Indian mixed, Max 1M, 30k Per day, 365 Days refill)',
            description: '🇮🇳 India targeted! Real Indian mixed. Instant start. 30k/day. 365 Days refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 289.3743,       // Final rate with markup
            providerRate: 273.3743,  // ₱289.3743 - ₱16
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '3020',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 457,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Africa Followers (AR30, Instant start, Superfast)',
            description: '🇿🇦 Africa targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 293.3829,       // Final rate with markup
            providerRate: 277.3829,  // ₱293.3829 - ₱16
            minQuantity: 10,
            maxQuantity: 3000,
            providerServiceId: '2618',
            isDripFeed: false,
            isRefill: true,
            averageTime: '50 hours 14 minutes',
            sortOrder: 458,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram USA Followers (USA, Canada, etc) (AR30, Instant start, Superfast)',
            description: '🇺🇸 USA & Canada targeted! AR30 (30 days auto refill). Instant start. Superfast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 293.3829,       // Final rate with markup
            providerRate: 277.3829,  // ₱293.3829 - ₱16
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2625',
            isDripFeed: false,
            isRefill: true,
            averageTime: '30 hours 20 minutes',
            sortOrder: 459,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers Indonesia (Max: 1K, Update Special, SuperHQ, Ultra Fast, 30 Days Refill)',
            description: '🇮🇩 Indonesia targeted! Super HQ. Ultra fast. 30 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 317.2918,       // Final rate with markup
            providerRate: 301.2918,  // ₱317.2918 - ₱16
            minQuantity: 10,
            maxQuantity: 25000,
            providerServiceId: '2628',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 460,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers Arab (Instant, Superfast, 25K, 30 Days refill Button)',
            description: '🇸🇦 Arab targeted! Instant start. Superfast. 30 Days refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Targeted (Refill)',
            rate: 317.2918,       // Final rate with markup
            providerRate: 301.2918,  // ₱317.2918 - ₱16
            minQuantity: 10,
            maxQuantity: 25000,
            providerServiceId: '1888',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 25 minutes',
            sortOrder: 461,
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
    console.log(`🎉 Tapos na! ${count} Instagram Followers Targeted (Refill) services na-add!`);
    console.log('🎯 Feature: Country/Region Targeted');
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
