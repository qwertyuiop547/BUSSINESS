/**
 * Add YouTube Likes Shopping Referrer Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-shopping-referrer-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Shopping Referrer services...\n');

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

    // YouTube Likes Shopping Referrer services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Amazon.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Amazon.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4674',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 709,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Ebay.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Ebay.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4675',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 710,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Aliexpress.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Aliexpress.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4676',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 711,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Banggood.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Banggood.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4677',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 712,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Walmart.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Walmart.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4678',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 713,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Etsy.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Etsy.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4679',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 714,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Shopify.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Shopify.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4680',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 715,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Bestbuy.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Bestbuy.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4681',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 716,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Target.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Target.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4682',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 717,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Wayfair.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Wayfair.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4683',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 10 minutes',
            sortOrder: 718,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Newegg.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Newegg.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4684',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 719,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Zappos.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Zappos.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4685',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 720,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Fiverr.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Fiverr.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4686',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 721,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Canva.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Canva.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4687',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 722,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Udemy.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Udemy.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4688',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 723,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Stockx.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Stockx.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Shopping Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4689',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 724,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Shopping Referrer services na-add!`);
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
