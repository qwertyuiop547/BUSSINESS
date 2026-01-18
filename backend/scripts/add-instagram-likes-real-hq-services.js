/**
 * Add Instagram Likes REAL (High Quality) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-likes-real-hq-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💎 Adding Instagram Likes REAL (High Quality) services...\n');

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

    // Instagram Likes REAL HQ services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes REAL S46 (Instant, Real APP Data, Ultrafast)',
            description: '💎 REAL Likes from APP Data! Ultrafast. High Quality. Premium!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes REAL (High Quality)',
            rate: 51.58,        // ₱35.5789 + ₱16
            providerRate: 35.5789,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '2459',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 9 minutes',
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
    console.log(`🎉 Tapos na! ${count} Instagram Likes REAL (HQ) service na-add!`);
    console.log('💎 Quality: Premium Real APP Data');
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
