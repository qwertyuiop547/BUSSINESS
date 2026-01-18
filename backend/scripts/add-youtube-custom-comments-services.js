/**
 * Add YouTube Custom Comments Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-custom-comments-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Custom Comments services...\n');

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

    // YouTube Custom Comments services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Comments [ Video/Shorts/LiveStream ] ( Real, 10K/Day, Non Drop, 30 Days Refill )',
            description: 'Custom Comments! Write your own comments. Works on Videos, Shorts & LiveStreams. Real. 10K/Day. 30 Days Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Comments',
            rate: 226.06,       // ₱210.0601 + ₱16
            providerRate: 210.0601,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4965',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 41 minutes',
            sortOrder: 622,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Comments [ Video/Shorts/LiveStream ] ( Real, 10K/Day, Non Drop, 365 Days Refill )',
            description: 'Custom Comments! Write your own comments. Works on Videos, Shorts & LiveStreams. Real. 10K/Day. 365 Days Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Comments',
            rate: 243.57,       // ₱227.5651 + ₱16
            providerRate: 227.5651,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4966',
            isDripFeed: false,
            isRefill: true,
            averageTime: '17 minutes',
            sortOrder: 623,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Comments [ Video/Shorts/LiveStream ] ( Real, 10K/Day, Non Drop, Lifetime Refill )',
            description: 'Custom Comments! Write your own comments. Works on Videos, Shorts & LiveStreams. Real. 10K/Day. Lifetime Refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Comments',
            rate: 261.07,       // ₱245.0701 + ₱16
            providerRate: 245.0701,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4967',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 624,
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
    console.log(`🎉 Tapos na! ${count} YouTube Custom Comments services na-add!`);
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
