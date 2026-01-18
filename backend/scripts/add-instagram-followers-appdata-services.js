/**
 * Add Instagram Followers (Real App Data) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-followers-appdata-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📸 Adding Instagram Followers (Real App Data) services...\n');

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

    // Instagram Followers Real App Data services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality Apps data, 100k/days, Super Instant, NR)',
            description: 'High Quality from Apps data! 100k/day. Super Instant. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (Real App Data)',
            rate: 53.95,        // ₱37.9527 + ₱16
            providerRate: 37.9527,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4931',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 33 minutes',
            sortOrder: 400,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers F4 (High quality Apps data, 100k/days, Super Instant, R30)',
            description: 'High Quality from Apps data! 100k/day. Super Instant. 30 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (Real App Data)',
            rate: 71.51,        // ₱55.5058 + ₱16
            providerRate: 55.5058,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4932',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 35 minutes',
            sortOrder: 401,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality Apps data, 100k/days, Super Instant, R60)',
            description: 'High Quality from Apps data! 100k/day. Super Instant. 60 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (Real App Data)',
            rate: 72.22,        // ₱56.2174 + ₱16
            providerRate: 56.2174,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4933',
            isDripFeed: false,
            isRefill: true,
            averageTime: '6 hours 10 minutes',
            sortOrder: 402,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers F4 (High quality Apps data, 100k/days, Super Instant, R120)',
            description: 'High Quality from Apps data! 100k/day. Super Instant. 120 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (Real App Data)',
            rate: 72.93,        // ₱56.929 + ₱16
            providerRate: 56.929,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4934',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 hours 50 minutes',
            sortOrder: 403,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Followers E4 (High quality Apps data, 100k/days, Super Instant, R365)',
            description: 'High Quality from Apps data! 100k/day. Super Instant. 365 Days Refill! Best long-term!',
            platform: 'INSTAGRAM',
            type: 'Instagram Followers (Real App Data)',
            rate: 72.66,        // ₱56.6606 + ₱16
            providerRate: 56.6606,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4935',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 404,
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
        const refill = service.name.match(/NR|R\d+/)?.[0] || '';
        console.log(`✅ ${refill}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Followers (Real App Data) services na-add!`);
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
