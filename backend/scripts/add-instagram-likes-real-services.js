/**
 * Add Instagram Likes REAL Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-likes-real-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💎 Adding Instagram Likes REAL services...\n');

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

    // Instagram Likes REAL services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Active Likes S1 (Superinstant, Real active App Data Worldwide users, 15K)',
            description: '💎 REAL Active Likes from App Data! Worldwide users. Superinstant start. 15K capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes REAL',
            rate: 66.7103,        // Final rate with markup
            providerRate: 50.7103,  // ₱66.7103 - ₱16
            minQuantity: 30,
            maxQuantity: 3000,
            providerServiceId: '2398',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 540,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Active Likes S2 (Superinstant, Real active App Data Worldwide users, 30K)',
            description: '💎 REAL Active Likes from App Data! Worldwide users. Superinstant start. 30K capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes REAL',
            rate: 90.4295,        // Final rate with markup
            providerRate: 74.4295,  // ₱90.4295 - ₱16
            minQuantity: 20,
            maxQuantity: 4000,
            providerServiceId: '2399',
            isDripFeed: false,
            isRefill: false,
            averageTime: '7 hours 56 minutes',
            sortOrder: 541,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes REAL S21 (Superinstant, Turkish Real, Superfast, Non drop)',
            description: '💎 REAL Turkish Likes! Superinstant start. Superfast delivery. Non drop guarantee!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes REAL',
            rate: 98.2272,        // Final rate with markup
            providerRate: 82.2272,  // ₱98.2272 - ₱16
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '403',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 29 minutes',
            sortOrder: 542,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Turkish Active Likes (Superinstant, Real active App Data Worldwide users, 10K)',
            description: '💎 REAL Turkish Active Likes from App Data! Worldwide users. Superinstant start. 10K capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes REAL',
            rate: 103.0303,       // Final rate with markup
            providerRate: 87.0303,  // ₱103.0303 - ₱16
            minQuantity: 20,
            maxQuantity: 5000,
            providerServiceId: '2400',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 543,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Like REAL S29 (Instant, 100% REAL LIKES, Fast, Max 10K)',
            description: '💎 100% REAL LIKES! Instant start. Fast delivery. Premium quality!',
            platform: 'INSTAGRAM',
            type: 'Instagram Likes REAL',
            rate: 26.9806,        // Final rate with markup
            providerRate: 10.9806,  // ₱26.9806 - ₱16
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '437',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 minutes',
            sortOrder: 544,
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
    console.log(`🎉 Tapos na! ${count} Instagram Likes REAL services na-add!`);
    console.log('💎 Quality: REAL Likes from Active App Data');
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
