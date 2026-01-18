/**
 * Add Instagram REEL Services (Various Instagram Services)
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-reel-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📱 Adding Instagram REEL services...\n');

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

    // Instagram REEL services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Reel Views S2 (Instant, Max 1M)',
            description: 'Reel Views S2! Instant start. Max 1M capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 4.9853,         // Final rate with markup
            providerRate: -11.0147,  // ₱4.9853 - ₱16
            minQuantity: 50,
            maxQuantity: 2147483647,
            providerServiceId: '3651',
            isDripFeed: false,
            isRefill: false,
            averageTime: '34 minutes',
            sortOrder: 610,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Likes INDIAN (Instant, Fast, 90% Indian, Real, Max 5k)',
            description: '🇮🇳 Indian Likes! 90% Indian. Real accounts. Instant start. Fast delivery. Max 5k!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 14.5938,        // Final rate with markup
            providerRate: -1.4062,  // ₱14.5938 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '330',
            isDripFeed: false,
            isRefill: false,
            averageTime: '12 hours 44 minutes',
            sortOrder: 611,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S44 (Instant- 10 minute, 20k/day, High Quality, 30 Days Refill button)',
            description: 'High Quality Followers S44! Instant-10 minute start. 20k/day. 30 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 53.4137,        // Final rate with markup
            providerRate: 37.4137,  // ₱53.4137 - ₱16
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '426',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 612,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers S44 (Instant- 10 minute, 20k/day, High Quality, 90 Days Refill button)',
            description: 'High Quality Followers S44! Instant-10 minute start. 20k/day. 90 Days Refill button!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 81.901,         // Final rate with markup
            providerRate: 65.901,   // ₱81.901 - ₱16
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '963',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 613,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram - Followers S33 (Instant-20 minutes, 5K/hour, 100% PP, Low Drop, 30 Days Refill Button Fastest Refill)',
            description: 'Followers S33! Instant-20 minutes start. 5K/hour. 100% PP. Low Drop. 30 Days Refill Button!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 272.291,        // Final rate with markup
            providerRate: 256.291,  // ₱272.291 - ₱16
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '448',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 614,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram VIP Followers S25 (Instant, 90 Days Refill button 365 days Manual refill, 15K/day)',
            description: 'VIP Followers S25! Instant start. 90 Days Refill button + 365 days Manual refill. 15K/day!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 59.3486,        // Final rate with markup
            providerRate: 43.3486,  // ₱59.3486 - ₱16
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '377',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 27 minutes',
            sortOrder: 615,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Website 100% Real Traffic From Instagram',
            description: 'Website Traffic! 100% Real Traffic from Instagram. High quality real visitors!',
            platform: 'INSTAGRAM',
            type: 'Instagram REEL',
            rate: 14.7185,        // Final rate with markup
            providerRate: -1.2815,  // ₱14.7185 - ₱16
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '766',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 14 minutes',
            sortOrder: 616,
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
    console.log(`🎉 Tapos na! ${count} Instagram REEL services na-add!`);
    console.log('📱 Feature: Reel Views, Likes, Followers, Website Traffic');
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
