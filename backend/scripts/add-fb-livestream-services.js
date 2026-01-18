/**
 * Add Facebook Live Stream Viewers Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-livestream-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎥 Adding Facebook Live Stream Viewers services...\n');

    // Get Facebook category
    let facebookCat = await prisma.category.findUnique({ where: { slug: 'facebook' } });

    if (!facebookCat) {
        console.log('📁 Creating Facebook category...');
        facebookCat = await prisma.category.create({
            data: {
                name: 'Facebook',
                slug: 'facebook',
                description: 'Facebook services',
                sortOrder: 2,
            },
        });
    }

    // Get or create provider (use Mock Provider or create a new one)
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    if (!provider) {
        console.log('🔗 Creating provider...');
        provider = await prisma.provider.create({
            data: {
                name: 'FB Live Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Live Stream provider',
            },
        });
    }

    // Mga Facebook Live Stream Viewers services (with ₱8 markup)
    // Original price + ₱8 = Selling price
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (15 Minutes)',
            description: 'Live stream viewers para sa Facebook. 15 minuto ang tagal. Mabilis magsimula!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 10.08,        // ₱2.0753 + ₱8 = ₱10.08
            providerRate: 2.0753,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4906',
            isDripFeed: false,
            isRefill: false,
            averageTime: '13 minutes',
            sortOrder: 10,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (30 Minutes)',
            description: 'Live stream viewers para sa Facebook. 30 minuto ang tagal.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 12.09,        // ₱4.0913 + ₱8 = ₱12.09
            providerRate: 4.0913,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4907',
            isDripFeed: false,
            isRefill: false,
            averageTime: '28 minutes',
            sortOrder: 11,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (60 Minutes)',
            description: 'Live stream viewers para sa Facebook. 1 oras ang tagal. Magandang pang-event!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 16.18,        // ₱8.1825 + ₱8 = ₱16.18
            providerRate: 8.1825,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4908',
            isDripFeed: false,
            isRefill: false,
            averageTime: '27 minutes',
            sortOrder: 12,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (90 Minutes)',
            description: 'Live stream viewers para sa Facebook. 1.5 oras ang tagal.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 20.27,        // ₱12.2737 + ₱8 = ₱20.27
            providerRate: 12.2737,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4909',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 12 minutes',
            sortOrder: 13,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (120 Minutes)',
            description: 'Live stream viewers para sa Facebook. 2 oras ang tagal. Best seller!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 24.36,        // ₱16.3649 + ₱8 = ₱24.36
            providerRate: 16.3649,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4910',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 41 minutes',
            sortOrder: 14,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (150 Minutes)',
            description: 'Live stream viewers para sa Facebook. 2.5 oras ang tagal.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 28.46,        // ₱20.4561 + ₱8 = ₱28.46
            providerRate: 20.4561,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4911',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 27 minutes',
            sortOrder: 15,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (180 Minutes)',
            description: 'Live stream viewers para sa Facebook. 3 oras ang tagal. Para sa mahabang live!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 32.55,        // ₱24.5474 + ₱8 = ₱32.55
            providerRate: 24.5474,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4912',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 36 minutes',
            sortOrder: 16,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (360 Minutes)',
            description: 'Live stream viewers para sa Facebook. 6 oras ang tagal. Sulit na sulit!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 57.09,        // ₱49.0947 + ₱8 = ₱57.09
            providerRate: 49.0947,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4913',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 7 minutes',
            sortOrder: 17,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Viewers (480 Minutes)',
            description: 'Live stream viewers para sa Facebook. 8 oras ang tagal. Pinakamatagal na option!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers Cheapest',
            rate: 73.46,        // ₱65.4595 + ₱8 = ₱73.46
            providerRate: 65.4595,
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '4914',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 18,
        },
    ];

    console.log('📝 Adding services to database...\n');

    for (const service of services) {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.name}`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        console.log(`✅ Added: ${service.name} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Live Stream Viewers services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const profit = s.rate - s.providerRate;
        console.log(`${s.name.replace('Facebook Live Stream Viewers ', '')}: ₱${s.rate.toFixed(2)} (kita: ₱${profit.toFixed(2)})`);
    });
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
