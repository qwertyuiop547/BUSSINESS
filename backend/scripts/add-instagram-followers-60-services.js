/**
 * Add Instagram Followers 60 Days Refill (All Flag Work) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-60-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🏳️ Adding Instagram Followers 60 Days Refill (All Flag Work) services...\n');

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

    // Instagram Followers 60 Days services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S01 (Instant, Real, 30K Per day, High Quality, 60 Days Refill button, All Flag Work)',
            description: '🏳️ All Flag Work! High Quality Real followers. Instant start. 30K/day. 60 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 60 Days Refill',
            rate: 62.8559,        // Final rate with markup
            providerRate: 46.8559,  // ₱62.8559 - ₱16
            minQuantity: 10,
            maxQuantity: 3000000,
            providerServiceId: '2513',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 495,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S47 (Instant, Ultrafast 300K/day, High Quality, 60 Days Refill button)',
            description: '🏳️ All Flag Work! Ultrafast 300K/day! High Quality. 60 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 60 Days Refill',
            rate: 229.7798,       // Final rate with markup
            providerRate: 213.7798,  // ₱229.7798 - ₱16
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '1126',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 496,
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
    console.log(`🎉 Tapos na! ${count} Instagram Followers 60 Days services na-add!`);
    console.log('🏳️ Feature: All Flag Work');
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
