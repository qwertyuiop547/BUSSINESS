const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Video/Shorts Views RAV-GS GEO Targeted services...');
    
    // Get YouTube category
    let youtubeCat = await prisma.category.findFirst({
        where: { OR: [{ name: { contains: 'YouTube' } }, { slug: { contains: 'youtube' } }] }
    });
    
    if (!youtubeCat) {
        youtubeCat = await prisma.category.create({
            data: { name: 'YouTube', slug: 'youtube', icon: 'youtube', sortOrder: 3 }
        });
    }
    
    // Get provider
    const provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });
    if (!provider) {
        console.log('❌ Walang active provider!');
        return;
    }
    
    // ₱16 markup per service
    const services = [
        {
            name: 'YouTube Unique Views - English Speakers [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1955',
            providerRate: 7.26,
            rate: 23.26,  // 7.26 + 16
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇺🇾 YouTube Unique Views - Uruguay [RAV-GS™ - Real & Active Views]',
            providerServiceId: '2048',
            providerRate: 3.4992,
            rate: 19.50,  // 3.4992 + 16
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇹🇷 YouTube Unique Views - Turkey [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1963',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇮🇩 YouTube Unique Views - Indonesia [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1964',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇷🇸 YouTube Unique Views - Serbia [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1965',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇦🇪 YouTube Unique Views - United Arab (UAE) [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1966',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇦🇷 YouTube Unique Views - Argentina [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1967',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇧🇩 YouTube Unique Views - Bangladesh [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1968',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇹🇼 YouTube Unique Views - Taiwan [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1969',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇧🇷 YouTube Unique Views - Brazil [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1970',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇪🇬 YouTube Unique Views - Egypt [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1971',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇮🇳 YouTube Unique Views - India [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1972',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇻🇳 YouTube Unique Views - Viet Nam [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1973',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
        {
            name: '🇯🇵 YouTube Unique Views - Japan [RAV-GS™ - Real & Active Views]',
            providerServiceId: '1974',
            providerRate: 3.4992,
            rate: 19.50,
            minQuantity: 500,
            maxQuantity: 100000,
        },
    ];
    
    console.log('📝 Adding services to database...\n');
    
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });
        
        const serviceData = {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: service.name,
            platform: 'YOUTUBE',
            type: 'YouTube Video/Shorts Views RAV-GS GEO Targeted',
            rate: service.rate,
            providerRate: service.providerRate,
            minQuantity: service.minQuantity,
            maxQuantity: service.maxQuantity,
            providerServiceId: service.providerServiceId,
            isDripFeed: false,
            isRefill: false,
            isActive: true,
        };
        
        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: serviceData
            });
            console.log(`🔄 Updated: ID ${service.providerServiceId} - ₱${service.rate}`);
        } else {
            await prisma.service.create({ data: serviceData });
            console.log(`✅ Added: ID ${service.providerServiceId} - ₱${service.rate}`);
        }
    }
    
    // Clear Redis cache
    const Redis = require('ioredis');
    const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    const keys = await redis.keys('services:*');
    if (keys.length > 0) await redis.del(...keys);
    await redis.quit();
    console.log('\n🗑️ Redis cache cleared!');
    
    console.log('\n' + '─'.repeat(50));
    console.log(`🎉 Tapos na! ${services.length} YouTube RAV-GS GEO Targeted services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─'.repeat(50));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
