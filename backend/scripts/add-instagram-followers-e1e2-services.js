/**
 * Add Instagram Followers E1 & E2 Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-e1e2-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📸 Adding Instagram Followers E1 & E2 services...\n');

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

    // Instagram Followers E1 & E2 services (with ₱16 markup)
    const services = [
        // E2 Series - 20k/day, 5% drop
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers No Refill E2 (Instant, 20k/day, 5% drop, Updated 20 October 2025)',
            description: 'E2 Series! 20k/day speed. Only 5% drop. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E2',
            rate: 58.69,        // ₱42.6946 + ₱16
            providerRate: 42.6946,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4552',
            isDripFeed: false,
            isRefill: false,
            averageTime: '53 minutes',
            sortOrder: 440,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 30 Days Refill E2 (Instant, 20k/day, 5% drop, Updated 20 October 2025)',
            description: 'E2 Series! 20k/day speed. Only 5% drop. 30 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E2',
            rate: 62.25,        // ₱46.2525 + ₱16
            providerRate: 46.2525,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4549',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 34 minutes',
            sortOrder: 441,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 90 Days Refill E2 (Instant, 20k/day, 5% drop, Updated 20 October 2025)',
            description: 'E2 Series! 20k/day speed. Only 5% drop. 90 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E2',
            rate: 65.81,        // ₱49.8104 + ₱16
            providerRate: 49.8104,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4550',
            isDripFeed: false,
            isRefill: true,
            averageTime: '13 hours 19 minutes',
            sortOrder: 442,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 365 Days Refill E2 (Instant, 20k/day, 5% drop, Updated 20 October 2025)',
            description: 'E2 Series! 20k/day speed. Only 5% drop. 365 Days Refill! Best long-term!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E2',
            rate: 69.37,        // ₱53.3683 + ₱16
            providerRate: 53.3683,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4551',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 2 minutes',
            sortOrder: 443,
        },
        // E1 Series
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers No Refill E1 (Updated 12 October 2025)',
            description: 'E1 Series! Min 5 only. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E1',
            rate: 59.41,        // ₱43.4062 + ₱16
            providerRate: 43.4062,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '4393',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 hours 53 minutes',
            sortOrder: 444,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 30 Days Refill E1 (Updated 12 October 2025)',
            description: 'E1 Series! Min 5 only. 30 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E1',
            rate: 67.85,        // ₱51.8451 + ₱16
            providerRate: 51.8451,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '4395',
            isDripFeed: false,
            isRefill: true,
            averageTime: '37 minutes',
            sortOrder: 445,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 365 Days Refill E1 (Updated 12 October 2025)',
            description: 'E1 Series! Min 5 only. 365 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E1',
            rate: 72.21,        // ₱56.2146 + ₱16
            providerRate: 56.2146,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '4396',
            isDripFeed: false,
            isRefill: true,
            averageTime: '40 minutes',
            sortOrder: 446,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 7 Days Refill E1 (Updated 12 October 2025)',
            description: 'E1 Series! Min 5 only. 7 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E1',
            rate: 81.47,        // ₱65.4651 + ₱16
            providerRate: 65.4651,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '4394',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 447,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers 365 Days Refill E2 (Updated 12 October 2025) - Premium',
            description: 'Premium E2! 365 Days Refill. Best quality!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers E1',
            rate: 151.20,       // ₱135.1995 + ₱16
            providerRate: 135.1995,
            minQuantity: 5,
            maxQuantity: 1000000,
            providerServiceId: '4397',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 448,
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
    console.log(`🎉 Tapos na! ${count} Instagram Followers E1 & E2 services na-add!`);
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
