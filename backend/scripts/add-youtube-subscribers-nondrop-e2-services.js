/**
 * Add YouTube Subscribers 100% Non Drop E2 Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-subscribers-nondrop-e2-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Subscribers 100% Non Drop E2 services...\n');

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

    // YouTube Subscribers 100% Non Drop E2 services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Subscribers E2 ( 100% Real Accounts, Non Drop, 30 Days Refill, Start in 1 Hour, 50-100/Day )',
            description: 'YouTube Subscribers E2! 100% Real Accounts. Non Drop. 30 Days Refill. Start 1h. 50-100/Day.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscribers 100% Non Drop E2',
            rate: 29.50,        // ₱13.50 + ₱16
            providerRate: 13.50,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4469',
            isDripFeed: false,
            isRefill: true,
            averageTime: '20 hours 30 minutes',
            sortOrder: 813,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Subscribers E2 ( 100% Real Accounts, Non Drop, 90 Days Refill, Start in 1 Hour, 50-100/Day )',
            description: 'YouTube Subscribers E2! 100% Real Accounts. Non Drop. 90 Days Refill. Start 1h. 50-100/Day.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscribers 100% Non Drop E2',
            rate: 30.00,        // ₱14.00 + ₱16
            providerRate: 14.00,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4470',
            isDripFeed: false,
            isRefill: true,
            averageTime: '41 hours 25 minutes',
            sortOrder: 814,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Subscribers E2 ( 100% Real Accounts, Non Drop, 365 Days Refill, Start in 1 Hour, 50-100/Day )',
            description: 'YouTube Subscribers E2! 100% Real Accounts. Non Drop. 365 Days Refill. Start 1h. 50-100/Day.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscribers 100% Non Drop E2',
            rate: 30.50,        // ₱14.50 + ₱16
            providerRate: 14.50,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4471',
            isDripFeed: false,
            isRefill: true,
            averageTime: '86 hours 27 minutes',
            sortOrder: 815,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Subscribers E2 ( 100% Real Accounts, Non Drop, Lifetime Refill, Start in 1 Hour, 50-100/Day )',
            description: 'YouTube Subscribers E2! 100% Real Accounts. Non Drop. Lifetime Refill. Start 1h. 50-100/Day.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscribers 100% Non Drop E2',
            rate: 31.00,        // ₱15.00 + ₱16
            providerRate: 15.00,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4472',
            isDripFeed: false,
            isRefill: true,
            averageTime: '32 hours 6 minutes',
            sortOrder: 816,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Subscribers E2 ( 100% Real Accounts, Non Drop, Lifetime Refill, Instant, 10K/Day )',
            description: 'YouTube Subscribers E2! 100% Real Accounts. Non Drop. Lifetime Refill. Instant. 10K/Day.',
            platform: 'YOUTUBE',
            type: 'YouTube Subscribers 100% Non Drop E2',
            rate: 39.80,        // ₱23.80 + ₱16
            providerRate: 23.80,
            minQuantity: 100,
            maxQuantity: 9000000,
            providerServiceId: '4958',
            isDripFeed: false,
            isRefill: true,
            averageTime: '38 hours 40 minutes',
            sortOrder: 817,
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
    console.log(`🎉 Tapos na! ${count} YouTube Subscribers 100% Non Drop E2 services na-add!`);
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
