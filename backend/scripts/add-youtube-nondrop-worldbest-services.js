/**
 * Add YouTube Non Drop Views (World's Best) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-nondrop-worldbest-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Non Drop Views (World\'s Best) services...\n');

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

    // YouTube Non Drop Views (World's Best) services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords Views S54 ( Min 1 Million, Start 6-8 hours, Complete within 48 hours, 10 million/Day, No drop )',
            description: 'Adwords Views S54! Min 1M. Start 6-8h. 10M/Day speed. No drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 34.94,        // ₱18.9447 + ₱16
            providerRate: 18.9447,
            minQuantity: 500000,
            maxQuantity: 10000000,
            providerServiceId: '1341',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 666,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views Native Ads S17 ( 10 Minute start, Speed 1 million per day, Lifetime non drop )',
            description: 'Native Ads Views S17! 10 min start. 1M/Day speed. Lifetime non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 55.53,        // ₱39.5275 + ₱16
            providerRate: 39.5275,
            minQuantity: 100000,
            maxQuantity: 100000000,
            providerServiceId: '951',
            isDripFeed: false,
            isRefill: true,
            averageTime: '38 hours 49 minutes',
            sortOrder: 667,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Native Views Fast S4 ( Non drop, 20k-50k per day, Lifetime Guaranteed, Min 10k )',
            description: 'Native Views Fast S4! 20K-50K/Day. Lifetime Guaranteed. Min 10K.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 63.42,        // ₱47.4211 + ₱16
            providerRate: 47.4211,
            minQuantity: 10000,
            maxQuantity: 100000000,
            providerServiceId: '1911',
            isDripFeed: false,
            isRefill: true,
            averageTime: '70 hours 40 minutes',
            sortOrder: 668,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Native Views Fast S2 ( Non drop, 20k-50k per day, Lifetime Guaranteed, Min 3k )',
            description: 'Native Views Fast S2! 20K-50K/Day. Lifetime Guaranteed. Min 3K.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 66.29,        // ₱50.2899 + ₱16
            providerRate: 50.2899,
            minQuantity: 5000,
            maxQuantity: 100000000,
            providerServiceId: '3009',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 669,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Native Views Fast S5 ( Non drop, 2k-5k per day, Lifetime Guaranteed )',
            description: 'Native Views Fast S5! 2K-5K/Day. Lifetime Guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 66.08,        // ₱50.0821 + ₱16
            providerRate: 50.0821,
            minQuantity: 3000,
            maxQuantity: 100000000,
            providerServiceId: '1344',
            isDripFeed: false,
            isRefill: true,
            averageTime: '38 hours 42 minutes',
            sortOrder: 670,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views Stable S52 ( Instant, 5K/Day, Real, Non drop 30 days guarantee )',
            description: 'Stable Views S52! Instant. 5K/Day. Real. 30 days guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 72.58,        // ₱56.5842 + ₱16
            providerRate: 56.5842,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '1337',
            isDripFeed: false,
            isRefill: true,
            averageTime: '28 hours 11 minutes',
            sortOrder: 671,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views S90 ( Real, 50K/Day, Suggested+External, Lifetime Guarantee )',
            description: 'Views S90! Real. 50K/Day. Suggested+External traffic. Lifetime Guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 69.22,        // ₱53.2198 + ₱16
            providerRate: 53.2198,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '1719',
            isDripFeed: false,
            isRefill: true,
            averageTime: '33 hours 18 minutes',
            sortOrder: 672,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views Stable S56 ( Instant, Speed 3k-5k/day, 30 days guarantee, 5% drop )',
            description: 'Stable Views S56! Instant. 3K-5K/Day. 30 days guarantee. Max 5% drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 71.31,        // ₱55.3147 + ₱16
            providerRate: 55.3147,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '3684',
            isDripFeed: false,
            isRefill: true,
            averageTime: '6 hours 57 minutes',
            sortOrder: 673,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views Suggested S54 ( 10 Minute start, Speed 10k per day, Lifetime non drop )',
            description: 'Suggested Views S54! 10 min start. 10K/Day. Lifetime non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 77.98,        // ₱61.982 + ₱16
            providerRate: 61.982,
            minQuantity: 100,
            maxQuantity: 10000000,
            providerServiceId: '1343',
            isDripFeed: false,
            isRefill: true,
            averageTime: '9 hours 10 minutes',
            sortOrder: 674,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views S53 ( 10 Minute start, Speed 100k per day, Lifetime non drop )',
            description: 'Views S53! 10 min start. 100K/Day speed. Lifetime non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 78.32,        // ₱62.3181 + ₱16
            providerRate: 62.3181,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '1340',
            isDripFeed: false,
            isRefill: true,
            averageTime: '63 hours 11 minutes',
            sortOrder: 675,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views Stable S51 ( Instant, Speed 3k-5k/day, Non drop Lifetime Guarantee )',
            description: 'Stable Views S51! Instant. 3K-5K/Day. Non drop Lifetime Guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 58.29,        // ₱42.2873 + ₱16
            providerRate: 42.2873,
            minQuantity: 100,
            maxQuantity: 2000000,
            providerServiceId: '1339',
            isDripFeed: false,
            isRefill: true,
            averageTime: '16 hours 3 minutes',
            sortOrder: 676,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views Stable S53 ( Instant, 5K/Day, Real, Non drop 30 Days guarantee )',
            description: 'Stable Views S53! Instant. 5K/Day. Real. 30 Days guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 79.60,        // ₱63.60 + ₱16
            providerRate: 63.60,
            minQuantity: 1000,
            maxQuantity: 1500000,
            providerServiceId: '1345',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 hours 7 minutes',
            sortOrder: 677,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube RAV™ Real Human Views + Engagements ( Instant, 2K/Day, 30 Days Guarantee )',
            description: 'RAV™ Real Human Views + Engagements! Instant. 2K/Day. 30 Days Guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 110.72,       // ₱94.7234 + ₱16
            providerRate: 94.7234,
            minQuantity: 100,
            maxQuantity: 100000,
            providerServiceId: '1342',
            isDripFeed: false,
            isRefill: true,
            averageTime: '30 hours 2 minutes',
            sortOrder: 678,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Views HR SEO ( Instant, Google Search views, 500-1k per day, 30-5min Retention, 30 days guaranteed )',
            description: 'HR SEO Views! Google Search views. 500-1K/Day. 30-5min Retention. 30 days guaranteed.',
            platform: 'YOUTUBE',
            type: 'YouTube Non Drop Views (World\'s Best)',
            rate: 114.75,       // ₱98.7532 + ₱16
            providerRate: 98.7532,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4748',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 hours 11 minutes',
            sortOrder: 679,
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
    console.log(`🎉 Tapos na! ${count} YouTube Non Drop Views (World's Best) services na-add!`);
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
