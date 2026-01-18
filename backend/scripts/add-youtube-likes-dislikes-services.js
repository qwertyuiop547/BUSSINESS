const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Video Likes/Dislikes services...');
    
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
            name: 'Youtube Likes S28 ( Instant, Cheapest in market, 20k Per day, Max 100K )',
            providerServiceId: '4582',
            providerRate: 0.05,
            rate: 16.05,
            minQuantity: 10,
            maxQuantity: 100000,
            isRefill: false,
        },
        {
            name: 'YouTube Dislikes S4 ( Instant-10 min, Fast, Max 20k, Speed 2k/Day )',
            providerServiceId: '1270',
            providerRate: 0.125,
            rate: 16.13,
            minQuantity: 5,
            maxQuantity: 500000,
            isRefill: false,
        },
        {
            name: 'YouTube Likes S28 ( Super Instant, Ultrafast 50k Per day, Max 500K )',
            providerServiceId: '1275',
            providerRate: 0.175,
            rate: 16.18,
            minQuantity: 10,
            maxQuantity: 100000,
            isRefill: false,
        },
        {
            name: 'Youtube Likes S29 ( Super Instant, HQ, 50k Per day, 30 days refill, Max 10K )',
            providerServiceId: '1274',
            providerRate: 0.18,
            rate: 16.18,
            minQuantity: 10,
            maxQuantity: 80000,
            isRefill: true,
            refillDays: 30,
        },
        {
            name: 'Youtube Likes S30 ( Instant, Fast 10k Per day, Max 10K, 30 DAYS REFILL )',
            providerServiceId: '2073',
            providerRate: 0.216,
            rate: 16.22,
            minQuantity: 10,
            maxQuantity: 50000,
            isRefill: true,
            refillDays: 30,
        },
        {
            name: 'Youtube Likes S5 ( Instant, Real, Ultrafast 100k Per day, NonDrop, 365D Refill Button, Lifetime Guarantee )',
            providerServiceId: '751',
            providerRate: 0.24,
            rate: 16.24,
            minQuantity: 10,
            maxQuantity: 50000,
            isRefill: true,
            refillDays: 365,
        },
        {
            name: 'Youtube Likes S28 ( Instant, 100k Per day, 365 days Refill guaranteed, Max 100K )',
            providerServiceId: '2406',
            providerRate: 0.39,
            rate: 16.39,
            minQuantity: 10,
            maxQuantity: 1000000,
            isRefill: true,
            refillDays: 365,
        },
        {
            name: 'Youtube Likes E3 ( Instant, Real, Ultrafast 50k Per day, Non Drop, 30 Days Refill Button )',
            providerServiceId: '894',
            providerRate: 0.40,
            rate: 16.40,
            minQuantity: 10,
            maxQuantity: 100000,
            isRefill: true,
            refillDays: 30,
        },
        {
            name: 'Youtube Likes E3 ( Instant, Real, Ultrafast 50k Per day, NonDrop, 365D Refill Button )',
            providerServiceId: '25',
            providerRate: 0.402,
            rate: 16.40,
            minQuantity: 10,
            maxQuantity: 100000,
            isRefill: true,
            refillDays: 365,
        },
        {
            name: 'Youtube Likes E3 ( Instant, Real, Ultrafast 50k Per day, Non Drop, Lifetime refill )',
            providerServiceId: '1154',
            providerRate: 0.408,
            rate: 16.41,
            minQuantity: 10,
            maxQuantity: 100000,
            isRefill: true,
            refillDays: 9999,
        },
        {
            name: 'Youtube Likes S5 ( Instant, Real, Ultrafast 100k Per day, Non Drop, 30 Days Refill Button )',
            providerServiceId: '348',
            providerRate: 0.432,
            rate: 16.43,
            minQuantity: 10,
            maxQuantity: 300000,
            isRefill: true,
            refillDays: 30,
        },
        {
            name: 'Youtube Likes S4 ( Instant, 5k-10k Per day, No Refill, Max 50K )',
            providerServiceId: '401',
            providerRate: 0.70,
            rate: 16.70,
            minQuantity: 20,
            maxQuantity: 100000,
            isRefill: false,
        },
        {
            name: '⭐ YouTube Likes S1 ( Instant, Real, Non drop, Speed 10k/Day, 30 days auto refill )',
            providerServiceId: '246',
            providerRate: 0.95,
            rate: 16.95,
            minQuantity: 10,
            maxQuantity: 100000,
            isRefill: true,
            refillDays: 30,
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
            type: 'YouTube Video Likes/Dislikes',
            rate: service.rate,
            providerRate: service.providerRate,
            minQuantity: service.minQuantity,
            maxQuantity: service.maxQuantity,
            providerServiceId: service.providerServiceId,
            isDripFeed: false,
            isRefill: service.isRefill || false,
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
    console.log(`🎉 Tapos na! ${services.length} YouTube Video Likes/Dislikes services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─'.repeat(50));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
