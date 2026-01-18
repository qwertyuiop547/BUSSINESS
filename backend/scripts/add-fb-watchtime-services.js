/**
 * Add Facebook 60K & 600K Minutes Watchtime Services
 * 
 * Para sa Facebook Monetization!
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-watchtime-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('⏱️ Adding Facebook 60K & 600K Minutes Watchtime services...\n');

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
                name: 'FB Watchtime Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Watchtime provider',
            },
        });
    }

    // Facebook 60K & 600K Minutes Watchtime services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook 60k Minute Watch time S3 (Instant, 100k/Day, Monetization, For 10 Minutes Video, Lifetime Guarantee)',
            description: '60K minutes watch time para sa monetization! Instant start. 100k/Day. Para sa 10 min videos. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook 60K & 600K Minutes Watchtime',
            rate: 50.99,        // ₱42.9875 + ₱8
            providerRate: 42.9875,
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '1831',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 140,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook 600k Minutes Watch time S2 (Instant, Fast, Monetization, Order 10000-600k, Lifetime Guarantee)',
            description: '600K minutes watch time para sa monetization! Instant, Fast delivery. LIFETIME GUARANTEE!',
            platform: 'FACEBOOK',
            type: 'Facebook 60K & 600K Minutes Watchtime',
            rate: 167.53,       // ₱159.5338 + ₱8
            providerRate: 159.5338,
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '1188',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 141,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook 600k Minute Watch time S5 (Instant, 50k/Day, Monetization, Min 3 hours video, Order 1000-600k Minutes)',
            description: '600K minutes watch time! 50k/Day delivery. Para sa videos na minimum 3 hours. Best for long content!',
            platform: 'FACEBOOK',
            type: 'Facebook 60K & 600K Minutes Watchtime',
            rate: 342.39,       // ₱334.3852 + ₱8
            providerRate: 334.3852,
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '1336',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 142,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook 600K Minute Watch time S4 (Instant, 100k/Day, Monetization, Minimum 1 hour video, Order 1000-600k Minutes)',
            description: '600K minutes watch time! 100k/Day delivery. Para sa videos na minimum 1 hour. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook 60K & 600K Minutes Watchtime',
            rate: 645.42,       // ₱637.42 + ₱8
            providerRate: 637.42,
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '1771',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 143,
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
        const minutes = service.name.match(/60k|600k/i)?.[0] || '';
        console.log(`✅ Added: ${minutes} ${version} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Watchtime services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const version = s.name.match(/S\d+/)?.[0] || '';
        const minutes = s.name.match(/60k|600k/i)?.[0] || '';
        console.log(`${minutes} ${version}: ₱${s.rate.toFixed(2)} | For Monetization`);
    });
    console.log('─────────────────────────────────────────────────');
    console.log('💰 These services help reach Facebook monetization requirements!');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
