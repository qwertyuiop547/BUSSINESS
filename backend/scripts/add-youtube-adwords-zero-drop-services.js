/**
 * Add YouTube Adwords View Zero Drop Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-adwords-zero-drop-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Adwords View Zero Drop services...\n');

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

    // YouTube Adwords View Zero Drop services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 900K E1 ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '900K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 31.33,        // ₱15.3263 + ₱16
            providerRate: 15.3263,
            minQuantity: 900000,
            maxQuantity: 10000000,
            providerServiceId: '838',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 647,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 500K E1 ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '500K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 34.84,        // ₱18.8403 + ₱16
            providerRate: 18.8403,
            minQuantity: 500000,
            maxQuantity: 10000000,
            providerServiceId: '835',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 10 minutes',
            sortOrder: 648,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 500K E1 ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '500K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 34.84,        // ₱18.8371 + ₱16
            providerRate: 18.8371,
            minQuantity: 500000,
            maxQuantity: 50000000,
            providerServiceId: '754',
            isDripFeed: false,
            isRefill: true,
            averageTime: '29 minutes',
            sortOrder: 649,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 300K E3 ( Start 12 hours, Complete in 24-48 hours, 100% no drop, 365 days guarantee )',
            description: '300K Adwords Views! Start 12h. Complete in 24-48h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 37.39,        // ₱21.3912 + ₱16
            providerRate: 21.3912,
            minQuantity: 300000,
            maxQuantity: 2147483647,
            providerServiceId: '19',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 650,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 30K E3 ( Start 12 hours, Complete in 24-48 hours, 100% no drop, 365 days guarantee )',
            description: '30K Adwords Views! Start 12h. Complete in 24-48h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 39.41,        // ₱23.4073 + ₱16
            providerRate: 23.4073,
            minQuantity: 50000,
            maxQuantity: 2147483647,
            providerServiceId: '4902',
            isDripFeed: false,
            isRefill: true,
            averageTime: '121 hours 20 minutes',
            sortOrder: 651,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 200K E1 ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '200K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 40.33,        // ₱24.326 + ₱16
            providerRate: 24.326,
            minQuantity: 200000,
            maxQuantity: 10000000,
            providerServiceId: '4900',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 652,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 100K E3 ( Start 12 hours, Complete in 24-48 hours, 100% no drop, 365 days guarantee )',
            description: '100K Adwords Views! Start 12h. Complete in 24-48h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 40.62,        // ₱24.6214 + ₱16
            providerRate: 24.6214,
            minQuantity: 100000,
            maxQuantity: 2147483647,
            providerServiceId: '4901',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 653,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 100K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '100K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 54.79,        // ₱38.7887 + ₱16
            providerRate: 38.7887,
            minQuantity: 100000,
            maxQuantity: 100000000,
            providerServiceId: '4898',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 38 minutes',
            sortOrder: 654,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 40K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '40K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 74.57,        // ₱58.5688 + ₱16
            providerRate: 58.5688,
            minQuantity: 40000,
            maxQuantity: 100000000,
            providerServiceId: '4899',
            isDripFeed: false,
            isRefill: true,
            averageTime: '80 hours 41 minutes',
            sortOrder: 655,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 30K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '30K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 57.54,        // ₱41.5358 + ₱16
            providerRate: 41.5358,
            minQuantity: 30000,
            maxQuantity: 100000000,
            providerServiceId: '4903',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 656,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 20K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '20K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 58.13,        // ₱42.126 + ₱16
            providerRate: 42.126,
            minQuantity: 20000,
            maxQuantity: 100000000,
            providerServiceId: '4904',
            isDripFeed: false,
            isRefill: true,
            averageTime: '54 hours 3 minutes',
            sortOrder: 657,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 10K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '10K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 59.39,        // ₱43.3854 + ₱16
            providerRate: 43.3854,
            minQuantity: 10000,
            maxQuantity: 100000000,
            providerServiceId: '4905',
            isDripFeed: false,
            isRefill: true,
            averageTime: '54 hours 43 minutes',
            sortOrder: 658,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 5K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '5K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 62.53,        // ₱46.5302 + ₱16
            providerRate: 46.5302,
            minQuantity: 5000,
            maxQuantity: 100000000,
            providerServiceId: '4906',
            isDripFeed: false,
            isRefill: true,
            averageTime: '130 hours 26 minutes',
            sortOrder: 659,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 3K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '3K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 63.53,        // ₱47.5289 + ₱16
            providerRate: 47.5289,
            minQuantity: 3000,
            maxQuantity: 100000000,
            providerServiceId: '4907',
            isDripFeed: false,
            isRefill: true,
            averageTime: '61 hours 5 minutes',
            sortOrder: 660,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords View 1K ( Start 5-8 hours, Complete in 24 hours, 100% no drop, 365 days guarantee )',
            description: '1K Adwords Views! Start 5-8h. Complete in 24h. 100% no drop. 365 days guarantee.',
            platform: 'YOUTUBE',
            type: 'Youtube Adwords View Zero Drop',
            rate: 66.51,        // ₱50.5146 + ₱16
            providerRate: 50.5146,
            minQuantity: 1000,
            maxQuantity: 100000000,
            providerServiceId: '4908',
            isDripFeed: false,
            isRefill: true,
            averageTime: '53 hours 50 minutes',
            sortOrder: 661,
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
    console.log(`🎉 Tapos na! ${count} YouTube Adwords View Zero Drop services na-add!`);
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
