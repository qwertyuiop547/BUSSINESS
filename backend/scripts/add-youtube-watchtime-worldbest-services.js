/**
 * Add YouTube Watchtime (World's Best) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-watchtime-worldbest-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Watchtime (World\'s Best) services...\n');

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

    // YouTube Watchtime (World's Best) services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube WatchTime Views S1 15min+ ( 1000 views equals 250h, Start within 1 hour, Non-Drop, 60 days guarantee )',
            description: 'WatchTime 15min+! 1000 views = 250 hours. Start 1h. Non-Drop. 60 days guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Watchtime (World\'s Best)',
            rate: 372.10,       // ₱356.103 + ₱16
            providerRate: 356.103,
            minQuantity: 100,
            maxQuantity: 8000,
            providerServiceId: '4401',
            isDripFeed: false,
            isRefill: true,
            averageTime: '27 hours 31 minutes',
            sortOrder: 692,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube WatchTime Views S1 30min+ ( 1000 views equals 500h, Start within 1 hour, Non-Drop, 60 days guarantee )',
            description: 'WatchTime 30min+! 1000 views = 500 hours. Start 1h. Non-Drop. 60 days guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Watchtime (World\'s Best)',
            rate: 728.21,       // ₱712.206 + ₱16
            providerRate: 712.206,
            minQuantity: 100,
            maxQuantity: 4000,
            providerServiceId: '4400',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 59 minutes',
            sortOrder: 693,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Watchtime 60min+ ( Best In market, 1 hour+ video, 300 Hours/Day, Non drop, 30 days refill )',
            description: 'WatchTime 60min+! Best in market. 300 Hours/Day. Non drop. 30 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube Watchtime (World\'s Best)',
            rate: 1796.52,      // ₱1780.515 + ₱16
            providerRate: 1780.515,
            minQuantity: 50,
            maxQuantity: 4000,
            providerServiceId: '631',
            isDripFeed: false,
            isRefill: true,
            averageTime: '42 minutes',
            sortOrder: 694,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube WatchTime Views S1 60min+ ( 1000 views equals 1000h, Start within 1 hour, Non-Drop, 60 days guarantee )',
            description: 'WatchTime 60min+! 1000 views = 1000 hours. Start 1h. Non-Drop. 60 days guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Watchtime (World\'s Best)',
            rate: 1226.75,      // ₱1210.7502 + ₱16
            providerRate: 1210.7502,
            minQuantity: 100,
            maxQuantity: 4000,
            providerServiceId: '495',
            isDripFeed: false,
            isRefill: true,
            averageTime: '27 hours 44 minutes',
            sortOrder: 695,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube WatchTime 60min+ ( 1000 views equals 1000h, Speed 500 Hours/Day, Non Drop, 60 days guarantee )',
            description: 'WatchTime 60min+! 1000 views = 1000 hours. 500 Hours/Day. Non Drop. 60 days guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Watchtime (World\'s Best)',
            rate: 1351.39,      // ₱1335.3883 + ₱16
            providerRate: 1335.3883,
            minQuantity: 5,
            maxQuantity: 4000,
            providerServiceId: '454',
            isDripFeed: false,
            isRefill: true,
            averageTime: '86 hours 8 minutes',
            sortOrder: 696,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'Youtube Watchtime Hours 60Min+ ( 1000 Views= 1000 hours, 100% NonDrop, 500h/Day, 30 days Guarantee )',
            description: 'WatchTime 60Min+! 1000 Views = 1000 hours. 100% NonDrop. 500h/Day. 30 days Guarantee.',
            platform: 'YOUTUBE',
            type: 'YouTube Watchtime (World\'s Best)',
            rate: 1654.07,      // ₱1638.0738 + ₱16
            providerRate: 1638.0738,
            minQuantity: 10,
            maxQuantity: 4000,
            providerServiceId: '1505',
            isDripFeed: false,
            isRefill: true,
            averageTime: '47 minutes',
            sortOrder: 697,
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
    console.log(`🎉 Tapos na! ${count} YouTube Watchtime (World's Best) services na-add!`);
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
