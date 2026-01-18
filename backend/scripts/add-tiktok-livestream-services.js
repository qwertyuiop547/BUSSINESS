/**
 * Add TikTok Live Stream Views Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-livestream-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎵 Adding TikTok Live Stream Views services...\n');

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

    // TikTok Live Stream Views services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 15 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 15 minutes! Starts within 2 minutes. Fast and reliable!',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 39.89,        // ₱23.8919 + ₱16
            providerRate: 23.8919,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4887',
            isDripFeed: false,
            isRefill: false,
            averageTime: '23 minutes',
            sortOrder: 210,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 30 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 30 minutes! Starts within 2 minutes.',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 60.35,        // ₱44.3452 + ₱16
            providerRate: 44.3452,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4888',
            isDripFeed: false,
            isRefill: false,
            averageTime: '33 minutes',
            sortOrder: 211,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 60 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 1 hour! Starts within 2 minutes. High capacity!',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 128.52,       // ₱112.523 + ₱16
            providerRate: 112.523,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '4889',
            isDripFeed: false,
            isRefill: false,
            averageTime: '45 minutes',
            sortOrder: 212,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 90 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 1.5 hours! Starts within 2 minutes.',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 142.16,       // ₱126.1586 + ₱16
            providerRate: 126.1586,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4890',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 213,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 120 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 2 hours! Starts within 2 minutes.',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 183.07,       // ₱167.0652 + ₱16
            providerRate: 167.0652,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4891',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 214,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 180 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 3 hours! Starts within 2 minutes.',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 264.88,       // ₱248.8785 + ₱16
            providerRate: 248.8785,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4892',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 215,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 240 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 4 hours! Starts within 2 minutes.',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 346.69,       // ₱330.6918 + ₱16
            providerRate: 330.6918,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4893',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 216,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Live Stream Views 360 Minutes (Start within 2 minutes)',
            description: 'Live Stream Views for 6 hours! Starts within 2 minutes. Best for long streams!',
            platform: 'TIKTOK',
            type: 'TikTok Live Stream Views',
            rate: 513.10,       // ₱497.0977 + ₱16
            providerRate: 497.0977,
            minQuantity: 50,
            maxQuantity: 10000,
            providerServiceId: '4894',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 217,
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
        const duration = service.name.match(/\d+ Minutes/)?.[0] || '';
        console.log(`✅ Added: ${duration} - ₱${service.rate.toFixed(2)} (kita: ₱16.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng TikTok Live Stream Views services ay na-add na!');
    console.log('\n📊 Summary:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const duration = s.name.match(/\d+ Minutes/)?.[0] || '';
        console.log(`${duration}: ₱${s.rate.toFixed(2)} (kita: ₱16.00)`);
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
