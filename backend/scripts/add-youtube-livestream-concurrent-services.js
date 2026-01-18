/**
 * Add YouTube Live Stream Views (100% Concurrent) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-livestream-concurrent-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Live Stream Views (100% Concurrent) services...\n');

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

    // YouTube Live Stream Views (100% Concurrent) services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 15 Minutes Live, Instant, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 15 min! Instant. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 16.10,        // ₱0.10 + ₱16
            providerRate: 0.10,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1820',
            isDripFeed: false,
            isRefill: false,
            averageTime: '22 minutes',
            sortOrder: 830,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 30 Minutes Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 30 min! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 16.20,        // ₱0.20 + ₱16
            providerRate: 0.20,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1127',
            isDripFeed: false,
            isRefill: false,
            averageTime: '36 minutes',
            sortOrder: 831,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 60 Minutes Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 60 min! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 16.40,        // ₱0.40 + ₱16
            providerRate: 0.40,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1128',
            isDripFeed: false,
            isRefill: false,
            averageTime: '22 hours 1 minute',
            sortOrder: 832,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 90 Minutes Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 90 min! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 16.60,        // ₱0.60 + ₱16
            providerRate: 0.60,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1129',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 21 minutes',
            sortOrder: 833,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 120 Minutes Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 120 min! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 16.80,        // ₱0.80 + ₱16
            providerRate: 0.80,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1130',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 11 minutes',
            sortOrder: 834,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 3 Hours Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 3 hours! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 17.20,        // ₱1.20 + ₱16
            providerRate: 1.20,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1131',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 12 minutes',
            sortOrder: 835,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 4 Hours Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 4 hours! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 17.80,        // ₱1.80 + ₱16
            providerRate: 1.80,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1807',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 836,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 6 Hours Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 6 hours! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 18.40,        // ₱2.40 + ₱16
            providerRate: 2.40,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1132',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 837,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 12 Hours Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 12 hours! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 20.80,        // ₱4.80 + ₱16
            providerRate: 4.80,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1133',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 838,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream S6 ( 24 Hours Live, 5 minute start, 100% 1000 order = 1000 viewer\'s live )',
            description: 'Live Stream 24 hours! 5 min start. 100% concurrent. 1000 order = 1000 viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views (100% Concurrent)',
            rate: 25.60,        // ₱9.60 + ₱16
            providerRate: 9.60,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '1134',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 839,
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
    console.log(`🎉 Tapos na! ${count} YouTube Live Stream (100% Concurrent) services na-add!`);
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
