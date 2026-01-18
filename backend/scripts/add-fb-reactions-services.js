/**
 * Add Facebook Post Reactions (Cheapest Asian) Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-reactions-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('😍 Adding Facebook Post Reactions (Cheapest Asian) services...\n');

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
                name: 'FB Reactions Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Reactions provider',
            },
        });
    }

    // Facebook Post Reactions (Cheapest Asian) services (with ₱8 markup)
    // All have same price: ₱6.7832 + ₱8 = ₱14.78
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Like 👍 (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Like 👍 reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4722',
            isDripFeed: false,
            isRefill: false,
            averageTime: '40 minutes',
            sortOrder: 30,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Love ❤️ (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Love ❤️ reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4723',
            isDripFeed: false,
            isRefill: false,
            averageTime: '8 minutes',
            sortOrder: 31,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Care 🤗 (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Care 🤗 reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4724',
            isDripFeed: false,
            isRefill: false,
            averageTime: '9 minutes',
            sortOrder: 32,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Haha 😂 (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Haha 😂 reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4725',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 56 minutes',
            sortOrder: 33,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Wow 😮 (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Wow 😮 reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4726',
            isDripFeed: false,
            isRefill: false,
            averageTime: '4 hours 27 minutes',
            sortOrder: 34,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Sad 😢 (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Sad 😢 reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4727',
            isDripFeed: false,
            isRefill: false,
            averageTime: '11 minutes',
            sortOrder: 35,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Reaction Angry 😠 (Instant, Superfast, Real Asian, No Refill, 10K/Day)',
            description: 'Angry 😠 reaction para sa Facebook post. Superfast, Real Asian accounts. 10K/Day delivery!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Reactions (Cheapest Asian)',
            rate: 14.78,        // ₱6.7832 + ₱8 = ₱14.78
            providerRate: 6.7832,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4728',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 53 minutes',
            sortOrder: 36,
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
        // Extract emoji from name
        const emoji = service.name.match(/👍|❤️|🤗|😂|😮|😢|😠/)?.[0] || '';
        const reactionType = service.name.match(/Like|Love|Care|Haha|Wow|Sad|Angry/)?.[0] || '';
        console.log(`✅ Added: ${reactionType} ${emoji} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Post Reactions services ay na-add na!');
    console.log('\n📊 Summary:');
    console.log('─────────────────────────────────────────────────');
    console.log('Lahat ng reactions: ₱14.78 (kita: ₱8.00 bawat isa)');
    console.log('Min: 10 | Max: 500,000');
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
