/**
 * Add Facebook Services Philippines
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-philippines-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🇵🇭 Adding Facebook Services Philippines...\n');

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
                name: 'FB Philippines Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Philippines provider',
            },
        });
    }

    // Facebook Services Philippines (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Like 👍 [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'Like 👍 reaction mula sa REAL Pinoy accounts! 500-1K/Day delivery. 0-24 hours start.',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 196.18,       // ₱188.1805 + ₱8
            providerRate: 188.1805,
            minQuantity: 100,
            maxQuantity: 5000,
            providerServiceId: '2790',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 120,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction HaHa 😂 [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'HaHa 😂 reaction mula sa REAL Pinoy accounts! 500-1K/Day delivery. 0-24 hours start.',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 196.16,       // ₱188.1605 + ₱8
            providerRate: 188.1605,
            minQuantity: 100,
            maxQuantity: 5000,
            providerServiceId: '2793',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 121,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Share [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'Post Share mula sa REAL Pinoy accounts! Para sa maximum reach sa Pilipinas!',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 213.49,       // ₱205.4859 + ₱8
            providerRate: 205.4859,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '2797',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 122,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Followers [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'Page Followers mula sa REAL Pinoy accounts! Best for PH-based businesses!',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 245.17,       // ₱237.1721 + ₱8
            providerRate: 237.1721,
            minQuantity: 100,
            maxQuantity: 5000,
            providerServiceId: '2799',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 123,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile Followers [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'Profile Followers mula sa REAL Pinoy accounts! Para sa personal profiles!',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 245.17,       // ₱237.1721 + ₱8
            providerRate: 237.1721,
            minQuantity: 100,
            maxQuantity: 5000,
            providerServiceId: '2804',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 124,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Group Members [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'Group Members mula sa REAL Pinoy accounts! Para sa FB groups targeting Pinoys!',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 238.48,       // ₱230.4825 + ₱8
            providerRate: 230.4825,
            minQuantity: 100,
            maxQuantity: 5000,
            providerServiceId: '2800',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 25 minutes',
            sortOrder: 125,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Poll Votes [🇵🇭Philippines🇵🇭] [500-1K/D] [0-24H]',
            description: 'Poll Votes mula sa REAL Pinoy accounts! Para sa FB polls at surveys!',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 1626.69,      // ₱1618.6933 + ₱8
            providerRate: 1618.6933,
            minQuantity: 20,
            maxQuantity: 5000,
            providerServiceId: '2801',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 126,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Reviews [🇵🇭Philippines🇵🇭] (Yes-Recommendations) [With Custom Comments] [500-1K] [0-12H]',
            description: '⭐ PREMIUM! Page Reviews with YES Recommendations + Custom Comments! Real Pinoy reviewers!',
            platform: 'FACEBOOK',
            type: 'Facebook Services Philippines',
            rate: 3656.71,      // ₱3648.7081 + ₱8
            providerRate: 3648.7081,
            minQuantity: 10,
            maxQuantity: 100,
            providerServiceId: '2803',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 127,
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
        // Extract service type
        const serviceType = service.name.match(/Like|HaHa|Share|Page Followers|Profile Followers|Group Members|Poll Votes|Page Reviews/)?.[0] || 'Service';
        console.log(`✅ Added: 🇵🇭 ${serviceType} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Services Philippines ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const serviceType = s.name.match(/Like|HaHa|Share|Page Followers|Profile Followers|Group Members|Poll Votes|Page Reviews/)?.[0] || 'Service';
        console.log(`🇵🇭 ${serviceType}: ₱${s.rate.toFixed(2)} | Min: ${s.minQuantity} | Max: ${s.maxQuantity.toLocaleString()}`);
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
