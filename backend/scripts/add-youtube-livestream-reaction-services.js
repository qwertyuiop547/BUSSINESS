/**
 * Add YouTube Live Stream Reaction Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-livestream-reaction-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Live Stream Reaction services...\n');

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

    // YouTube Live Stream Reaction services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Reaction ❤️ ( Max 100M, Start 0-10 Minutes, 1M per day )',
            description: 'Live Stream Reaction ❤️! Max 100M. Start 0-10 min. 1M/day.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.12,        // ₱0.1198 + ₱16
            providerRate: 0.1198,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '4402',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 17 minutes',
            sortOrder: 849,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Reaction 😊 ( Max 100M, Start 0-10 Minutes, 1M per day )',
            description: 'Live Stream Reaction 😊! Max 100M. Start 0-10 min. 1M/day.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.12,        // ₱0.1198 + ₱16
            providerRate: 0.1198,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '4403',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 850,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Reaction 🎉 ( Max 100M, Start 0-10 Minutes, 1M per day )',
            description: 'Live Stream Reaction 🎉! Max 100M. Start 0-10 min. 1M/day.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.12,        // ₱0.1198 + ₱16
            providerRate: 0.1198,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '4404',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 851,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Reaction 😮 ( Max 100M, Start 0-10 Minutes, 1M per day )',
            description: 'Live Stream Reaction 😮! Max 100M. Start 0-10 min. 1M/day.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.12,        // ₱0.1198 + ₱16
            providerRate: 0.1198,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '4405',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 852,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Reaction 💖 ( Max 100M, Start 0-10 Minutes, 1M per day )',
            description: 'Live Stream Reaction 💖! Max 100M. Start 0-10 min. 1M/day.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.12,        // ₱0.1198 + ₱16
            providerRate: 0.1198,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '4406',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 853,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Reaction Mixed 💗😊🎉😮💖 ( Max 100M, Start 0-10 Minutes, 1M per day )',
            description: 'Live Stream Reaction Mixed! All emojis. Max 100M. Start 0-10 min. 1M/day.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.12,        // ₱0.1198 + ₱16
            providerRate: 0.1198,
            minQuantity: 100,
            maxQuantity: 1000000000,
            providerServiceId: '4407',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 854,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Likes E1 ( Real, 50K, Non Drop, 30 Days Refill )',
            description: 'Live Stream Likes E1! Real. 50K max. Non Drop. 30 Days Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.39,        // ₱0.39 + ₱16
            providerRate: 0.39,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4491',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 minute',
            sortOrder: 855,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Likes E1 ( Real, 50K, Non Drop, 365 Days Refill )',
            description: 'Live Stream Likes E1! Real. 50K max. Non Drop. 365 Days Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.41,        // ₱0.408 + ₱16
            providerRate: 0.408,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4492',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 856,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Live Stream Likes E1 ( Real, 50K, Non Drop, Lifetime Refill )',
            description: 'Live Stream Likes E1! Real. 50K max. Non Drop. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Live Stream Reaction',
            rate: 16.43,        // ₱0.432 + ₱16
            providerRate: 0.432,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4493',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 857,
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
    console.log(`🎉 Tapos na! ${count} YouTube Live Stream Reaction services na-add!`);
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
