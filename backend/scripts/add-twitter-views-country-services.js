/**
 * Add Twitter X.com Video Views (Country Targeted) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-views-country-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter X.com Video Views (Country Targeted) services...\n');

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

    // Twitter X.com Video Views Country Targeted services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Germany (Max 50M, 1M/Day, No Drop)',
            description: 'German targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4749',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 minutes',
            sortOrder: 410,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Mixed (Max 50M, 1M/Day, No Drop)',
            description: 'Mixed worldwide video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4750',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 minutes',
            sortOrder: 411,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views USA (Max 50M, 1M/Day, No Drop)',
            description: 'USA targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4751',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 412,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views UK (Max 50M, 1M/Day, No Drop)',
            description: 'UK targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4752',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 413,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views India (Max 50M, 1M/Day, No Drop)',
            description: 'India targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4753',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 minutes',
            sortOrder: 414,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Korea (Max 50M, 1M/Day, No Drop)',
            description: 'Korea targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4754',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 415,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Italy (Max 50M, 1M/Day, No Drop)',
            description: 'Italy targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4755',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 416,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Russia (Max 50M, 1M/Day, No Drop)',
            description: 'Russia targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4756',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 417,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Brazil (Max 50M, 1M/Day, No Drop)',
            description: 'Brazil targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4757',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 418,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter X.com Video Views Arab (Max 50M, 1M/Day, No Drop)',
            description: 'Arab targeted video views! Max 50M. 1M/Day speed. No Drop.',
            platform: 'TWITTER',
            type: 'Twitter Video Views Country Targeted',
            rate: 16.27,        // ₱0.2671 + ₱16
            providerRate: 0.2671,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4758',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 419,
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
    console.log(`🎉 Tapos na! ${count} Twitter Video Views Country Targeted services na-add!`);
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
