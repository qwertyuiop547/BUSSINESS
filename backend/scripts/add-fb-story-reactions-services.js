/**
 * Add Facebook Story Reactions Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-story-reactions-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📖 Adding Facebook Story Reactions services...\n');

    // Get Facebook category
    let facebookCat = await prisma.category.findUnique({ where: { slug: 'facebook' } });

    if (!facebookCat) {
        console.log('📁 Creating Facebook category...');
        facebookCat = await prisma.category.create({
            data: {
                name: 'Facebook',
                slug: 'facebook',
                description: 'Facebook services',
                sortOrder: 2,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    if (!provider) {
        console.log('🔗 Creating provider...');
        provider = await prisma.provider.create({
            data: {
                name: 'FB Story Reactions Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Story Reactions provider',
            },
        });
    }

    // Facebook Story Reactions services (with ₱8 markup)
    const services = [
        // Cheap tier - ₱0.1779 + ₱8 = ₱8.18 (Min 100, Max 1,000,000)
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | 👍',
            description: 'Like 👍 reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4524',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 60,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | ❤️',
            description: 'Love ❤️ reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4525',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 61,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | 😂',
            description: 'Haha 😂 reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4526',
            isDripFeed: false,
            isRefill: false,
            averageTime: '13 hours 40 minutes',
            sortOrder: 62,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | 🤗',
            description: 'Care 🤗 reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4527',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 63,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | 😮',
            description: 'Wow 😮 reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4528',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 64,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | 😠',
            description: 'Angry 😠 reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4529',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 65,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reactions | 😢',
            description: 'Sad 😢 reaction para sa Facebook Story. Super cheap! High volume available.',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 8.18,
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '4530',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 66,
        },

        // Premium tier - ₱29.528 + ₱8 = ₱37.53 (Min 10, Max 50,000)
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | 👍',
            description: 'Like 👍 reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4531',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 67,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | ❤️',
            description: 'Love ❤️ reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4532',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 68,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | 😂',
            description: 'Haha 😂 reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4533',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 69,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | 🤗',
            description: 'Care 🤗 reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4534',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 70,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | 😮',
            description: 'Wow 😮 reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4535',
            isDripFeed: false,
            isRefill: false,
            averageTime: '58 minutes',
            sortOrder: 71,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | 😠',
            description: 'Angry 😠 reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4536',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 72,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | 😢',
            description: 'Sad 😢 reaction para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4537',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 73,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | Mix 👍❤️',
            description: 'Mix reactions (Like + Love) para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4538',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 74,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | Mix 👍❤️😮',
            description: 'Mix reactions (Like + Love + Wow) para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4539',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 75,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | Mix 👍❤️🤗😠',
            description: 'Mix reactions (Like + Love + Care + Angry) para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4540-story',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 76,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | Mix 👍❤️🤗😠😢',
            description: 'Mix reactions (5 emojis) para sa Facebook Story. Premium quality!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4541',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 77,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Story Reaction | Mix 👍❤️🤗😠😢😮',
            description: 'Mix reactions (All 6 emojis) para sa Facebook Story. Premium quality! Best value!',
            platform: 'FACEBOOK',
            type: 'Facebook Story Reactions',
            rate: 37.53,
            providerRate: 29.528,
            minQuantity: 10,
            maxQuantity: 50000,
            providerServiceId: '4542',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 78,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let cheapCount = 0;
    let premiumCount = 0;

    for (const service of services) {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.name}`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });

        if (service.rate < 10) {
            cheapCount++;
            console.log(`✅ Added (Cheap): ${service.name} - ₱${service.rate.toFixed(2)}`);
        } else {
            premiumCount++;
            console.log(`✅ Added (Premium): ${service.name} - ₱${service.rate.toFixed(2)}`);
        }
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Story Reactions services ay na-add na!');
    console.log('\n📊 Summary:');
    console.log('─────────────────────────────────────────────────');
    console.log(`Cheap tier (₱8.18): ${cheapCount} services - Min 100, Max 1M`);
    console.log(`Premium tier (₱37.53): ${premiumCount} services - Min 10, Max 50K`);
    console.log('Kita mo: ₱8 bawat order!');
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
