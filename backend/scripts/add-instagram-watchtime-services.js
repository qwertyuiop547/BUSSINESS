/**
 * Add Instagram Watch Time Views Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-watchtime-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('⏱️ Adding Instagram Watch Time Views services...\n');

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

    // Instagram Watch Time Views services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Reel Views 20% WatchTime (Good For REEL Trending, Instant, Superfast 200k per day)',
            description: 'Reel Views with 20% watch time! Good for REEL trending. Instant start. Superfast 200k/day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Watch Time Views',
            rate: 3.2614,         // Final rate with markup
            providerRate: -12.7386,  // ₱3.2614 - ₱16 (negative means very low cost base)
            minQuantity: 100,
            maxQuantity: 200000,
            providerServiceId: '3632',
            isDripFeed: false,
            isRefill: false,
            averageTime: '7 minutes',
            sortOrder: 530,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Reel Views 50% WatchTime (Good For REEL Trending, Instant, Superfast 200k per day)',
            description: 'Reel Views with 50% watch time! Good for REEL trending. Instant start. Superfast 200k/day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Watch Time Views',
            rate: 3.4986,         // Final rate with markup
            providerRate: -12.5014,  // ₱3.4986 - ₱16
            minQuantity: 100,
            maxQuantity: 200000,
            providerServiceId: '3633',
            isDripFeed: false,
            isRefill: false,
            averageTime: '13 minutes',
            sortOrder: 531,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Reel Views 100% WatchTime (Good For REEL Trending, Instant, Superfast 200k per day)',
            description: 'Reel Views with 100% watch time! Good for REEL trending. Instant start. Superfast 200k/day!',
            platform: 'INSTAGRAM',
            type: 'Instagram Watch Time Views',
            rate: 3.5579,         // Final rate with markup
            providerRate: -12.4421,  // ₱3.5579 - ₱16
            minQuantity: 100,
            maxQuantity: 200000,
            providerServiceId: '3634',
            isDripFeed: false,
            isRefill: false,
            averageTime: '11 minutes',
            sortOrder: 532,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views 20% Watchtime S02 (Instant, Ultrafast, Video/Reel/IGTV, Good for ranking)',
            description: 'Views with 20% watch time! Video/Reel/IGTV. Instant start. Ultrafast. Good for ranking!',
            platform: 'INSTAGRAM',
            type: 'Instagram Watch Time Views',
            rate: 3.7062,         // Final rate with markup
            providerRate: -12.2938,  // ₱3.7062 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '3635',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 533,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views 100% Watchtime S02 (Instant, Ultrafast, Video/Reel/IGTV, Good for ranking)',
            description: 'Views with 100% watch time! Video/Reel/IGTV. Instant start. Ultrafast. Good for ranking!',
            platform: 'INSTAGRAM',
            type: 'Instagram Watch Time Views',
            rate: 3.7062,         // Final rate with markup
            providerRate: -12.2938,  // ₱3.7062 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '3837',
            isDripFeed: false,
            isRefill: false,
            averageTime: '10 hours 8 minutes',
            sortOrder: 534,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Views 50% Watchtime S02 (Instant, Ultrafast, Video/Reel/IGTV, Good for ranking)',
            description: 'Views with 50% watch time! Video/Reel/IGTV. Instant start. Ultrafast. Good for ranking!',
            platform: 'INSTAGRAM',
            type: 'Instagram Watch Time Views',
            rate: 4.0798,         // Final rate with markup
            providerRate: -11.9202,  // ₱4.0798 - ₱16
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '3636',
            isDripFeed: false,
            isRefill: false,
            averageTime: '32 minutes',
            sortOrder: 535,
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
    console.log(`🎉 Tapos na! ${count} Instagram Watch Time Views services na-add!`);
    console.log('⏱️ Feature: Watch Time Views (20%, 50%, 100%)');
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
