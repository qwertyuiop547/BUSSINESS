/**
 * Add YouTube Live Stream Views Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-livestream-views-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Live Stream Views services...\n');

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

    // YouTube Live Stream Views services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers ( 15 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers for 15 minutes! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 18.14,        // ₱2.1363 + ₱16
            providerRate: 2.1363,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '932',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 632,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 30 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 30 minutes! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 20.21,        // ₱4.2131 + ₱16
            providerRate: 4.2131,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '3802',
            isDripFeed: false,
            isRefill: false,
            averageTime: '28 minutes',
            sortOrder: 633,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 60 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 1 hour! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 24.43,        // ₱8.4262 + ₱16
            providerRate: 8.4262,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '934',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour',
            sortOrder: 634,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 90 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 1.5 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 27.93,        // ₱11.9272 + ₱16
            providerRate: 11.9272,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '933',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 8 minutes',
            sortOrder: 635,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 120 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 2 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 32.14,        // ₱16.1403 + ₱16
            providerRate: 16.1403,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '935',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 636,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 180 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 3 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 39.85,        // ₱23.8543 + ₱16
            providerRate: 23.8543,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '936',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 14 minutes',
            sortOrder: 637,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 240 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 4 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 47.51,        // ₱31.5091 + ₱16
            providerRate: 31.5091,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '940',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 34 minutes',
            sortOrder: 638,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 360 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 6 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 61.93,        // ₱45.9284 + ₱16
            providerRate: 45.9284,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '937',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 639,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 720 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 12 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 84.83,        // ₱68.8333 + ₱16
            providerRate: 68.8333,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '938',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 640,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Viewers S3 ( 1440 Minutes, 100% Stable Concurrent )',
            description: 'Live Stream Viewers S3 for 24 hours! 100% stable concurrent viewers.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Views',
            rate: 153.67,       // ₱137.6666 + ₱16
            providerRate: 137.6666,
            minQuantity: 50,
            maxQuantity: 500000,
            providerServiceId: '939',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 641,
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
    console.log(`🎉 Tapos na! ${count} YouTube Live Stream Views services na-add!`);
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
