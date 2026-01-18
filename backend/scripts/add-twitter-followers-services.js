/**
 * Add Twitter Followers Non Drop Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-followers-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Followers Non Drop services...\n');

    // Get Twitter / X category
    let twitterCat = await prisma.category.findFirst({ 
        where: { 
            OR: [
                { name: { contains: 'Twitter' } },
                { slug: { contains: 'twitter' } }
            ]
        } 
    });

    if (!twitterCat) {
        console.log('📁 Creating Twitter / X category...');
        twitterCat = await prisma.category.create({
            data: {
                name: 'Twitter / X',
                slug: 'twitter-x',
                description: 'Twitter / X services',
                sortOrder: 4,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Twitter Followers Non Drop services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers E1 (Ultrafast, 70%-90% Drop, No Refill)',
            description: 'Ultrafast delivery! 70%-90% Drop. No Refill. Budget option.',
            platform: 'TWITTER',
            type: 'Twitter Followers Non Drop',
            rate: 157.24,       // ₱141.2355 + ₱16
            providerRate: 141.2355,
            minQuantity: 100,
            maxQuantity: 6500000,
            providerServiceId: '4848',
            isDripFeed: false,
            isRefill: false,
            averageTime: '8 minutes',
            sortOrder: 401,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers E1 (Ultrafast, 20%-50% Drop, 30 Days Refill Button)',
            description: 'Ultrafast! Only 20%-50% Drop. 30 Days Refill Button. Great value!',
            platform: 'TWITTER',
            type: 'Twitter Followers Non Drop',
            rate: 722.18,       // ₱706.1773 + ₱16
            providerRate: 706.1773,
            minQuantity: 500,
            maxQuantity: 6500000,
            providerServiceId: '4849',
            isDripFeed: false,
            isRefill: true,
            averageTime: '4 minutes',
            sortOrder: 402,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Likes E3 (Fast, Small Drop, NR)',
            description: 'Fast Twitter Likes! Small Drop. No Refill.',
            platform: 'TWITTER',
            type: 'Twitter Likes',
            rate: 229.63,       // ₱213.6335 + ₱16
            providerRate: 213.6335,
            minQuantity: 10,
            maxQuantity: 1000,
            providerServiceId: '4856',
            isDripFeed: false,
            isRefill: false,
            averageTime: '195 hours 51 minutes',
            sortOrder: 403,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers E2 (Ultrafast, 5%-20% Drop, 30 Days Refill Button)',
            description: 'Ultrafast! Low 5%-20% Drop only. 30 Days Refill. Premium quality!',
            platform: 'TWITTER',
            type: 'Twitter Followers Non Drop',
            rate: 1428.35,      // ₱1412.3546 + ₱16
            providerRate: 1412.3546,
            minQuantity: 500,
            maxQuantity: 6500000,
            providerServiceId: '4852',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 404,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Followers E3 (Ultrafast, Zero Drop, 90 Days Refill Button, Best Service in market)',
            description: 'BEST SERVICE! Zero Drop. 90 Days Refill. Best quality in market!',
            platform: 'TWITTER',
            type: 'Twitter Followers Non Drop',
            rate: 3546.89,      // ₱3530.8865 + ₱16
            providerRate: 3530.8865,
            minQuantity: 500,
            maxQuantity: 6500000,
            providerServiceId: '4855',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 405,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            // Update existing service
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
    console.log(`🎉 Tapos na! ${count} Twitter Followers Non Drop services na-add!`);
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
