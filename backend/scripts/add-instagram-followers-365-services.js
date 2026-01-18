/**
 * Add Instagram Followers 365 Days Refill (All Flag Work) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-365-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🏳️ Adding Instagram Followers 365 Days Refill (All Flag Work) services...\n');

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

    // Instagram Followers 365 Days services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '*** Instagram Followers: REAL S62 (Instant, 50k/day, Old accounts, 365 Days Guarantee, All Flag Work)',
            description: '🏳️ All Flag Work! REAL Old accounts. 50k/day. 365 Days Guarantee!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 365 Days Refill',
            rate: 72.93,        // ₱56.9261 + ₱16
            providerRate: 56.9261,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1658',
            isDripFeed: false,
            isRefill: true,
            averageTime: '10 hours 47 minutes',
            sortOrder: 490,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '*** Instagram Followers S44 (Instant, 365 days refill button, 100K/day, All Flag Work)',
            description: '🏳️ All Flag Work! 100K/day speed! 365 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 365 Days Refill',
            rate: 72.93,        // ₱56.9261 + ₱16
            providerRate: 56.9261,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1660',
            isDripFeed: false,
            isRefill: true,
            averageTime: '22 hours 36 minutes',
            sortOrder: 491,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '*** Instagram Followers S54 (Instant, 300k/day, 365 days refill, All Flag Work)',
            description: '🏳️ All Flag Work! SUPER FAST 300k/day! 365 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 365 Days Refill',
            rate: 75.30,        // ₱59.2981 + ₱16
            providerRate: 59.2981,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1432',
            isDripFeed: false,
            isRefill: true,
            averageTime: '13 hours 57 minutes',
            sortOrder: 492,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers Indian S2 (Instant, Real Indian mixed, Max 1M, 30k Per day, 365 Days refill)',
            description: '🇮🇳 India targeted! Real Indian mixed. 30k/day. 365 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 365 Days Refill',
            rate: 85.29,        // ₱69.2890 + ₱16
            providerRate: 69.289,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '7',
            isDripFeed: false,
            isRefill: true,
            averageTime: '7 hours 30 minutes',
            sortOrder: 493,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '*** Instagram Followers S57 (Instant, 25k/day, Real, 365 Days Refill button, All Flag Work)',
            description: '🏳️ All Flag Work! REAL followers. 25k/day. 365 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 365 Days Refill',
            rate: 87.16,        // ₱71.1577 + ₱16
            providerRate: 71.1577,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1608',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 hours 22 minutes',
            sortOrder: 494,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S45 (100k/day, High Quality Old Accounts, 365 Days Refill, All Flag Work)',
            description: '🏳️ All Flag Work! HIGH QUALITY Old Accounts. 100k/day. 365 Days Refill! PREMIUM!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers 365 Days Refill',
            rate: 151.20,       // ₱135.1995 + ₱16
            providerRate: 135.1995,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '658',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 hours 18 minutes',
            sortOrder: 495,
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
    console.log(`🎉 Tapos na! ${count} Instagram Followers 365 Days services na-add!`);
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
