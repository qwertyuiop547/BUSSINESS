/**
 * Add Instagram Subscriptions (Auto Likes Views) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-auto-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Adding Instagram Subscriptions (Auto Likes Views) services...\n');

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

    // Instagram Auto Likes/Views services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Views (Video+IGTV+Reel) (Instant, Automatic Views on future/old posts)',
            description: 'Auto Views for Video+IGTV+Reel! Works on future and old posts. Super cheap!',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 16.12,        // ₱0.1186 + ₱16
            providerRate: 0.1186,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4708',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 21 minutes',
            sortOrder: 430,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Views (Video+IGTV+Reel) (Instant, Automatic Views on future/old posts) - Fast',
            description: 'Fast Auto Views! Video+IGTV+Reel. 23 min average! Massive capacity!',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 16.59,        // ₱0.593 + ₱16
            providerRate: 0.593,
            minQuantity: 100,
            maxQuantity: 2147483647,
            providerServiceId: '4704',
            isDripFeed: false,
            isRefill: false,
            averageTime: '23 minutes',
            sortOrder: 431,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Likes Real R30 (Automatic Likes on future/old posts)',
            description: 'Real Auto Likes! 30 Days Refill. Works on future and old posts.',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 27.72,        // ₱11.7233 + ₱16
            providerRate: 11.7233,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4700',
            isDripFeed: false,
            isRefill: true,
            averageTime: '20 minutes',
            sortOrder: 432,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Likes Brazil R365 (Automatic Likes on future/old posts, Real Brazilian Accounts)',
            description: 'Brazil targeted! Real Brazilian Accounts. 365 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 31.65,        // ₱15.6547 + ₱16
            providerRate: 15.6547,
            minQuantity: 50,
            maxQuantity: 50000,
            providerServiceId: '4701',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 433,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Likes + Reach & Impressions (Automatic Likes & Impressions on future/old posts)',
            description: 'Auto Likes WITH Reach & Impressions! Great for engagement boost!',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 35.57,        // ₱19.5684 + ₱16
            providerRate: 19.5684,
            minQuantity: 10,
            maxQuantity: 20000,
            providerServiceId: '4702',
            isDripFeed: false,
            isRefill: false,
            averageTime: '10 minutes',
            sortOrder: 434,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Likes Indian R365 (Automatic Likes on future/old posts, Real Indian Accounts)',
            description: 'India targeted! Real Indian Accounts. 365 Days Refill!',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 35.57,        // ₱19.5684 + ₱16
            providerRate: 19.5684,
            minQuantity: 50,
            maxQuantity: 100000,
            providerServiceId: '4703',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 435,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Auto Likes Indian S2 (Instant, 90% Indian real Likes, Add Username Only, Cost per thousand 0.2$)',
            description: '90% Indian Real Likes! Username only. Instant start.',
            platform: 'INSTAGRAM',
            type: 'Instagram Subscriptions (Auto Likes Views)',
            rate: 48.02,        // ₱32.021 + ₱16
            providerRate: 32.021,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '825',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 436,
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
        console.log(`✅ ID ${service.providerServiceId}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Subscriptions services na-add!`);
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
