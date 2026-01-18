/**
 * Add Facebook Page Likes + Followers Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-page-likes-followers-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👍 Adding Facebook Page Likes + Followers services...\n');

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
                name: 'FB Page Likes Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Page Likes + Followers provider',
            },
        });
    }

    // Facebook Page Likes + Followers services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes + Followers E3 (Instant Start, HQ Accounts, Max 500K, 100K/Day Low Drop, No Refill)',
            description: 'Page Likes + Followers combo! HQ Accounts, 100K/Day delivery. Low drop. Walang refill.',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes + Followers',
            rate: 25.79,        // ₱17.788 + ₱8 = ₱25.79
            providerRate: 17.788,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4543',
            isDripFeed: false,
            isRefill: false,
            averageTime: '45 hours 42 minutes',
            sortOrder: 40,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes + Followers E3 (Instant Start, HQ Accounts, Max 500K, 100K/Day Low Drop, Lifetime Refill)',
            description: 'Page Likes + Followers combo! HQ Accounts, 100K/Day delivery. LIFETIME REFILL! Best value!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes + Followers',
            rate: 29.35,        // ₱21.3455 + ₱8 = ₱29.35
            providerRate: 21.3455,
            minQuantity: 100,
            maxQuantity: 10000,
            providerServiceId: '4540',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 35 minutes',
            sortOrder: 41,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes + Followers E3 (Instant Start, HQ Accounts, Max 500K, 100K/Day Low Drop, 30 Days Refill)',
            description: 'Page Likes + Followers combo! HQ Accounts, 100K/Day delivery. May 30 days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes + Followers',
            rate: 29.35,        // ₱21.3455 + ₱8 = ₱29.35
            providerRate: 21.3455,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4544',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 26 minutes',
            sortOrder: 42,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes + Followers E3 (Instant Start, HQ Accounts, Max 500K, 100K/Day Low Drop, 60 Days Refill)',
            description: 'Page Likes + Followers combo! HQ Accounts, 100K/Day delivery. May 60 days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes + Followers',
            rate: 30.06,        // ₱22.057 + ₱8 = ₱30.06
            providerRate: 22.057,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4545',
            isDripFeed: false,
            isRefill: true,
            averageTime: '1 hour 20 minutes',
            sortOrder: 43,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes + Followers E3 (Instant Start, HQ Accounts, Max 500K, 100K/Day Low Drop, 90 Days Refill)',
            description: 'Page Likes + Followers combo! HQ Accounts, 100K/Day delivery. May 90 days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes + Followers',
            rate: 30.77,        // ₱22.7686 + ₱8 = ₱30.77
            providerRate: 22.7686,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4546',
            isDripFeed: false,
            isRefill: true,
            averageTime: '2 hours 17 minutes',
            sortOrder: 44,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Page Likes + Followers E3 (Instant Start, HQ Accounts, Max 500K, 100K/Day Low Drop, 365 Days Refill)',
            description: 'Page Likes + Followers combo! HQ Accounts, 100K/Day delivery. May 1 YEAR refill! Sulit!',
            platform: 'FACEBOOK',
            type: 'Facebook Page Likes + Followers',
            rate: 31.48,        // ₱23.4801 + ₱8 = ₱31.48
            providerRate: 23.4801,
            minQuantity: 10,
            maxQuantity: 500000,
            providerServiceId: '4547',
            isDripFeed: false,
            isRefill: true,
            averageTime: '21 hours 28 minutes',
            sortOrder: 45,
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
        // Extract refill type
        const refillType = service.name.match(/(No Refill|Lifetime Refill|\d+ Days Refill)/)?.[0] || '';
        console.log(`✅ Added: ${refillType} - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Page Likes + Followers services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const refillType = s.name.match(/(No Refill|Lifetime Refill|\d+ Days Refill)/)?.[0] || '';
        console.log(`${refillType}: ₱${s.rate.toFixed(2)} (kita: ₱8.00)`);
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
