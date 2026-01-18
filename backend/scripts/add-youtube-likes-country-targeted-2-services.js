/**
 * Add YouTube Likes Country Targeted Services (Part 2)
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-country-targeted-2-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Country Targeted (Part 2) services...\n');

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

    // YouTube Likes Country Targeted services Part 2 (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Oman ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Oman! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4019',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 755,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Pakistan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Pakistan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4020',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 756,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Philippines ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Philippines! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4021',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 757,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Poland ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Poland! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4022',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 758,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Peru ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Peru! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4023',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 759,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Portugal ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Portugal! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4024',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 760,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Papua New Guinea ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Papua New Guinea! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4025',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 761,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Paraguay ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Paraguay! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4026',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 762,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Panama ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Panama! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4027',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 19 minutes',
            sortOrder: 763,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Qatar ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Qatar! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4028',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 764,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Russia ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Russia! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4029',
            isDripFeed: false,
            isRefill: true,
            averageTime: '48 minutes',
            sortOrder: 765,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Romania ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Romania! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4030',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 766,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Rwanda ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Rwanda! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4031',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 767,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes South Africa ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from South Africa! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4032',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 768,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes South Korea ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from South Korea! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4033',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 769,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Spain ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Spain! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4034',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 770,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes Sudan ( Instant, Real, Superfast 50k/Day, ZeroDrop, Refill Button, Lifetime Refill )',
            description: 'YouTube Likes from Sudan! Real. 50K/Day. ZeroDrop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Country Targeted',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4035',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 771,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Country Targeted (Part 2) services na-add!`);
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
