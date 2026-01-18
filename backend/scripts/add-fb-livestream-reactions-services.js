/**
 * Add Facebook Live Stream Reactions/Comments Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-livestream-reactions-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎥 Adding Facebook Live Stream Reactions/Comments services...\n');

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
                name: 'FB Live Reactions Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Live Stream Reactions provider',
            },
        });
    }

    // Facebook Live Stream Reactions/Comments services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Share (Start: 5 mins, Speed: 10k, Drop: No)',
            description: 'Live Stream Shares! 5 mins start time. 10k speed. No drop guarantee. Super cheap!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 8.18,         // ₱0.1779 + ₱8
            providerRate: 0.1779,
            minQuantity: 100,
            maxQuantity: 1000000,
            providerServiceId: '2913',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 130,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Video Like 👍 (Start time: 1 Min, Speed: 1k/Hour)',
            description: 'Like 👍 reactions sa Live Stream Video! 1 min start. 1k/Hour speed.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 77.53,        // ₱69.527 + ₱8
            providerRate: 69.527,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2904',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 131,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Video Love ❤️ (Start time: 1 Min, Speed: 1k/Hour)',
            description: 'Love ❤️ reactions sa Live Stream Video! 1 min start. 1k/Hour speed.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 77.53,        // ₱69.527 + ₱8
            providerRate: 69.527,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2905',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 132,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Video WoW 😮 (Start time: 1 Min, Speed: 1k/Hour)',
            description: 'WoW 😮 reactions sa Live Stream Video! 1 min start. 1k/Hour speed.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 77.53,        // ₱69.527 + ₱8
            providerRate: 69.527,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2906',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 133,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Video SAD 😢 (Start time: 1 Min, Speed: 1k/Hour)',
            description: 'SAD 😢 reactions sa Live Stream Video! 1 min start. 1k/Hour speed.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 77.53,        // ₱69.527 + ₱8
            providerRate: 69.527,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2907',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 134,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Video Angry 😠 (Start time: 1 Min, Speed: 1k/Hour)',
            description: 'Angry 😠 reactions sa Live Stream Video! 1 min start. 1k/Hour speed.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 77.53,        // ₱69.527 + ₱8
            providerRate: 69.527,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2908',
            isDripFeed: false,
            isRefill: false,
            averageTime: 'Not enough data',
            sortOrder: 135,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live Stream Video Care 🤗 (Start time: 1 Min, Speed: 1k/Hour)',
            description: 'Care 🤗 reactions sa Live Stream Video! 1 min start. 1k/Hour speed.',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 77.53,        // ₱69.527 + ₱8
            providerRate: 69.527,
            minQuantity: 50,
            maxQuantity: 1000000,
            providerServiceId: '2909',
            isDripFeed: false,
            isRefill: false,
            averageTime: '48 minutes',
            sortOrder: 136,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Live-Stream Random (Non Drop, Instant, Real Worldwide User)',
            description: 'Random Live-Stream engagement! Non Drop. Instant start. Real Worldwide Users!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 737.30,       // ₱729.3041 + ₱8
            providerRate: 729.3041,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '2912',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 137,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'YouTube Social Shares from Facebook (Lifetime Refill, Instant Start, Superfast 100k/Day)',
            description: 'YouTube shares via Facebook! Lifetime Refill. Instant start. 100k/Day speed!',
            platform: 'FACEBOOK',
            type: 'Facebook Live Stream Reactions/Comments',
            rate: 18.08,        // ₱10.0799 + ₱8
            providerRate: 10.0799,
            minQuantity: 50,
            maxQuantity: 500000000,
            providerServiceId: '2555',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 minute',
            sortOrder: 138,
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
        // Extract service type
        const emoji = service.name.match(/👍|❤️|🤗|😂|😮|😢|😠/)?.[0] || '';
        const serviceType = service.name.match(/Share|Like|Love|WoW|SAD|Angry|Care|Random|YouTube/)?.[0] || 'Service';
        console.log(`✅ Added: ${serviceType} ${emoji} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Live Stream Reactions/Comments services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const emoji = s.name.match(/👍|❤️|🤗|😂|😮|😢|😠/)?.[0] || '';
        const serviceType = s.name.match(/Share|Like|Love|WoW|SAD|Angry|Care|Random|YouTube/)?.[0] || 'Service';
        console.log(`${serviceType} ${emoji}: ₱${s.rate.toFixed(2)} | Min: ${s.minQuantity} | Max: ${s.maxQuantity.toLocaleString()}`);
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
