/**
 * Add TikTok Followers Organic 100% Real Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-followers-organic-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎵 Adding TikTok Followers Organic 100% Real services...\n');

    // Get TikTok category
    let tiktokCat = await prisma.category.findUnique({ where: { slug: 'tiktok' } });

    if (!tiktokCat) {
        console.log('📁 Creating TikTok category...');
        tiktokCat = await prisma.category.create({
            data: {
                name: 'TikTok',
                slug: 'tiktok',
                description: 'TikTok services',
                sortOrder: 3,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    if (!provider) {
        console.log('🔗 Creating provider...');
        provider = await prisma.provider.create({
            data: {
                name: 'TikTok Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'TikTok services provider',
            },
        });
    }

    // TikTok Followers Organic 100% Real services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 300/Day)',
            description: '100% REAL Organic Followers! Global users from MissionTask. Very low drop. 300/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 107.36,       // ₱91.3642 + ₱16
            providerRate: 91.3642,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '4838',
            isDripFeed: false,
            isRefill: false,
            averageTime: '44 hours 34 minutes',
            sortOrder: 220,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 500/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 500/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 162.38,       // ₱146.3807 + ₱16
            providerRate: 146.3807,
            minQuantity: 100,
            maxQuantity: 100000,
            providerServiceId: '4839',
            isDripFeed: false,
            isRefill: false,
            averageTime: '8 hours 52 minutes',
            sortOrder: 221,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 1K/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 1K/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 200.68,       // ₱184.678 + ₱16
            providerRate: 184.678,
            minQuantity: 100,
            maxQuantity: 100000,
            providerServiceId: '4840',
            isDripFeed: false,
            isRefill: false,
            averageTime: '19 hours 56 minutes',
            sortOrder: 222,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 2K/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 2K/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 208.97,       // ₱192.9714 + ₱16
            providerRate: 192.9714,
            minQuantity: 100,
            maxQuantity: 200000,
            providerServiceId: '4841',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 223,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 3K/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 3K/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 217.27,       // ₱201.2727 + ₱16
            providerRate: 201.2727,
            minQuantity: 100,
            maxQuantity: 200000,
            providerServiceId: '4842',
            isDripFeed: false,
            isRefill: false,
            averageTime: '19 hours 7 minutes',
            sortOrder: 224,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 4K/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 4K/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 235.57,       // ₱219.568 + ₱16
            providerRate: 219.568,
            minQuantity: 100,
            maxQuantity: 300000,
            providerServiceId: '4843',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 225,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 5K/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 5K/Day speed.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 253.86,       // ₱237.8634 + ₱16
            providerRate: 237.8634,
            minQuantity: 100,
            maxQuantity: 300000,
            providerServiceId: '4844',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 226,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Organic (100% Real Global Users from MissionTask, Very Low Drop, NR, 10K/Day)',
            description: '100% REAL Organic Followers! Global users. Very low drop. 10K/Day speed. Fastest option!',
            platform: 'TIKTOK',
            type: 'TikTok Followers Organic 100% Real',
            rate: 272.16,       // ₱256.1587 + ₱16
            providerRate: 256.1587,
            minQuantity: 100,
            maxQuantity: 300000,
            providerServiceId: '4845',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 56 minutes',
            sortOrder: 227,
        },
    ];

    console.log('📝 Adding services to database...\n');

    for (const service of services) {
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
        const speed = service.name.match(/\d+K?\/Day/)?.[0] || '';
        console.log(`✅ Added: ${speed} - ₱${service.rate.toFixed(2)} (kita: ₱16.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng TikTok Followers Organic services ay na-add na!');
    console.log('\n📊 Summary:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const speed = s.name.match(/\d+K?\/Day/)?.[0] || '';
        console.log(`${speed}: ₱${s.rate.toFixed(2)} | Max: ${s.maxQuantity.toLocaleString()}`);
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
