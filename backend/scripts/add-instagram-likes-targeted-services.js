/**
 * Add Instagram Likes Targeted Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-likes-targeted-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎯 Adding Instagram Likes Targeted services...\n');

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

    // Instagram Likes Targeted services (with ₱16 markup)
    const services = [
        // Indian Real
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Indian Real (100% Real Accounts with Posts and Profiles, 5k-10k Per Day, No refill)',
            description: '🇮🇳 India targeted! 100% Real Accounts. 5k-10k/day. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 33.74,        // ₱17.7395 + ₱16
            providerRate: 17.7395,
            minQuantity: 50,
            maxQuantity: 100000,
            providerServiceId: '4520',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 hours 14 minutes',
            sortOrder: 470,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Indian Real (100% Real Accounts with Posts and Profiles, 5k-10k Per Day, 365 days refill)',
            description: '🇮🇳 India targeted! 100% Real Accounts. 5k-10k/day. 365 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 35.21,        // ₱19.2126 + ₱16
            providerRate: 19.2126,
            minQuantity: 50,
            maxQuantity: 100000,
            providerServiceId: '4521',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 471,
        },
        // Egypt
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes Egypt (Instant, 100% Real Human, SuperFast, Max 10K)',
            description: '🇪🇬 Egypt targeted! 100% Real Human. SuperFast!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 83.78,        // ₱67.7848 + ₱16
            providerRate: 67.7848,
            minQuantity: 10,
            maxQuantity: 10000,
            providerServiceId: '1902',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 472,
        },
        // South Asia HQ
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram South Asia Likes HQ (India, Pakistan, etc.) Instant, Superfast, 30 Days auto refill)',
            description: '🌏 South Asia (India, Pakistan)! HQ. Superfast. 30 Days Auto Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2696',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 473,
        },
        // Asia HQ
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Asia Likes HQ (Indonesia, Thailand, etc.) (Instant, Superfast, 30 Days auto refill)',
            description: '🌏 Asia (Indonesia, Thailand)! HQ. Superfast. 30 Days Auto Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2697',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 474,
        },
        // Europe HQ
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Europe Likes HQ (Instant, Superfast, 30 Days auto refill)',
            description: '🇪🇺 Europe targeted! HQ. Superfast. 30 Days Auto Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2698',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 14 minutes',
            sortOrder: 475,
        },
        // Latinos HQ
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Latinos Likes HQ (Latin America and Mexico) (Instant, Superfast, 30 Days auto refill)',
            description: '🌎 Latin America & Mexico! HQ. Superfast. 30 Days Auto Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2700',
            isDripFeed: false,
            isRefill: true,
            averageTime: '6 hours',
            sortOrder: 476,
        },
        // Turkey HQ
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Turkey Likes HQ (Instant, Superfast, 30 Days auto refill)',
            description: '🇹🇷 Turkey targeted! HQ. Superfast. 30 Days Auto Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2701',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 477,
        },
        // USA HQ
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram USA Likes HQ (USA, Canada, etc) (Instant, Superfast, 30 Days auto refill)',
            description: '🇺🇸 USA & Canada! HQ. Superfast. 30 Days Auto Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes Targeted',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 5000,
            providerServiceId: '2702',
            isDripFeed: false,
            isRefill: true,
            averageTime: '19 hours 3 minutes',
            sortOrder: 478,
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
    console.log(`🎉 Tapos na! ${count} Instagram Likes Targeted services na-add!`);
    console.log('🎯 Countries: 9 regions');
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
