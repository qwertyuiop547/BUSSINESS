const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Native Ads Views services...');
    
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
            name: 'Youtube Native Views Fast S5 ( Non drop, 20k-50k per day, Lifetime Guaranteed, Min 20k )',
            providerServiceId: '3696',
            providerRate: 0.8271,
            rate: 16.83,  // 0.8271 + 16
            minQuantity: 20000,
            maxQuantity: 1000000,
        },
        {
            name: 'Youtube Native Views Fast S4 ( Non drop, 20k-50k per day, Lifetime Guaranteed, Min 10k )',
            providerServiceId: '3695',
            providerRate: 0.833,
            rate: 16.83,  // 0.833 + 16
            minQuantity: 3000,
            maxQuantity: 1000000,
        },
        {
            name: 'Youtube Native Views Fast S3 ( Non drop, 20k-50k per day, Lifetime Guaranteed, Min 5k )',
            providerServiceId: '3694',
            providerRate: 0.833,
            rate: 16.83,  // 0.833 + 16
            minQuantity: 2000,
            maxQuantity: 1000000,
        },
        {
            name: 'Youtube Native Views Fast S2 ( Non drop, 20k-50k per day, Lifetime Guaranteed, Min 3k )',
            providerServiceId: '3693',
            providerRate: 0.8092,
            rate: 16.81,  // 0.8092 + 16
            minQuantity: 3000,
            maxQuantity: 10000000,
        },
        {
            name: 'Youtube Native Views S1 ( Non drop, 1k-2k per daily, Instant start, Min 100 )',
            providerServiceId: '3692',
            providerRate: 0.8211,
            rate: 16.82,  // 0.8211 + 16
            minQuantity: 100,
            maxQuantity: 10000000,
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
            type: 'YouTube Native Ads Views',
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
    console.log(`🎉 Tapos na! ${services.length} YouTube Native Ads Views services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─'.repeat(50));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
