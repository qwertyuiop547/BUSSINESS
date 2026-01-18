/**
 * Add Facebook Reel Views Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-reel-views-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎬 Adding Facebook Reel Views services...\n');

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
                name: 'FB Reel Views Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Reel Views provider',
            },
        });
    }

    // Facebook Reel Views services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reel Views S6 (Instant, Ultrafast 500k/Day, Non drop 30 days guaranteed)',
            description: 'ULTRAFAST 500k/Day! Non-drop 30 days guarantee. Best for viral reels!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 9.78,         // ₱1.7788 + ₱8
            providerRate: 1.7788,
            minQuantity: 100,
            maxQuantity: 500000000,
            providerServiceId: '1655',
            isDripFeed: false,
            isRefill: true,
            averageTime: '35 hours 25 minutes',
            sortOrder: 170,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reels Views S8 (Instant, 5k/Day)',
            description: 'Steady 5k/Day delivery. Instant start. Good for organic growth!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 13.69,        // ₱5.6922 + ₱8
            providerRate: 5.6922,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '1678',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 16 minutes',
            sortOrder: 171,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reel Views S6 (Instant, Slow 5k/Day, Non drop 30 days guaranteed)',
            description: 'Slow pero stable! 5k/Day. Non-drop 30 days guarantee. Safe for algorithm!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 14.69,        // ₱6.6867 + ₱8
            providerRate: 6.6867,
            minQuantity: 500,
            maxQuantity: 10000000,
            providerServiceId: '1281',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 172,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reels Views S5 (Instant, 50k/Day)',
            description: 'Fast 50k/Day delivery. Instant start. Great for boosting reels!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 16.82,        // ₱8.8228 + ₱8
            providerRate: 8.8228,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1650',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 173,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reel Views S6 (Instant, 100k/Day, Lifetime guaranteed)',
            description: 'Fast 100k/Day! LIFETIME GUARANTEE! Reliable and stable!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 16.82,        // ₱8.8228 + ₱8
            providerRate: 8.8228,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1654',
            isDripFeed: false,
            isRefill: true,
            averageTime: '56 minutes',
            sortOrder: 174,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reels Views S5 (Instant, 10k/Day)',
            description: 'Moderate 10k/Day speed. Instant start. Natural-looking growth!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 16.89,        // ₱8.894 + ₱8
            providerRate: 8.894,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1652',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 175,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reels Views S5 (Instant, 100k/Day)',
            description: 'Fast 100k/Day! Instant start. Perfect for viral content!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 17.96,        // ₱9.9613 + ₱8
            providerRate: 9.9613,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1653',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 176,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Reels Views S7 (Instant, Cheapest, 100k/Day, No drop)',
            description: 'CHEAPEST 100k/Day! No drop guarantee. Best value for money!',
            platform: 'FACEBOOK',
            type: 'Facebook Reel Views',
            rate: 19.78,        // ₱11.7838 + ₱8
            providerRate: 11.7838,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '1335',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 177,
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

    console.log('\n🎉 Tapos na! Lahat ng Facebook Reel Views services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const version = s.name.match(/S\d+/)?.[0] || '';
        const speed = s.name.match(/\d+k\/Day/i)?.[0] || '';
        console.log(`${version} (${speed}): ₱${s.rate.toFixed(2)} | Max: ${s.maxQuantity.toLocaleString()}`);
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
