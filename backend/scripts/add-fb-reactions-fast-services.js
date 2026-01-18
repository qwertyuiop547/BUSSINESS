/**
 * Add Facebook Post Reactions/Likes (Fast 50k per day) Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-reactions-fast-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👍 Adding Facebook Post Reactions/Likes (Fast 50k/day) services...\n');

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
                name: 'FB Reactions Fast Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Reactions Fast provider',
            },
        });
    }

    // Facebook Post Reactions/Likes (Fast 50k per day) services (with ₱8 markup)
    // All have same price: ₱5.9056 + ₱8 = ₱13.91
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Likes 👍 (Instant, Fast 50k per day)',
            description: 'Like 👍 reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1118',
            isDripFeed: false,
            isRefill: false,
            averageTime: '5 hours 40 minutes',
            sortOrder: 50,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Wow 😮 (Instant, Fast 50k per day)',
            description: 'Wow 😮 reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1119',
            isDripFeed: false,
            isRefill: false,
            averageTime: '43 hours 55 minutes',
            sortOrder: 51,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Haha 😂 (Instant, Fast 50k per day)',
            description: 'Haha 😂 reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1120',
            isDripFeed: false,
            isRefill: false,
            averageTime: '5 hours 28 minutes',
            sortOrder: 52,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Angry 😠 (Instant, Fast 50k per day)',
            description: 'Angry 😠 reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1121',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 53,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Care 🤗 (Instant, Fast 50k per day)',
            description: 'Care 🤗 reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1122',
            isDripFeed: false,
            isRefill: false,
            averageTime: '18 minutes',
            sortOrder: 54,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Love ❤️ (Instant, Fast 50k per day)',
            description: 'Love ❤️ reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1123',
            isDripFeed: false,
            isRefill: false,
            averageTime: '14 minutes',
            sortOrder: 55,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Sad 😢 (Instant, Fast 50k per day)',
            description: 'Sad 😢 reaction para sa Facebook post. Super fast 50K/Day delivery! Instant start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions/Likes',
            rate: 13.91,        // ₱5.9056 + ₱8 = ₱13.91
            providerRate: 5.9056,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '1124',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 56,
        },
    ];

    console.log('📝 Adding services to database...\n');

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
        // Extract emoji and reaction type
        const emoji = service.name.match(/👍|❤️|🤗|😂|😮|😢|😠/)?.[0] || '';
        const reactionType = service.name.match(/Likes|Love|Care|Haha|Wow|Sad|Angry/)?.[0] || '';
        console.log(`✅ Added: ${reactionType} ${emoji} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Post Reactions/Likes (Fast 50k/day) services ay na-add na!');
    console.log('\n📊 Summary:');
    console.log('─────────────────────────────────────────────────');
    console.log('Lahat ng reactions: ₱13.91 (kita: ₱8.00 bawat isa)');
    console.log('Min: 10 | Max: 500,000 | Speed: 50K/Day');
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
