/**
 * Add YouTube Comment Reply Likes Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-comment-reply-likes-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Comment Reply Likes services...\n');

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

    // YouTube Comment Reply Likes services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Comment Reply Likes [ Video/Shorts/LiveStream ] ( Real, 5K/Day, Non Drop, 30 Days Refill )',
            description: 'Comment Reply Likes! Works on Videos, Shorts & LiveStreams. Real. 5K/Day. 30 Days Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Comment Reply Likes',
            rate: 51.01,        // ₱35.0101 + ₱16
            providerRate: 35.0101,
            minQuantity: 5,
            maxQuantity: 5000,
            providerServiceId: '4962',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 619,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Comment Reply Likes [ Video/Shorts/LiveStream ] ( Real, 5K/Day, Non Drop, 365 Days Refill )',
            description: 'Comment Reply Likes! Works on Videos, Shorts & LiveStreams. Real. 5K/Day. 365 Days Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Comment Reply Likes',
            rate: 54.51,        // ₱38.5111 + ₱16
            providerRate: 38.5111,
            minQuantity: 5,
            maxQuantity: 5000,
            providerServiceId: '4963',
            isDripFeed: false,
            isRefill: true,
            averageTime: '5 minutes',
            sortOrder: 620,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Comment Reply Likes [ Video/Shorts/LiveStream ] ( Real, 5K/Day, Non Drop, Lifetime Refill )',
            description: 'Comment Reply Likes! Works on Videos, Shorts & LiveStreams. Real. 5K/Day. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Comment Reply Likes',
            rate: 61.51,        // ₱45.5131 + ₱16
            providerRate: 45.5131,
            minQuantity: 5,
            maxQuantity: 5000,
            providerServiceId: '4964',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 minutes',
            sortOrder: 621,
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
    console.log(`🎉 Tapos na! ${count} YouTube Comment Reply Likes services na-add!`);
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
