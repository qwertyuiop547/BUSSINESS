/**
 * Add Facebook Page Followers Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-page-followers-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👥 Adding Facebook Page Followers services...\n');

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
                name: 'FB Page Followers Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Page Followers provider',
            },
        });
    }

    // Facebook Page Followers services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Followers S6 (All type link works, 15 Days Refill, 20k per day, VN)',
            description: 'Page Followers na gumagana sa lahat ng link type. 20k/day speed. 15 Days Refill. VN accounts.',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 20.74,        // ₱12.7362 + ₱8
            providerRate: 12.7362,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '2703',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 6 minutes',
            sortOrder: 100,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Followers S7 (All type link works, Instant, Slow, 30 days refill, VN)',
            description: 'Page Followers na gumagana sa lahat ng link type. Instant start, slow delivery. 30 Days Refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 21.46,        // ₱13.4598 + ₱8
            providerRate: 13.4598,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '2709',
            isDripFeed: false,
            isRefill: true,
            averageTime: '15 minutes',
            sortOrder: 101,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Followers S4 (All type link works, Real, Fast, 30 days guaranteed, Worldwide)',
            description: 'REAL followers! All type link works. Fast delivery. 30 days guarantee. Worldwide accounts!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 19.82,        // ₱11.8231 + ₱8
            providerRate: 11.8231,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '1558',
            isDripFeed: false,
            isRefill: true,
            averageTime: '18 hours 50 minutes',
            sortOrder: 102,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Followers S9 (All type link works, Ultrafast, 300k, R30, Worldwide)',
            description: 'ULTRAFAST 300k capacity! All type link works. 30 days refill. Worldwide. Best for big orders!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 27.95,        // ₱19.9462 + ₱8
            providerRate: 19.9462,
            minQuantity: 30,
            maxQuantity: 1500000,
            providerServiceId: '1107',
            isDripFeed: false,
            isRefill: true,
            averageTime: '37 hours 22 minutes',
            sortOrder: 103,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile or Page Followers S12 (All type link works, Fast 20k per day, 30 days guaranteed, WW)',
            description: 'Profile or Page Followers! 20k/day delivery. 30 days guarantee. Worldwide. Cheapest option!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 14.25,        // ₱6.2488 + ₱8
            providerRate: 6.2488,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '598',
            isDripFeed: false,
            isRefill: true,
            averageTime: '16 hours 28 minutes',
            sortOrder: 104,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Followers S2 (Instant 6 Hours, Real and Active, Lifetime manual refill, Max 500k)',
            description: 'Real & Active followers! Instant 6 hours start. LIFETIME manual refill! Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 41.20,        // ₱33.2041 + ₱8
            providerRate: 33.2041,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '291',
            isDripFeed: false,
            isRefill: true,
            averageTime: '25 minutes',
            sortOrder: 105,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile Type Page/Classic Page Followers (1k/Day, 30 days manual refill, Max 100K)',
            description: 'Para sa Profile Type o Classic Page! 1k/day delivery. 30 days manual refill. Max 100K!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 67.50,        // ₱59.5008 + ₱8
            providerRate: 59.5008,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '1277',
            isDripFeed: false,
            isRefill: true,
            averageTime: '7 minutes',
            sortOrder: 106,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Followers S3 (All type link works, Ultrafast 20k per day, 30 Days refill button)',
            description: 'Ultrafast 20k/day! All type link works. 30 days refill button. Reliable and fast!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 75.59,        // ₱67.5941 + ₱8
            providerRate: 67.5941,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1075',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 107,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Followers All Type Link S4 (Instant, Ultrafast 100k per day, 30 Days refill)',
            description: 'ULTRAFAST 100k per day! Instant start. All Type Link. 30 days refill. Massive capacity!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Followers',
            rate: 88.88,        // ₱80.8757 + ₱8
            providerRate: 80.8757,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1905',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 108,
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
        const version = service.name.match(/S\d+|S4|S6|S7|S9|S12|S2|S3/)?.[0] || 'Standard';
        console.log(`✅ Added: ${version} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Page Followers services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const version = s.name.match(/S\d+|S4|S6|S7|S9|S12|S2|S3/)?.[0] || 'Standard';
        console.log(`${version}: ₱${s.rate.toFixed(2)} | Min: ${s.minQuantity} | Max: ${s.maxQuantity.toLocaleString()}`);
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
