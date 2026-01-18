/**
 * Add YouTube Custom Live Chat Comments Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-live-chat-comments-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Custom Live Chat Comments services...\n');

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

    // YouTube Custom Live Chat Comments services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published )',
            description: 'Custom Live Chat Comments! Write your own messages. Works on Live Streams, Premiere Videos & Waiting videos.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4924',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 625,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published ) | Speed 1-5 Chats Per Minutes',
            description: 'Custom Live Chat Comments! 1-5 chats per minute speed. Write your own messages.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4925',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 626,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published ) | Speed 5-10 Chats Per Minutes',
            description: 'Custom Live Chat Comments! 5-10 chats per minute speed. Write your own messages.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4926',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 15 minutes',
            sortOrder: 627,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published ) | Speed 10-20 Chats Per Minutes',
            description: 'Custom Live Chat Comments! 10-20 chats per minute speed. Write your own messages.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4927',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 628,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published ) | Speed 20-30 Chats Per Minutes',
            description: 'Custom Live Chat Comments! 20-30 chats per minute speed. Write your own messages.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4928',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 629,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published ) | Speed 30-40 Chats Per Minutes',
            description: 'Custom Live Chat Comments! 30-40 chats per minute speed. Write your own messages.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4929',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 630,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Custom Live Chat Comments ( Live Stream / Premiere Video / Waiting To Be Published ) | Speed 40-50 Chats Per Minutes',
            description: 'Custom Live Chat Comments! 40-50 chats per minute speed. Write your own messages.',
            platform: 'YOUTUBE',
            type: 'YouTube Custom Live Chat Comments',
            rate: 121.92,       // ₱105.9202 + ₱16
            providerRate: 105.9202,
            minQuantity: 5,
            maxQuantity: 100000,
            providerServiceId: '4930',
            isDripFeed: false,
            isRefill: false,
            averageTime: '36 minutes',
            sortOrder: 631,
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
    console.log(`🎉 Tapos na! ${count} YouTube Custom Live Chat Comments services na-add!`);
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
