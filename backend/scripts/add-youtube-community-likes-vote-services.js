const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Community Likes/Vote services...');
    
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
            name: 'YouTube Community Likes ( 500K, No refill, ultrafast, 0-10 min, 100K/day )',
            providerServiceId: '2525',
            providerRate: 0.868,
            rate: 16.87,  // 0.868 + 16
            minQuantity: 9,
            maxQuantity: 500000,
        },
        {
            name: 'YouTube Community Likes ( 500K, Refill: 30 days, ultrafast, 0-10 min, 100K/day )',
            providerServiceId: '2526',
            providerRate: 0.93,
            rate: 16.93,  // 0.93 + 16
            minQuantity: 9,
            maxQuantity: 500000,
        },
        {
            name: 'YouTube Community Likes ( Instant, Fast )',
            providerServiceId: '2527',
            providerRate: 1.3771,
            rate: 17.38,  // 1.3771 + 16
            minQuantity: 10,
            maxQuantity: 100000,
        },
        {
            name: 'YouTube Community Poll Votes ( Start time: 0-8 hours, Max: 10K, Refill: non drop, Speed: 100/day )',
            providerServiceId: '2528',
            providerRate: 57.12,
            rate: 73.12,  // 57.12 + 16
            minQuantity: 10,
            maxQuantity: 10000,
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
            type: 'YouTube Community Likes/Vote',
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
    console.log(`🎉 Tapos na! ${services.length} YouTube Community Likes/Vote services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─'.repeat(50));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
