/**
 * Add YouTube Likes Country Targeted Services (Part 3)
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-country-targeted-3-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Country Targeted (Part 3) services...\n');

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

    // YouTube Likes Country Targeted services Part 3 (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Turkey ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Turkey! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4050',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 772,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Thailand ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Thailand! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4051',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 773,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Tanzania ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Tanzania! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4052',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 774,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Tunisia ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Tunisia! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4053',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 775,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Tajikistan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Tajikistan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4054',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 776,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Togo ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Togo! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4055',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 777,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Turkmenistan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Turkmenistan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4056',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 778,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes United States USA ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from USA! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.22,        // ₱24.2169 + ₱16
            providerRate: 24.2169,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4058',
            isDripFeed: false,
            isRefill: true,
            averageTime: '5 minutes',
            sortOrder: 779,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes United Kingdom UK ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from UK! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4059',
            isDripFeed: false,
            isRefill: true,
            averageTime: '5 minutes',
            sortOrder: 780,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Uganda ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Uganda! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4060',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 781,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Ukraine ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Ukraine! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4061',
            isDripFeed: false,
            isRefill: true,
            averageTime: '48 minutes',
            sortOrder: 782,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Uzbekistan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Uzbekistan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4062',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 783,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes United Arab Emirates UAE ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from UAE! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4063',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 784,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Uruguay ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Uruguay! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4064',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 785,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Country Targeted (Part 3) services na-add!`);
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
