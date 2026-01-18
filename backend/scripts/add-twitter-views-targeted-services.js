/**
 * Add Twitter Views Targeted Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-views-targeted-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Views Targeted services...\n');

    // Get Twitter / X category
    let twitterCat = await prisma.category.findFirst({ 
        where: { 
            OR: [
                { name: { contains: 'Twitter' } },
                { slug: { contains: 'twitter' } }
            ]
        } 
    });

    if (!twitterCat) {
        console.log('📁 Creating Twitter / X category...');
        twitterCat = await prisma.category.create({
            data: {
                name: 'Twitter / X',
                slug: 'twitter-x',
                description: 'Twitter / X services',
                sortOrder: 4,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Twitter Views Targeted services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views KOREA',
            description: 'Korean targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4568',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 430,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views JAPAN',
            description: 'Japanese targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4569',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 431,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views THAILAND',
            description: 'Thai targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4570',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 432,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views CHINA',
            description: 'Chinese targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4571',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 433,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views ARAB',
            description: 'Arab targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4572',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 434,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views TURKEY',
            description: 'Turkish targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4573',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 435,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views INDIA',
            description: 'Indian targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4574',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 436,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views RUSSIA',
            description: 'Russian targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4575',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 437,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views UKRAINE',
            description: 'Ukrainian targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4576',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 438,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views USA',
            description: 'USA targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4577',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 439,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views BRAZIL',
            description: 'Brazilian targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4578',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 440,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Tweet Views EGYPT',
            description: 'Egyptian targeted tweet views! Fast delivery.',
            platform: 'TWITTER',
            type: 'Twitter Views Targeted',
            rate: 16.30,        // ₱0.3027 + ₱16
            providerRate: 0.3027,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4579',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 441,
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
            console.log(`🔄 Updated: ID ${service.providerServiceId} - ${service.name.split(' ').pop()} - ₱${service.rate.toFixed(2)}`);
            count++;
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ Added: ID ${service.providerServiceId} - ${service.name.split(' ').pop()} - ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Twitter Views Targeted services na-add!`);
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
