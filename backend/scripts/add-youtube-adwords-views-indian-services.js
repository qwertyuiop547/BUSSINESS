/**
 * Add YouTube Adwords Views Indian Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-adwords-views-indian-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Adwords Views Indian services...\n');

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

    // YouTube Adwords Views Indian services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords Views ➜ INDIAN 1M ( Start 12 hours, Complete in 24-48 hours, 100% Non drop )',
            description: 'Adwords Views from India! 1M package. Start in 12h, complete in 24-48h. 100% Non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Adwords Views Indian',
            rate: 37.36,        // ₱21.3612 + ₱16
            providerRate: 21.3612,
            minQuantity: 1000000,
            maxQuantity: 1000000000,
            providerServiceId: '4870',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 642,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords Views ➜ INDIAN 500K ( Start 12 hours, Complete in 24-48 hours, 100% Non drop )',
            description: 'Adwords Views from India! 500K package. Start in 12h, complete in 24-48h. 100% Non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Adwords Views Indian',
            rate: 40.92,        // ₱24.9214 + ₱16
            providerRate: 24.9214,
            minQuantity: 500000,
            maxQuantity: 2147483647,
            providerServiceId: '4871',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 643,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords Views ➜ INDIAN 300K ( Start 12 hours, Complete in 24-48 hours, 100% Non drop )',
            description: 'Adwords Views from India! 300K package. Start in 12h, complete in 24-48h. 100% Non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Adwords Views Indian',
            rate: 42.11,        // ₱26.1081 + ₱16
            providerRate: 26.1081,
            minQuantity: 300000,
            maxQuantity: 2147483647,
            providerServiceId: '4874',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 644,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords Views ➜ INDIAN 100K ( Start 12 hours, Complete in 24-48 hours, 100% Non drop )',
            description: 'Adwords Views from India! 100K package. Start in 12h, complete in 24-48h. 100% Non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Adwords Views Indian',
            rate: 44.48,        // ₱28.4816 + ₱16
            providerRate: 28.4816,
            minQuantity: 100000,
            maxQuantity: 2147483647,
            providerServiceId: '4872',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 645,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Adwords Views ➜ INDIAN 50K ( Start 12 hours, Complete in 24-48 hours, 100% Non drop )',
            description: 'Adwords Views from India! 50K package. Start in 12h, complete in 24-48h. 100% Non drop.',
            platform: 'YOUTUBE',
            type: 'YouTube Adwords Views Indian',
            rate: 46.26,        // ₱30.2617 + ₱16
            providerRate: 30.2617,
            minQuantity: 50000,
            maxQuantity: 2147483647,
            providerServiceId: '4873',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 646,
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
    console.log(`🎉 Tapos na! ${count} YouTube Adwords Views Indian services na-add!`);
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
