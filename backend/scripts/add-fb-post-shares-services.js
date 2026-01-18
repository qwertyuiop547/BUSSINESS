/**
 * Add Facebook Post Shares Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-post-shares-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Adding Facebook Post Shares services...\n');

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
                name: 'FB Post Shares Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Post Shares provider',
            },
        });
    }

    // Facebook Post Shares services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Share [Max 20k] [2-5k/day]',
            description: 'Post Shares para sa Facebook! 2-5k/day delivery. Max 20k per order. Super fast 3 min start!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Shares',
            rate: 53.37,        // ₱45.3711 + ₱8
            providerRate: 45.3711,
            minQuantity: 10,
            maxQuantity: 10000000,
            providerServiceId: '608',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 minutes',
            sortOrder: 180,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Post Share S2 (2 hours start, 5k per day)',
            description: 'Post Shares S2! 2 hours start time. 5k/day delivery. Steady and reliable!',
            platform: 'FACEBOOK',
            type: 'Facebook Post Shares',
            rate: 21.10,        // ₱13.1038 + ₱8
            providerRate: 13.1038,
            minQuantity: 100,
            maxQuantity: 150000,
            providerServiceId: '1914',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 31 minutes',
            sortOrder: 181,
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
        console.log(`✅ Added: ${service.name.substring(0, 40)}... - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Post Shares services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        console.log(`${s.name.substring(0, 35)}... : ₱${s.rate.toFixed(2)} | Min: ${s.minQuantity} | Max: ${s.maxQuantity.toLocaleString()}`);
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
