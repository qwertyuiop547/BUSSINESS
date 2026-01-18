/**
 * Add Facebook Live Stream Viewers S7 Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-livestream-s7-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎥 Adding Facebook Live Stream Viewers S7 services...\n');

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

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    if (!provider) {
        console.log('🔗 Creating provider...');
        provider = await prisma.provider.create({
            data: {
                name: 'FB Live S7 Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Live Stream S7 provider',
            },
        });
    }

    // Facebook Live Stream Viewers S7 services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (15 Min)',
            description: 'Live stream viewers para sa Facebook. 15 minuto. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 29.77,        // ₱21.7724 + ₱8
            providerRate: 21.7724,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '4374',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour',
            sortOrder: 80,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (30 Min)',
            description: 'Live stream viewers para sa Facebook. 30 minuto. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 51.54,        // ₱43.5448 + ₱8
            providerRate: 43.5448,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1363',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 8 minutes',
            sortOrder: 81,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (45 Min)',
            description: 'Live stream viewers para sa Facebook. 45 minuto. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 73.32,        // ₱65.3172 + ₱8
            providerRate: 65.3172,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '4375',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 3 minutes',
            sortOrder: 82,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (60 Min)',
            description: 'Live stream viewers para sa Facebook. 1 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 95.09,        // ₱87.0896 + ₱8
            providerRate: 87.0896,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1364',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 26 minutes',
            sortOrder: 83,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (90 Min)',
            description: 'Live stream viewers para sa Facebook. 1.5 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 138.63,       // ₱130.6344 + ₱8
            providerRate: 130.6344,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1365',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 44 minutes',
            sortOrder: 84,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (120 Min)',
            description: 'Live stream viewers para sa Facebook. 2 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 182.18,       // ₱174.1792 + ₱8
            providerRate: 174.1792,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1366',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 9 minutes',
            sortOrder: 85,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (150 Min)',
            description: 'Live stream viewers para sa Facebook. 2.5 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 225.72,       // ₱217.724 + ₱8
            providerRate: 217.724,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1367',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 86,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (180 Min)',
            description: 'Live stream viewers para sa Facebook. 3 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 269.27,       // ₱261.2688 + ₱8
            providerRate: 261.2688,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1368',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 87,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (210 Min)',
            description: 'Live stream viewers para sa Facebook. 3.5 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 312.81,       // ₱304.8136 + ₱8
            providerRate: 304.8136,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1369',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 88,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (240 Min)',
            description: 'Live stream viewers para sa Facebook. 4 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 356.36,       // ₱348.3583 + ₱8
            providerRate: 348.3583,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1370',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 89,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (270 Min)',
            description: 'Live stream viewers para sa Facebook. 4.5 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 399.90,       // ₱391.9031 + ₱8
            providerRate: 391.9031,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1371',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 90,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (300 Min)',
            description: 'Live stream viewers para sa Facebook. 5 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 443.45,       // ₱435.4479 + ₱8
            providerRate: 435.4479,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1372',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 91,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (330 Min)',
            description: 'Live stream viewers para sa Facebook. 5.5 oras. S7 Quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 479.74,       // ₱471.7352 + ₱8
            providerRate: 471.7352,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1373',
            isDripFeed: false,
            isRefill: false,
            averageTime: '48 minutes',
            sortOrder: 92,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Views (360 Min)',
            description: 'Live stream viewers para sa Facebook. 6 oras. S7 Quality! Best for long streams!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Viewers S7',
            rate: 530.54,       // ₱522.5375 + ₱8
            providerRate: 522.5375,
            minQuantity: 20,
            maxQuantity: 10000,
            providerServiceId: '1374',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 93,
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
        const duration = service.name.match(/\d+ Min/)?.[0] || '';
        console.log(`✅ Added: ${duration} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Live Stream Viewers S7 services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const duration = s.name.match(/\d+ Min/)?.[0] || '';
        console.log(`${duration}: ₱${s.rate.toFixed(2)} (kita: ₱8.00)`);
    });
    console.log('─────────────────────────────────────────────────');
    console.log('Min: 20 | Max: 10,000');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
