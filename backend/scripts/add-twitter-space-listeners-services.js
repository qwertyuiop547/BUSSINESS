/**
 * Add Twitter Space Listeners S2 Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-space-listeners-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Space Listeners S2 services...\n');

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

    // Twitter Space Listeners S2 services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 5 Min',
            description: 'Space Listeners for 5 minutes! Great for quick spaces.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 21.19,        // ₱5.1931 + ₱16
            providerRate: 5.1931,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1821',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 490,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 15 Min',
            description: 'Space Listeners for 15 minutes! Good duration.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 30.84,        // ₱14.8374 + ₱16
            providerRate: 14.8374,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1822',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 491,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 30 Min',
            description: 'Space Listeners for 30 minutes! Standard duration.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 45.67,        // ₱29.6748 + ₱16
            providerRate: 29.6748,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1823',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 492,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 45 Min',
            description: 'Space Listeners for 45 minutes! Extended duration.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 72.98,        // ₱56.9756 + ₱16
            providerRate: 56.9756,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1824',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 493,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 60 Min',
            description: 'Space Listeners for 1 hour! Full hour coverage.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 75.35,        // ₱59.3495 + ₱16
            providerRate: 59.3495,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1825',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 494,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 90 Min',
            description: 'Space Listeners for 1.5 hours! Long space coverage.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 105.02,       // ₱89.0243 + ₱16
            providerRate: 89.0243,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1826',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 495,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 120 Min',
            description: 'Space Listeners for 2 hours! Extended space coverage.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 122.83,       // ₱106.8291 + ₱16
            providerRate: 106.8291,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '1827',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 496,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 180 Min',
            description: 'Space Listeners for 3 hours! Maximum coverage.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 494.36,       // ₱478.357 + ₱16
            providerRate: 478.357,
            minQuantity: 50,
            maxQuantity: 100000,
            providerServiceId: '1828',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 497,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Space Listeners 240 Min',
            description: 'Space Listeners for 4 hours! Ultimate coverage.',
            platform: 'TWITTER',
            type: 'Twitter Space Listeners S2',
            rate: 678.34,       // ₱662.3405 + ₱16
            providerRate: 662.3405,
            minQuantity: 50,
            maxQuantity: 100000,
            providerServiceId: '1829',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 498,
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
    console.log(`🎉 Tapos na! ${count} Twitter Space Listeners S2 services na-add!`);
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
