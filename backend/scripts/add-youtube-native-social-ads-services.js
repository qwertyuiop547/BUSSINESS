/**
 * Add YouTube Native Social Ads Views (Non Drop) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-native-social-ads-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Native Social Ads Views (Non Drop) services...\n');

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

    // YouTube Native Social Ads Views (Non Drop) services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 1M ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 1M. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 49.83,        // ₱33.8298 + ₱16
            providerRate: 33.8298,
            minQuantity: 1000000,
            maxQuantity: 100000000,
            providerServiceId: '4460',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 680,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 500K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 500K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 50.42,        // ₱34.4233 + ₱16
            providerRate: 34.4233,
            minQuantity: 500000,
            maxQuantity: 100000000,
            providerServiceId: '4489',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 681,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 200K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 200K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 51.61,        // ₱35.6103 + ₱16
            providerRate: 35.6103,
            minQuantity: 200000,
            maxQuantity: 100000000,
            providerServiceId: '4488',
            isDripFeed: false,
            isRefill: true,
            averageTime: '45 hours 48 minutes',
            sortOrder: 682,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 100K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 100K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 54.58,        // ₱38.5779 + ₱16
            providerRate: 38.5779,
            minQuantity: 100000,
            maxQuantity: 100000000,
            providerServiceId: '4487',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 683,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 40K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 40K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 56.36,        // ₱40.3584 + ₱16
            providerRate: 40.3584,
            minQuantity: 40000,
            maxQuantity: 100000000,
            providerServiceId: '4486',
            isDripFeed: false,
            isRefill: true,
            averageTime: '25 hours 7 minutes',
            sortOrder: 684,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 30K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 30K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 59.33,        // ₱43.3259 + ₱16
            providerRate: 43.3259,
            minQuantity: 30000,
            maxQuantity: 100000000,
            providerServiceId: '4485',
            isDripFeed: false,
            isRefill: true,
            averageTime: '30 hours 16 minutes',
            sortOrder: 685,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 20K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 20K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 59.92,        // ₱43.9194 + ₱16
            providerRate: 43.9194,
            minQuantity: 20000,
            maxQuantity: 100000000,
            providerServiceId: '4484',
            isDripFeed: false,
            isRefill: true,
            averageTime: '40 hours 34 minutes',
            sortOrder: 686,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 10K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 10K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 62.29,        // ₱46.2934 + ₱16
            providerRate: 46.2934,
            minQuantity: 10000,
            maxQuantity: 100000000,
            providerServiceId: '4483',
            isDripFeed: false,
            isRefill: true,
            averageTime: '22 hours 8 minutes',
            sortOrder: 687,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 5K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 5K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 65.26,        // ₱49.261 + ₱16
            providerRate: 49.261,
            minQuantity: 5000,
            maxQuantity: 100000000,
            providerServiceId: '4482',
            isDripFeed: false,
            isRefill: true,
            averageTime: '15 hours 55 minutes',
            sortOrder: 688,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 3K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 3K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 65.85,        // ₱49.8545 + ₱16
            providerRate: 49.8545,
            minQuantity: 3000,
            maxQuantity: 100000000,
            providerServiceId: '4481',
            isDripFeed: false,
            isRefill: true,
            averageTime: '9 hours 8 minutes',
            sortOrder: 689,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 1K ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 1K. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 78.01,        // ₱62.0116 + ₱16
            providerRate: 62.0116,
            minQuantity: 1000,
            maxQuantity: 1000000,
            providerServiceId: '4480',
            isDripFeed: false,
            isRefill: true,
            averageTime: '28 hours 47 minutes',
            sortOrder: 690,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Native Social Ads Views Min 500 ( Lifetime Guarantee, Non Drop, 100k Per Day, 1H-3H Start )',
            description: 'Native Social Ads Views! Min 500. 100K/Day. Lifetime Guarantee. Non Drop. 1-3H Start.',
            platform: 'YOUTUBE',
            type: 'YouTube Native Social Ads Views (Non Drop)',
            rate: 82.47,        // ₱66.4728 + ₱16
            providerRate: 66.4728,
            minQuantity: 500,
            maxQuantity: 1000000,
            providerServiceId: '4479',
            isDripFeed: false,
            isRefill: true,
            averageTime: '11 hours 7 minutes',
            sortOrder: 691,
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
    console.log(`🎉 Tapos na! ${count} YouTube Native Social Ads Views services na-add!`);
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
