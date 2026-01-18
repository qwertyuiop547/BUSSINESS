/**
 * Add Twitter Live Broadcast Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-live-broadcast-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Live Broadcast services...\n');

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

    // Twitter Live Broadcast services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 5 Min',
            description: 'Live Broadcast viewers for 5 minutes! Quick boost.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 92.23,        // ₱76.2345 + ₱16
            providerRate: 76.2345,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4786',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 506,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 15 Min',
            description: 'Live Broadcast viewers for 15 minutes! Good duration.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 236.22,       // ₱220.2164 + ₱16
            providerRate: 220.2164,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4787',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 507,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 30 Min',
            description: 'Live Broadcast viewers for 30 minutes! Standard duration.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 439.49,       // ₱423.4943 + ₱16
            providerRate: 423.4943,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4788',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 508,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 45 Min',
            description: 'Live Broadcast viewers for 45 minutes! Extended duration.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 642.77,       // ₱626.7723 + ₱16
            providerRate: 626.7723,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4789',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 509,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 60 Min',
            description: 'Live Broadcast viewers for 1 hour! Full hour coverage.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 829.11,       // ₱813.106 + ₱16
            providerRate: 813.106,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4790',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 510,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 90 Min',
            description: 'Live Broadcast viewers for 1.5 hours! Long coverage.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 1201.78,      // ₱1185.7793 + ₱16
            providerRate: 1185.7793,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4791',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 511,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Live Broadcast 120 Min',
            description: 'Live Broadcast viewers for 2 hours! Maximum coverage.',
            platform: 'TWITTER',
            type: 'Twitter Live Broadcast',
            rate: 1608.34,      // ₱1592.3353 + ₱16
            providerRate: 1592.3353,
            minQuantity: 100,
            maxQuantity: 9999,
            providerServiceId: '4792',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 512,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        // Extract duration
        const duration = service.name.match(/\d+/)?.[0] || '';

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
            console.log(`🔄 Updated: ID ${service.providerServiceId} - ${duration} Min - ₱${service.rate.toFixed(2)}`);
            count++;
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ Added: ID ${service.providerServiceId} - ${duration} Min - ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Twitter Live Broadcast services na-add!`);
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
