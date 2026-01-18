const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Community Post Likes/Dislikes services...');
    
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
            name: 'Youtube Community Post Likes ( Instant, Fast )',
            providerServiceId: '1499',
            providerRate: 6.60,
            rate: 22.60,  // 6.60 + 16
            minQuantity: 10,
            maxQuantity: 100000,
        },
        {
            name: 'Youtube Post Comment Likes ( Instant, Fast )',
            providerServiceId: '1500',
            providerRate: 6.60,
            rate: 22.60,  // 6.60 + 16
            minQuantity: 10,
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
            type: 'YouTube Community Post Likes/Dislikes',
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
    console.log(`🎉 Tapos na! ${services.length} YouTube Community Post Likes services na-add!`);
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('─'.repeat(50));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
