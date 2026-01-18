/**
 * Add TikTok Followers (Superfast Bot) Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-followers-bot-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎵 Adding TikTok Followers (Superfast Bot) services...\n');

    // Get TikTok category
    let tiktokCat = await prisma.category.findUnique({ where: { slug: 'tiktok' } });

    if (!tiktokCat) {
        console.log('📁 Creating TikTok category...');
        tiktokCat = await prisma.category.create({
            data: {
                name: 'TikTok',
                slug: 'tiktok',
                description: 'TikTok services',
                sortOrder: 3,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    if (!provider) {
        console.log('🔗 Creating provider...');
        provider = await prisma.provider.create({
            data: {
                name: 'TikTok Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'TikTok services provider',
            },
        });
    }

    // TikTok Followers (Superfast Bot) services (with ₱16 markup)
    const services = [
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Bot (Instant, Bot Accounts, Superfast 100k/days, NR)',
            description: 'Superfast Bot Followers! 100k/day delivery. Instant start. No Refill. Budget option!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Superfast Bot)',
            rate: 30.06,        // ₱14.0625 + ₱16
            providerRate: 14.0625,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4936',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 40 minutes',
            sortOrder: 200,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Bot (Instant, Bot Accounts, Superfast 100k/days, R7)',
            description: 'Superfast Bot Followers! 100k/day delivery. Instant start. 7 Days Refill!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Superfast Bot)',
            rate: 33.79,        // ₱17.7856 + ₱16
            providerRate: 17.7856,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4937',
            isDripFeed: false,
            isRefill: true,
            averageTime: '12 minutes',
            sortOrder: 201,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Bot (Instant, Bot Accounts, Superfast 100k/days, R15)',
            description: 'Superfast Bot Followers! 100k/day delivery. Instant start. 15 Days Refill!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Superfast Bot)',
            rate: 35.92,        // ₱19.9198 + ₱16
            providerRate: 19.9198,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4939',
            isDripFeed: false,
            isRefill: true,
            averageTime: '14 hours 45 minutes',
            sortOrder: 202,
        },
        {
            categoryId: tiktokCat.id,
            providerId: provider.id,
            name: 'TikTok Followers Bot (Instant, Bot Accounts, Superfast 100k/days, R30)',
            description: 'Superfast Bot Followers! 100k/day delivery. Instant start. 30 Days Refill! Best value!',
            platform: 'TIKTOK',
            type: 'TikTok Followers (Superfast Bot)',
            rate: 33.79,        // ₱17.7856 + ₱16
            providerRate: 17.7856,
            minQuantity: 10,
            maxQuantity: 1000000,
            providerServiceId: '4940',
            isDripFeed: false,
            isRefill: true,
            averageTime: '50 hours 6 minutes',
            sortOrder: 203,
        },
    ];

    console.log('📝 Adding services to database...\n');

    for (const service of services) {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.name.substring(0, 50)}...`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        const refillType = service.name.match(/NR|R7|R15|R30/)?.[0] || '';
        console.log(`✅ Added: ${refillType} - ₱${service.rate.toFixed(2)} (kita: ₱16.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng TikTok Followers (Superfast Bot) services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const refillType = s.name.match(/NR|R7|R15|R30/)?.[0] || '';
        const refillLabel = refillType === 'NR' ? 'No Refill' : refillType.replace('R', '') + ' Days Refill';
        console.log(`${refillLabel}: ₱${s.rate.toFixed(2)} (kita: ₱16.00)`);
    });
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
