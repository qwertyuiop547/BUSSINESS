/**
 * Add YouTube Likes Social Media Referrer Services (Part 2)
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-likes-social-media-referrer-2-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Likes Social Media Referrer (Part 2) services...\n');

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

    // YouTube Likes Social Media Referrer services Part 2 (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Linkedin.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Linkedin.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4838',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 17 minutes',
            sortOrder: 801,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Bsky.social | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Bsky.social referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4839',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 802,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Threads.net | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Threads.net referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4840',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 803,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Vk.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Vk.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4841',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 804,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Ok.ru | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Ok.ru referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4842',
            isDripFeed: false,
            isRefill: true,
            averageTime: '25 minutes',
            sortOrder: 805,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Tumblr.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Tumblr.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4843',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 43 minutes',
            sortOrder: 806,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Discord.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Discord.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4844',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 807,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Clubhouse.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Clubhouse.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4845',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 808,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Twitch.tv | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Twitch.tv referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4846',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 809,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Kick.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Kick.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4847',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 810,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Shopee.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Shopee.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4848',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 811,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Likes | Bilibili.com | 100K/Day | Non-Drop | Lifetime Refill ♻️ | Instant',
            description: 'YouTube Likes from Bilibili.com referrer! 100K/Day. Non-Drop. Lifetime Refill. Instant.',
            platform: 'YOUTUBE',
            type: 'YouTube Likes Social Media Referrer',
            rate: 40.34,        // ₱24.3356 + ₱16
            providerRate: 24.3356,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4849',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 5 minutes',
            sortOrder: 812,
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
    console.log(`🎉 Tapos na! ${count} YouTube Likes Social Media Referrer (Part 2) services na-add!`);
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
