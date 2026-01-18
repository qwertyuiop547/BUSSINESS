/**
 * Add TikTok Followers Cheapest Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-followers-cheapest-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎵 Adding TikTok Followers Cheapest services...\n');

    // Get TikTok category
    let tiktokCat = await prisma.category.findFirst({ 
        where: { 
            OR: [
                { name: { contains: 'TikTok' } },
                { slug: { contains: 'tiktok' } }
            ]
        } 
    });

    if (!tiktokCat) {
        console.log('📁 Creating TikTok category...');
        tiktokCat = await prisma.category.create({
            data: {
                name: 'TikTok',
                slug: 'tiktok',
                description: 'TikTok services',
                sortOrder: 3,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // TikTok Followers Cheapest services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S7 (Instant Start, Max 1M, Low Drop, Superfast 100K/Day, No Refill)',
            description: 'Cheapest Followers S7! Instant start. Max 1M. Low Drop. 100K/Day speed. No Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Cheapest',
            rate: 22.69,        // ₱6.6876 + ₱16
            providerRate: 6.6876,
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '4991',
            isDripFeed: false,
            isRefill: false,
            averageTime: '50 minutes',
            sortOrder: 701,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S7 (Instant Start, Max 1M, Low Drop, Superfast 100K/Day, Refill 10 Days)',
            description: 'Cheapest Followers S7! Instant start. Max 1M. Low Drop. 100K/Day speed. 10 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Cheapest',
            rate: 23.65,        // ₱7.6548 + ₱16
            providerRate: 7.6548,
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '4992',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 702,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S7 (Instant Start, Max 1M, Low Drop, Superfast 100K/Day, Refill 15 Days)',
            description: 'Cheapest Followers S7! Instant start. Max 1M. Low Drop. 100K/Day speed. 15 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Cheapest',
            rate: 24.29,        // ₱8.2897 + ₱16
            providerRate: 8.2897,
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '4993',
            isDripFeed: false,
            isRefill: true,
            averageTime: '25 minutes',
            sortOrder: 703,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S7 (Instant Start, Max 1M, Low Drop, Superfast 100K/Day, Refill 20 Days)',
            description: 'Cheapest Followers S7! Instant start. Max 1M. Low Drop. 100K/Day speed. 20 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Cheapest',
            rate: 24.93,        // ₱8.9306 + ₱16
            providerRate: 8.9306,
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '4994',
            isDripFeed: false,
            isRefill: true,
            averageTime: '26 minutes',
            sortOrder: 704,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers S7 (Instant Start, Max 1M, Low Drop, Superfast 100K/Day, Refill 30 Days)',
            description: 'Cheapest Followers S7! Instant start. Max 1M. Low Drop. 100K/Day speed. 30 Days Refill.',
            platform: 'TIKTOK',
            type: 'TikTok Followers Cheapest',
            rate: 25.57,        // ₱9.5655 + ₱16
            providerRate: 9.5655,
            minQuantity: 10,
            maxQuantity: 5000000,
            providerServiceId: '4995',
            isDripFeed: false,
            isRefill: true,
            averageTime: '10 minutes',
            sortOrder: 705,
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
    console.log(`🎉 Tapos na! ${count} TikTok Followers Cheapest services na-add!`);
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
