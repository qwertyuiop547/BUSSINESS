/**
 * Add YouTube Likes Forum Referrer Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-forum-referrer-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Forum Referrer services...\n');

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

    // YouTube Likes Forum Referrer services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Wikipedia.org | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Wikipedia.org referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4611',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 818,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Fandom.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Fandom.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4612',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 819,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Github.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Github.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4613',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 820,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Quora.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Quora.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4614',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 821,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Blogger.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Blogger.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4615',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 822,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Dzen.ru | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Dzen.ru referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4616',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 823,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | 4chan.org | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from 4chan.org referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4617',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 824,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Somethingawful.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Somethingawful.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4618',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 825,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Gamefaqs.Gamespot.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Gamefaqs.Gamespot.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4619',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 826,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Neogaf.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Neogaf.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4620',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 827,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Flyertalk.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Flyertalk.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4621',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 828,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Webmasterworld.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Webmasterworld.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Forum Referrer',
            rate: 16.41,        // ₱0.41 + ₱16
            providerRate: 0.41,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4622',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 829,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Forum Referrer services na-add!`);
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
