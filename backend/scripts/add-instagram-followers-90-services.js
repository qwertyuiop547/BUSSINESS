/**
 * Add Instagram Followers 90 Days Refill (All Flag Work) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-90-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🏳️ Adding Instagram Followers 90 Days Refill (All Flag Work) services...\n');

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

    // Instagram Followers 90 Days services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S02 (Instant, Real, 10k/hour, 90 days refill button, All Flag Work)',
            description: '🏳️ All Flag Work! REAL followers. SUPER FAST 10k/hour! 90 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 90 Days Refill',
            rate: 69.37,        // ₱53.3683 + ₱16
            providerRate: 53.3683,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '2514',
            isDripFeed: false,
            isRefill: true,
            averageTime: '20 minutes',
            sortOrder: 500,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S03 (Super fast 100k/Day, Old data, 90 days refill button, All Flag Work)',
            description: '🏳️ All Flag Work! Super fast 100k/day! Old data accounts. 90 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 90 Days Refill',
            rate: 69.37,        // ₱53.3683 + ₱16
            providerRate: 53.3683,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '2515',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 501,
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
    console.log(`🎉 Tapos na! ${count} Instagram Followers 90 Days services na-add!`);
    console.log('🏳️ Feature: All Flag Work');
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
