/**
 * Add Facebook Views Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-views-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👁️ Adding Facebook Views services...\n');

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
                name: 'FB Views Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Views provider',
            },
        });
    }

    // Facebook Views services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S3 (Instant, 100k/Day, Cheapest)',
            description: 'Cheapest Video/Reel Views! Instant start. 100k/Day speed. Budget-friendly option!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 8.17,         // ₱0.172 + ₱8
            providerRate: 0.172,
            minQuantity: 500,
            maxQuantity: 10000000,
            providerServiceId: '1280',
            isDripFeed: false,
            isRefill: false,
            averageTime: '143 hours 37 minutes',
            sortOrder: 150,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video Views S5 (Instant, 100k/Day, 3 seconds, 10 Million MAX)',
            description: 'Video Views with 3 sec watch time. 100k/Day. Max 10 Million!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 9.78,         // ₱1.7788 + ₱8
            providerRate: 1.7788,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '383',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 8 minutes',
            sortOrder: 151,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S3 (Instant, 15 Sec Watch, 10Million/Day, Lifetime guaranteed)',
            description: '15 sec watch time! Super fast 10M/Day. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 10.85,        // ₱2.8461 + ₱8
            providerRate: 2.8461,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1279',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 45 minutes',
            sortOrder: 152,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S8 (Instant, 1 Million/Day, Views + 10% Likes, Lifetime guaranteed)',
            description: 'Views + 10% FREE Likes! 1M/Day speed. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 11.56,        // ₱3.5576 + ₱8
            providerRate: 3.5576,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '204',
            isDripFeed: false,
            isRefill: true,
            averageTime: '66 hours 37 minutes',
            sortOrder: 153,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S3 (Instant, Monetizable, 10 Sec Watch, 200k/Day, Lifetime guaranteed)',
            description: 'MONETIZABLE views! 10 sec watch. 200k/Day. LIFETIME GUARANTEE! Best for earning!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 11.63,        // ₱3.6268 + ₱8
            providerRate: 3.6268,
            minQuantity: 500,
            maxQuantity: 2147483647,
            providerServiceId: '1504',
            isDripFeed: false,
            isRefill: true,
            averageTime: '6 hours 3 minutes',
            sortOrder: 154,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S6 (Instant, Superfast 1M/Day, Lifetime guaranteed)',
            description: 'SUPERFAST 1 Million/Day! Instant start. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 12.98,        // ₱4.9807 + ₱8
            providerRate: 4.9807,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1136',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 44 minutes',
            sortOrder: 155,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reel/Video Views S1 (Instant, 3 Sec Watch, 50k/Day, Lifetime guaranteed)',
            description: 'Reel/Video Views! 3 sec watch. 50k/Day. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 13.69,        // ₱5.6922 + ₱8
            providerRate: 5.6922,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '355',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 58 minutes',
            sortOrder: 156,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S8 (Instant, 20k/Day, Lifetime guaranteed)',
            description: 'Steady 20k/Day delivery. LIFETIME GUARANTEE! Consistent quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 19.38,        // ₱11.3843 + ₱8
            providerRate: 11.3843,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '1071',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 minutes',
            sortOrder: 157,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video Views S6 (Instant, 100k - 500k per Day, Lifetime guaranteed)',
            description: 'Fast 100k-500k/Day! LIFETIME GUARANTEE! Great for viral content!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 22.23,        // ₱14.2304 + ₱8
            providerRate: 14.2304,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1135',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 158,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S7 (Instant, 100k/Day, Lifetime guaranteed)',
            description: 'Premium quality 100k/Day. LIFETIME GUARANTEE! Reliable and stable!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 36.46,        // ₱28.4607 + ₱8
            providerRate: 28.4607,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '88',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 17 minutes',
            sortOrder: 159,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video/Reel Views S3 (Instant, Monetizable, 3 Sec Watch, 200k/Day, Lifetime guaranteed)',
            description: 'MONETIZABLE views! 3 sec watch. 200k/Day. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 45.06,        // ₱37.0582 + ₱8
            providerRate: 37.0582,
            minQuantity: 100,
            maxQuantity: 20000000,
            providerServiceId: '1278',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 8 minutes',
            sortOrder: 160,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Video Views S6 (Instant, 3 Min Watch, 100k/Day, Lifetime guaranteed)',
            description: '3 MINUTE watch time! Premium retention. 100k/Day. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 73.14,        // ₱65.1425 + ₱8
            providerRate: 65.1425,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '931',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 46 minutes',
            sortOrder: 161,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Views S3 (Instant, Speed 250k/Day)',
            description: 'Story Views! Super fast 250k/Day. Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Views',
            rate: 88.26,        // ₱80.2628 + ₱8
            providerRate: 80.2628,
            minQuantity: 20,
            maxQuantity: 20000,
            providerServiceId: '2902',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 162,
        },
    ];

    console.log('📝 Adding services to database...\n');

    for (const service of services) {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.name.substring(0, 50)}...`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        // Extract service version
        const version = service.name.match(/S\d+/)?.[0] || '';
        console.log(`✅ Added: ${version} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Views services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const version = s.name.match(/S\d+/)?.[0] || '';
        const type = s.name.includes('Story') ? 'Story' : 'Video/Reel';
        console.log(`${type} ${version}: ₱${s.rate.toFixed(2)} | Max: ${s.maxQuantity.toLocaleString()}`);
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
