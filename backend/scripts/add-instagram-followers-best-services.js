/**
 * Add Instagram Followers Best Services (All Flag Work)
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-best-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🏳️ Adding Instagram Followers Best Services (All Flag Work)...\n');

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

    // Instagram Followers Best Services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S44 (Instant, 365 days refill button, 100K/day, All Flag Work)',
            description: '🏳️ All Flag Work! Instant start. 100K/day speed. 365 days refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Best Services',
            rate: 56.9261,        // Final rate with markup
            providerRate: 40.9261,  // ₱56.9261 - ₱16
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1523',
            isDripFeed: false,
            isRefill: true,
            averageTime: '15 minutes',
            sortOrder: 420,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers AR30 S37 (40k/day, Real mixed, 30 days auto refill, All Flag Work)',
            description: '🏳️ All Flag Work! Real mixed followers. 40k/day speed. 30 days auto refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Best Services',
            rate: 113.2592,       // Final rate with markup
            providerRate: 97.2592,  // ₱113.2592 - ₱16
            minQuantity: 100,
            maxQuantity: 200000,
            providerServiceId: '3665',
            isDripFeed: false,
            isRefill: true,
            averageTime: '7 minutes',
            sortOrder: 421,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S01 (Instant, Real, 30K Per day, High Quality, 60 Days Refill button, All Flag Work)',
            description: '🏳️ All Flag Work! High Quality Real followers. Instant start. 30K/day. 60 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers Best Services',
            rate: 62.8559,        // Final rate with markup
            providerRate: 46.8559,  // ₱62.8559 - ₱16
            minQuantity: 10,
            maxQuantity: 3000000,
            providerServiceId: '1525',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 422,
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
    console.log(`🎉 Tapos na! ${count} Instagram Followers Best Services na-add!`);
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
