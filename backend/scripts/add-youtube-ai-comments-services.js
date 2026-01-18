/**
 * Add YouTube AI Comments Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-youtube-ai-comments-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube AI Comments services...\n');

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

    // YouTube AI Comments services (with ₱16 markup)
    const services = [
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Video Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R30)',
            description: 'AI Comments for Videos! Auto-generated based on content. 10K/Day. 30 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 342.40,       // ₱326.403 + ₱16
            providerRate: 326.403,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4944',
            isDripFeed: false,
            isRefill: true,
            averageTime: '58 minutes',
            sortOrder: 610,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Shorts Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R30)',
            description: 'AI Comments for Shorts! Auto-generated based on content. 10K/Day. 30 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 342.40,       // ₱326.403 + ₱16
            providerRate: 326.403,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4947',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 minutes',
            sortOrder: 611,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube LiveStream Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R30)',
            description: 'AI Comments for LiveStream! Auto-generated based on content. 10K/Day. 30 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 342.40,       // ₱326.403 + ₱16
            providerRate: 326.403,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4955',
            isDripFeed: false,
            isRefill: true,
            averageTime: '48 minutes',
            sortOrder: 612,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Video Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R365)',
            description: 'AI Comments for Videos! Auto-generated based on content. 10K/Day. 365 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 357.24,       // ₱341.2395 + ₱16
            providerRate: 341.2395,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4945',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 minutes',
            sortOrder: 613,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Shorts Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R365)',
            description: 'AI Comments for Shorts! Auto-generated based on content. 10K/Day. 365 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 357.24,       // ₱341.2395 + ₱16
            providerRate: 341.2395,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4948',
            isDripFeed: false,
            isRefill: true,
            averageTime: '3 hours 8 minutes',
            sortOrder: 614,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube LiveStream Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R365)',
            description: 'AI Comments for LiveStream! Auto-generated based on content. 10K/Day. 365 days refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 357.24,       // ₱341.2395 + ₱16
            providerRate: 341.2395,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4956',
            isDripFeed: false,
            isRefill: true,
            averageTime: 'Not enough data',
            sortOrder: 615,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Video Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R∞)',
            description: 'AI Comments for Videos! Auto-generated based on content. 10K/Day. Lifetime refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 369.11,       // ₱353.1087 + ₱16
            providerRate: 353.1087,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4946',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 minutes',
            sortOrder: 616,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube Shorts Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R∞)',
            description: 'AI Comments for Shorts! Auto-generated based on content. 10K/Day. Lifetime refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 369.11,       // ₱353.1087 + ₱16
            providerRate: 353.1087,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4949',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 minute',
            sortOrder: 617,
        },
        {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: 'YouTube LiveStream Comments AI (Auto Generate Comments by AI Based on Video Content, 10K/Day, Non Drop, R∞)',
            description: 'AI Comments for LiveStream! Auto-generated based on content. 10K/Day. Lifetime refill.',
            platform: 'YOUTUBE',
            type: 'YouTube AI Comments',
            rate: 369.11,       // ₱353.1087 + ₱16
            providerRate: 353.1087,
            minQuantity: 5,
            maxQuantity: 10000,
            providerServiceId: '4957',
            isDripFeed: false,
            isRefill: true,
            averageTime: '46 minutes',
            sortOrder: 618,
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
    console.log(`🎉 Tapos na! ${count} YouTube AI Comments services na-add!`);
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
