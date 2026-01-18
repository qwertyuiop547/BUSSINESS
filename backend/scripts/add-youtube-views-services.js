const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Views services...');
    
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
            name: '⭐ Youtube Views Ads S17 ( 24 Hours start, Speed 1 million per day, Lifetime non drop )',
            providerServiceId: '359',
            providerRate: 0.3277,
            rate: 16.33,  // 0.3277 + 16
            minQuantity: 500000,
            maxQuantity: 10000000,
        },
        {
            name: 'Youtube Views S44 ( Super Slow, Speed 100-200/day, No refill )',
            providerServiceId: '613',
            providerRate: 0.36,
            rate: 16.36,  // 0.36 + 16
            minQuantity: 100,
            maxQuantity: 10000000,
        },
        {
            name: '⭐ Youtube Views Fast S56 ( Instant, Speed 5k/day, 20% drop rate with refill button R120 )',
            providerServiceId: '1347',
            providerRate: 0.7182,
            rate: 16.72,  // 0.7182 + 16
            minQuantity: 100,
            maxQuantity: 2000000,
        },
        {
            name: '⭐ Youtube Views ( 5K/Day, Lifetime Guaranteed )',
            providerServiceId: '1949',
            providerRate: 0.90,
            rate: 16.90,  // 0.90 + 16
            minQuantity: 100,
            maxQuantity: 1000000,
        },
        {
            name: '⭐ Youtube Views Ultra Fast S58 ( Instant, Speed 50K-100k/day, Non drop Lifetime Guarantee )',
            providerServiceId: '1677',
            providerRate: 1.044,
            rate: 17.04,  // 1.044 + 16
            minQuantity: 100,
            maxQuantity: 10000000,
        },
        {
            name: '⭐ Youtube Views Stable Fast S57 ( Instant, Speed 10k/day, HR, Auto Refill, Lifetime Guarantee )',
            providerServiceId: '1599',
            providerRate: 0.975,
            rate: 16.98,  // 0.975 + 16
            minQuantity: 100,
            maxQuantity: 1000000,
        },
        {
            name: '⭐ Youtube Views S46 ( Instant, Real, 5k-7k per day, No drop lifetime refill )',
            providerServiceId: '585',
            providerRate: 0.7695,
            rate: 16.77,  // 0.7695 + 16
            minQuantity: 100,
            maxQuantity: 1000000,
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
            type: 'YouTube Views',
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
    console.log(`🎉 Tapos na! ${services.length} YouTube Views services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─'.repeat(50));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
