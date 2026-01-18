/**
 * Add YouTube Views (High Retention) (High Drop) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-views-high-retention-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Views (High Retention) (High Drop) services...\n');

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

    // YouTube Views (High Retention) services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 10 Sec, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 10 Sec Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 16.89,        // ₱0.89 + ₱16
            providerRate: 0.89,
            minQuantity: 100,
            maxQuantity: 2000000,
            providerServiceId: '4408',
            isDripFeed: false,
            isRefill: true,
            averageTime: '57 hours 12 minutes',
            sortOrder: 840,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 30 Sec, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 30 Sec Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 17.07,        // ₱1.07 + ₱16
            providerRate: 1.07,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4409',
            isDripFeed: false,
            isRefill: true,
            averageTime: '99 hours 29 minutes',
            sortOrder: 841,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 60 Sec, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 60 Sec Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 17.19,        // ₱1.188 + ₱16
            providerRate: 1.188,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4410',
            isDripFeed: false,
            isRefill: true,
            averageTime: '168 hours 10 minutes',
            sortOrder: 842,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 120 Sec, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 120 Sec Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 17.55,        // ₱1.548 + ₱16
            providerRate: 1.548,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4411',
            isDripFeed: false,
            isRefill: true,
            averageTime: '79 hours 54 minutes',
            sortOrder: 843,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 180 Sec, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 180 Sec Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 18.64,        // ₱2.64 + ₱16
            providerRate: 2.64,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4412',
            isDripFeed: false,
            isRefill: true,
            averageTime: '123 hours 7 minutes',
            sortOrder: 844,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 300 Sec, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 300 Sec (5 min) Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 21.28,        // ₱5.28 + ₱16
            providerRate: 5.28,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4413',
            isDripFeed: false,
            isRefill: true,
            averageTime: '327 hours 20 minutes',
            sortOrder: 845,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 10 Min, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 10 Min Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 28.00,        // ₱12.00 + ₱16
            providerRate: 12.00,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4415',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 846,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 20 Min, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 20 Min Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 31.63,        // ₱15.625 + ₱16
            providerRate: 15.625,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4417',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 847,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Views Real ( High Retention 30 Min, 5K/Day, Lifetime Guaranteed )',
            description: 'High Retention 30 Min Views! Real. 5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Views (High Retention) (High Drop)',
            rate: 32.20,        // ₱16.20 + ₱16
            providerRate: 16.20,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4418',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 848,
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
    console.log(`🎉 Tapos na! ${count} YouTube Views (High Retention) services na-add!`);
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
