/**
 * Add Facebook Page Likes Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-page-likes-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👍 Adding Facebook Page Likes services...\n');

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
                name: 'FB Page Likes Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Page Likes provider',
            },
        });
    }

    // Facebook Page Likes services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes & Follow S3 (1 hour, Real, 5k/D, No refill)',
            description: 'Real Page Likes & Follow! 1 hour start. 5k/day delivery. Walang refill.',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 25.79,        // ₱17.788 + ₱8
            providerRate: 17.788,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '591',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 hours 28 minutes',
            sortOrder: 110,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Fanpage Likes + Followers S2 (Instant, Fast, Real, 30 Day Refill, Max 500k)',
            description: 'Fanpage Likes + Followers! Instant start, fast delivery. Real accounts. 30 Day Refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 26.50,        // ₱18.4965 + ₱8
            providerRate: 18.4965,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '192',
            isDripFeed: false,
            isRefill: true,
            averageTime: '28 hours 57 minutes',
            sortOrder: 111,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ Facebook Page Likes + Followers S43 (Instant, 10K/Day, 30 Days refill)',
            description: '⭐ RECOMMENDED! Instant start. 10K/Day delivery. 30 Days refill. Very reliable!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 32.19,        // ₱24.1916 + ₱8
            providerRate: 24.1916,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '1906',
            isDripFeed: false,
            isRefill: true,
            averageTime: '12 minutes',
            sortOrder: 112,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ Facebook Page Likes S7 (0-3 hours, Real HQ, 25K per day, 30 Days Refill)',
            description: '⭐ RECOMMENDED! Real HQ accounts. 25K/day delivery. 30 Days Refill. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 40.02,        // ₱32.0183 + ₱8
            providerRate: 32.0183,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '035',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 113,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ Facebook Page Likes S41 (Instant, HQ Real Accounts, 30K/Day, Likes + followers, 30 Days refill)',
            description: '⭐ RECOMMENDED! HQ Real Accounts. 30K/Day delivery. Likes + Followers combo. 30 Days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 39.31,        // ₱31.3068 + ₱8
            providerRate: 31.3068,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '1072',
            isDripFeed: false,
            isRefill: true,
            averageTime: '20 minutes',
            sortOrder: 114,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: '⭐⭐⭐ Facebook Page Likes + Followers S42 (Instant, 10K/Day, Non drop R30)',
            description: '⭐ RECOMMENDED! Non-drop guarantee! 10K/Day. 30 Days refill. Very stable!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 83.14,        // ₱75.1382 + ₱8
            providerRate: 75.1382,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '1273',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 26 minutes',
            sortOrder: 115,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes+ Followers S1 (Slow, 30 days refill, non drop)',
            description: 'Slow pero stable! Non-drop guarantee. 30 days refill. Best for long-term growth!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes',
            rate: 93.38,        // ₱85.382 + ₱8
            providerRate: 85.382,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '351',
            isDripFeed: false,
            isRefill: true,
            averageTime: '177 hours 22 minutes',
            sortOrder: 116,
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
        const version = service.name.match(/S\d+/)?.[0] || 'Standard';
        const isRecommended = service.name.includes('⭐') ? '⭐ ' : '';
        console.log(`✅ Added: ${isRecommended}${version} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Page Likes services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const version = s.name.match(/S\d+/)?.[0] || 'Standard';
        const isRecommended = s.name.includes('⭐') ? '⭐ ' : '';
        console.log(`${isRecommended}${version}: ₱${s.rate.toFixed(2)} | Min: ${s.minQuantity} | Max: ${s.maxQuantity.toLocaleString()}`);
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
