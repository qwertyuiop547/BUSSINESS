/**
 * Add YouTube Likes Country Targeted Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-country-targeted-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Country Targeted services...\n');

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

    // YouTube Likes Country Targeted services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Argentina ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Argentina! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3916',
            isDripFeed: false,
            isRefill: true,
            averageTime: '5 minutes',
            sortOrder: 738,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Algeria ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Algeria! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3917',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 minutes',
            sortOrder: 739,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Afghanistan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Afghanistan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3918',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 740,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Angola ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Angola! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3919',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 741,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Australia ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Australia! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3920',
            isDripFeed: false,
            isRefill: true,
            averageTime: '11 minutes',
            sortOrder: 742,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Azerbaijan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Azerbaijan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3921',
            isDripFeed: false,
            isRefill: true,
            averageTime: '6 minutes',
            sortOrder: 743,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Austria ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Austria! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3922',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 744,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Armenia ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Armenia! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3923',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 minutes',
            sortOrder: 745,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Albania ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Albania! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3924',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 minutes',
            sortOrder: 746,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Brazil ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Brazil! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.22,        // ₱24.2169 + ₱16
            providerRate: 24.2169,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3925',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 747,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Bangladesh ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Bangladesh! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3926',
            isDripFeed: false,
            isRefill: true,
            averageTime: '16 hours 22 minutes',
            sortOrder: 748,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Burkina Faso ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Burkina Faso! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3927',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 749,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Burundi ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Burundi! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3928',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 750,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Benin ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Benin! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3929',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 751,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Bolivia ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Bolivia! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3930',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 752,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Belgium ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Belgium! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3931',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 753,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Belarus ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Belarus! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '3932',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 754,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Country Targeted services na-add!`);
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
