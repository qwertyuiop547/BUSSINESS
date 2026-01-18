/**
 * Add YouTube Subscriptions (Auto Likes Views) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-subscriptions-auto-likes-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Subscriptions (Auto Likes) services...\n');

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

    // YouTube Subscriptions (Auto Likes) services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Auto Shorts Likes R30 ( Instant, Real, 10K/Day, Automatic Likes on Future/Old Videos )',
            description: 'Auto Shorts Likes! Automatic likes on future/old videos. Real. 10K/Day. 30 days.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscriptions (Auto Likes Views)',
            rate: 39.15,        // ₱23.1469 + ₱16
            providerRate: 23.1469,
            minQuantity: 10,
            maxQuantity: 150000,
            providerServiceId: '4073',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 1 minute',
            sortOrder: 662,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Auto Video Likes R30 ( Instant, Automatic Likes on Future/Old Videos, Real, 20K/Day )',
            description: 'Auto Video Likes! Automatic likes on future/old videos. Real. 20K/Day. 30 days.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscriptions (Auto Likes Views)',
            rate: 39.15,        // ₱23.1469 + ₱16
            providerRate: 23.1469,
            minQuantity: 10,
            maxQuantity: 150000,
            providerServiceId: '4706',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 minute',
            sortOrder: 663,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Auto Video Likes R365 ( Instant, Automatic Likes on Future/Old Videos, Real, 50K/Day )',
            description: 'Auto Video Likes! Automatic likes on future/old videos. Real. 50K/Day. 365 days.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscriptions (Auto Likes Views)',
            rate: 40.57,        // ₱24.5714 + ₱16
            providerRate: 24.5714,
            minQuantity: 10,
            maxQuantity: 150000,
            providerServiceId: '4707',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 664,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Auto Shorts Likes R365 ( Instant, Real, 10K/Day, Automatic Likes on Future/Old Videos )',
            description: 'Auto Shorts Likes! Automatic likes on future/old videos. Real. 10K/Day. 365 days.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscriptions (Auto Likes Views)',
            rate: 44.11,        // ₱28.1145 + ₱16
            providerRate: 28.1145,
            minQuantity: 10,
            maxQuantity: 150000,
            providerServiceId: '4074',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 665,
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
    console.log(`🎉 Tapos na! ${count} YouTube Subscriptions (Auto Likes) services na-add!`);
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
