/**
 * Add YouTube Likes Search Engine Referrer Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-search-engine-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Search Engine Referrer services...\n');

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

    // YouTube Likes Search Engine Referrer services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Google.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Google.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4650',
            isDripFeed: false,
            isRefill: true,
            averageTime: '5 hours 21 minutes',
            sortOrder: 698,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Bing.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Bing.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4651',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 minutes',
            sortOrder: 699,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Baidu.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Baidu.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4652',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 minutes',
            sortOrder: 700,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Yahoo.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Yahoo.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4653',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 701,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Yandex.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Yandex.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4654',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 702,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Duckduckgo.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Duckduckgo.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4655',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 703,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Ask.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Ask.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4656',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 minutes',
            sortOrder: 704,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Aol.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Aol.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4657',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 705,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Naver.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Naver.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4658',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 706,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Ecosia.org | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Ecosia.org referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4659',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 707,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Archive.org | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Archive.org referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Search Engine Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4660',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 708,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Search Engine Referrer services na-add!`);
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
