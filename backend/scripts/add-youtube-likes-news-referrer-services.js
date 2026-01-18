/**
 * Add YouTube Likes News Referrer Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-news-referrer-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes News Referrer services...\n');

    // Get YouTube category
    let youtubeCat = await prisma.category.findFirst({ 
        where: { 
            OR: [
                { name: { contains: 'YouTube' } },
                { slug: { contains: 'youtube' } }
            ]
        } 
    });

    if (!youtubeCat) {
        console.log('📁 Creating YouTube category...');
        youtubeCat = await prisma.category.create({
            data: {
                name: 'YouTube',
                slug: 'youtube',
                description: 'YouTube services',
                sortOrder: 5,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // YouTube Likes News Referrer services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | News.Google.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from News.Google.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4661',
            isDripFeed: false,
            isRefill: true,
            averageTime: '6 minutes',
            sortOrder: 725,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | News.Yahoo.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from News.Yahoo.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4662',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 33 minutes',
            sortOrder: 726,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | News.Naver.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from News.Naver.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4663',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 727,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Edition.Cnn.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Edition.Cnn.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4664',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 728,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Nytimes.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Nytimes.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4665',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 729,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Bbc.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Bbc.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4666',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 hours 32 minutes',
            sortOrder: 730,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Reuters.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Reuters.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4667',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 731,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Foxnews.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Foxnews.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4668',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 732,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Nbcnews.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Nbcnews.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4669',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 733,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Theguardian.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Theguardian.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4670',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 734,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Washingtonpost.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Washingtonpost.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4671',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 735,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Dailymail.co.uk | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Dailymail.co.uk referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4672',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 736,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Aajtak.in | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Aajtak.in referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes News Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4673',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 737,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: {
                    name: service.name,
                    description: service.description,
                    rate: service.rate,
                    providerRate: service.providerRate,
                    minQuantity: service.minQuantity,
                    maxQuantity: service.maxQuantity,
                    averageTime: service.averageTime,
                    isRefill: service.isRefill,
                    type: service.type,
                }
            });
            console.log(`🔄 Updated: ID ${service.providerServiceId} - ₱${service.rate.toFixed(2)}`);
            count++;
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ Added: ID ${service.providerServiceId} - ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} YouTube Likes News Referrer services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
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
