/**
 * Add Instagram Power Comments (Real Active) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-power-comments-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💬 Adding Instagram Power Comments (Real Active) services...\n');

    // Get or create Instagram category
    let instagramCat = await prisma.category.findUnique({ where: { slug: 'instagram' } });

    if (!instagramCat) {
        instagramCat = await prisma.category.create({
            data: {
                name: 'Instagram',
                slug: 'instagram',
                description: 'Instagram services',
                sortOrder: 2,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Instagram Power Comments services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | Turkey TR | %100 Real & Active Accounts | 5 Comments',
            description: '🇹🇷 Turkey Comments! 100% Real & Active Accounts. 5 Comments per order.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 38.3238,        // Final rate with markup
            providerRate: 22.3238,  // ₱38.3238 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3580',
            isDripFeed: false,
            isRefill: false,
            averageTime: '14 hours 12 minutes',
            sortOrder: 590,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | Turkey TR | %100 Real & Active Accounts | 10 Comments',
            description: '🇹🇷 Turkey Comments! 100% Real & Active Accounts. 10 Comments per order.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 76.6415,        // Final rate with markup
            providerRate: 60.6415,  // ₱76.6415 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3581',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 591,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[CA Canada] Instagram Comments + Like + Save | %100 Real & Active Accounts | 5 Comments',
            description: '🇨🇦 Canada Comments + Like + Save! 100% Real & Active Accounts. 5 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 91.2399,        // Final rate with markup
            providerRate: 75.2399,  // ₱91.2399 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3574',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 592,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[MX Mexico ] Power Real + Active Instagram Comments + Like + Save [5 Comments - 2Hours ]',
            description: '🇲🇽 Mexico Comments + Like + Save! Power Real + Active. 5 Comments. 2 Hours delivery.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 91.2399,        // Final rate with markup
            providerRate: 75.2399,  // ₱91.2399 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3576',
            isDripFeed: false,
            isRefill: false,
            averageTime: '9 hours 35 minutes',
            sortOrder: 593,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇬🇧 England] Power Real + Active Instagram Comments + Like + Save [5 Comments - 2Hours ]',
            description: '🇬🇧 England Comments + Like + Save! Power Real + Active. 5 Comments. 2 Hours delivery.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 91.2399,        // Final rate with markup
            providerRate: 75.2399,  // ₱91.2399 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3578',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 594,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇬🇧 GB] Power Real + Active Instagram Comments + Like + Save [5 Comments - 2Hours ]',
            description: '🇬🇧 GB Comments + Like + Save! Power Real + Active. 5 Comments. 2 Hours delivery.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 91.2399,        // Final rate with markup
            providerRate: 75.2399,  // ₱91.2399 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3583',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 595,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | South Korea KR | %100 Real & Active Accounts | 5 Comments',
            description: '🇰🇷 South Korea Comments! 100% Real & Active Accounts. 5 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 109.4879,       // Final rate with markup
            providerRate: 93.4879,  // ₱109.4879 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3584',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 596,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | Suadi Arabia SA | %100 Real & Active Accounts | 5 Comments',
            description: '🇸🇦 Saudi Arabia Comments! 100% Real & Active Accounts. 5 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 109.4879,       // Final rate with markup
            providerRate: 93.4879,  // ₱109.4879 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3586',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 597,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | Lebanon LB | %100 Real & Active Accounts | 5 Comments',
            description: '🇱🇧 Lebanon Comments! 100% Real & Active Accounts. 5 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 109.4879,       // Final rate with markup
            providerRate: 93.4879,  // ₱109.4879 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3588',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 598,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇧🇷 Brazil] Instagram Comments | %100 Real & Active Accounts | 5 Comments',
            description: '🇧🇷 Brazil Comments! 100% Real & Active Accounts. 5 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 109.4879,       // Final rate with markup
            providerRate: 93.4879,  // ₱109.4879 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3572',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 599,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'US Instagram Power Comments + Like + Save | Quality: 10K+ Followers Usa Accounts | 5 Comments |',
            description: '🇺🇸 USA Comments + Like + Save! Quality: 10K+ Followers USA Accounts. 5 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 113.3452,       // Final rate with markup
            providerRate: 97.3452,  // ₱113.3452 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3564',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours',  // Estimated (not enough data provided)
            sortOrder: 600,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[CA Canada] Instagram Comments + Like + Save | %100 Real & Active Accounts | 10 Comments',
            description: '🇨🇦 Canada Comments + Like + Save! 100% Real & Active Accounts. 10 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 182.4798,       // Final rate with markup
            providerRate: 166.4798,  // ₱182.4798 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3575',
            isDripFeed: false,
            isRefill: false,
            averageTime: '77 hours 31 minutes',
            sortOrder: 601,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇲🇽 Mexico ] Power Real + Active Instagram Comments + Like + Save [ 10 Comments - 2Hours]',
            description: '🇲🇽 Mexico Comments + Like + Save! Power Real + Active. 10 Comments. 2 Hours delivery.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 182.4798,       // Final rate with markup
            providerRate: 166.4798,  // ₱182.4798 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3577',
            isDripFeed: false,
            isRefill: false,
            averageTime: '9 hours 34 minutes',
            sortOrder: 602,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇬🇧 England] Power Real + Active Instagram Comments + Like + Save [10 Comments - 2Hours]',
            description: '🇬🇧 England Comments + Like + Save! Power Real + Active. 10 Comments. 2 Hours delivery.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 182.4798,       // Final rate with markup
            providerRate: 166.4798,  // ₱182.4798 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3579',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 603,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇬🇧 GB] Power Real + Active Instagram Comments + Like + Save [ 10 Comments - 2Hours ]',
            description: '🇬🇧 GB Comments + Like + Save! Power Real + Active. 10 Comments. 2 Hours delivery.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 182.4798,       // Final rate with markup
            providerRate: 166.4798,  // ₱182.4798 - ₱16
            minQuantity: 1,
            maxQuantity: 1,
            providerServiceId: '3582',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 604,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | South Korea KR | %100 Real & Active Accounts | 10 Comments',
            description: '🇰🇷 South Korea Comments! 100% Real & Active Accounts. 10 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 197.0782,       // Final rate with markup
            providerRate: 181.0782,  // ₱197.0782 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3585',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 605,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: '[🇧🇷 Brazil] Instagram Comments | %100 Real & Active Accounts | 10 Comments',
            description: '🇧🇷 Brazil Comments! 100% Real & Active Accounts. 10 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 197.0782,       // Final rate with markup
            providerRate: 181.0782,  // ₱197.0782 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3573',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 606,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Comments | Suadi Arabia SA | %100 Real & Active Accounts | 10 Comments',
            description: '🇸🇦 Saudi Arabia Comments! 100% Real & Active Accounts. 10 Comments.',
            platform: 'INSTAGRAM',
            type: 'Instagram Power Comments (Real Active)',
            rate: 200.7278,       // Final rate with markup
            providerRate: 184.7278,  // ₱200.7278 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000,
            providerServiceId: '3587',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 607,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.providerServiceId}`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ ID ${service.providerServiceId}: ₱${service.rate.toFixed(4)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Power Comments (Real Active) services na-add!`);
    console.log('💬 Feature: Power Comments from Real Active Accounts');
    console.log('📸 Platform: Instagram');
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
