/**
 * Add Instagram Followers (HQ) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-hq-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📸 Adding Instagram Followers (HQ) services...\n');

    // Get or create Instagram category
    let instagramCat = await prisma.category.findUnique({ where: { slug: 'instagram' } });

    if (!instagramCat) {
        console.log('📁 Creating Instagram category...');
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

    // Instagram Followers HQ services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality accounts, Instant, Superfast, No refill)',
            description: 'High Quality accounts! Instant start. Superfast. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 67.59,        // ₱51.5919 + ₱16
            providerRate: 51.5919,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4832',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 410,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E5 (High quality accounts, 1-12 Hours start, Superfast, 30 Days refill)',
            description: 'High Quality accounts! 1-12 hours start. 30 Days Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 69.37,        // ₱53.371 + ₱16
            providerRate: 53.371,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4846',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 32 minutes',
            sortOrder: 411,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E5 (High quality accounts, Instant, Superfast, 90 Days refill)',
            description: 'High Quality accounts! Instant start. Superfast. 90 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 77.84,        // ₱61.8354 + ₱16
            providerRate: 61.8354,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4847',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 412,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality accounts, Instant, Superfast, 60 Days refill)',
            description: 'High Quality accounts! Instant start. Superfast. 60 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 78.86,        // ₱62.8591 + ₱16
            providerRate: 62.8591,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4834',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 413,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality accounts, Instant, Superfast, 120 Days refill)',
            description: 'High Quality accounts! Instant start. Superfast. 120 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 84.71,        // ₱68.7082 + ₱16
            providerRate: 68.7082,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4835',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 15 minutes',
            sortOrder: 414,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality accounts, Instant, Superfast, 30 Days refill)',
            description: 'High Quality accounts! Instant start. Superfast. 30 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 101.39,       // ₱85.3935 + ₱16
            providerRate: 85.3935,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4833',
            isDripFeed: false,
            isRefill: true,
            averageTime: '7 hours 4 minutes',
            sortOrder: 415,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality accounts, Instant, Superfast, 365 Days refill)',
            description: 'High Quality accounts! Instant start. Superfast. 365 Days Refill! Best long-term!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (HQ)',
            rate: 121.74,       // ₱105.7419 + ₱16
            providerRate: 105.7419,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4836',
            isDripFeed: false,
            isRefill: true,
            averageTime: '9 hours 40 minutes',
            sortOrder: 416,
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
        const refill = service.name.match(/No refill|\d+ Days refill/i)?.[0] || '';
        console.log(`✅ ${refill}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Followers (HQ) services na-add!`);
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
