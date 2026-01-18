/**
 * Add Twitter Female Followers (No Refill) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-female-followers-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter Female Followers (No Refill) services...\n');

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

    // Twitter Female Followers (No Refill) services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter Female Followers East Asia (Japanese, Korea, Hong Kong, Drop rate 0-5%)',
            description: 'East Asian Female Followers! Japanese, Korean, Hong Kong. Very low 0-5% drop rate.',
            platform: 'TWITTER',
            type: 'Twitter Followers (No Refill)',
            rate: 330.64,       // ₱314.6414 + ₱16
            providerRate: 314.6414,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1631',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 460,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter EN/US Female Followers (Max: 50K, Very Low Drop, No Refill, HQ Accounts)',
            description: 'EN/US Female Followers! HQ Accounts. Very Low Drop. Max 50K.',
            platform: 'TWITTER',
            type: 'Twitter Followers (No Refill)',
            rate: 330.64,       // ₱314.6414 + ₱16
            providerRate: 314.6414,
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '1636',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 461,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter NFT Female Followers (Instant, Drop rate 0-5%)',
            description: 'NFT Female Followers! Instant start. Very low 0-5% drop rate.',
            platform: 'TWITTER',
            type: 'Twitter Followers (No Refill)',
            rate: 330.64,       // ₱314.6414 + ₱16
            providerRate: 314.6414,
            minQuantity: 100,
            maxQuantity: 100000,
            providerServiceId: '1637',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 462,
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
    console.log(`🎉 Tapos na! ${count} Twitter Female Followers services na-add!`);
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
