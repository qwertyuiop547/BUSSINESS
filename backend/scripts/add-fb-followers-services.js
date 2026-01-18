/**
 * Add Facebook Followers Cheapest Services
 * 
 * Mga presyo may ₱8 markup para sa kita
 * Run with: node scripts/add-fb-followers-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('👥 Adding Facebook Followers Cheapest services...\n');

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
                name: 'FB Followers Provider',
                apiUrl: 'https://api.example.com',
                apiKey: 'your-api-key',
                status: 'ACTIVE',
                balance: 10000,
                description: 'Facebook Followers provider',
            },
        });
    }

    // Facebook Followers Cheapest services (with ₱8 markup)
    const services = [
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers Bot (Instant, Fast 10k/Day, Bot Data, No Refill)',
            description: 'Bot followers para sa Facebook Profile o Page. Fast 10k/Day delivery. Walang refill.',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 17.49,        // ₱9.4929 + ₱8 = ₱17.49
            providerRate: 9.4929,
            minQuantity: 100,
            maxQuantity: 100000,
            providerServiceId: '4899',
            isDripFeed: false,
            isRefill: false,
            averageTime: '6 hours 28 minutes',
            sortOrder: 20,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers Bot (Instant, Fast 10k/Day, Bot Data, 30 Days Refill Button)',
            description: 'Bot followers para sa Facebook Profile o Page. Fast 10k/Day delivery. May 30 days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 17.39,        // ₱9.3921 + ₱8 = ₱17.39
            providerRate: 9.3921,
            minQuantity: 100,
            maxQuantity: 100000,
            providerServiceId: '4900',
            isDripFeed: false,
            isRefill: true,
            averageTime: '8 hours 3 minutes',
            sortOrder: 21,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers REAL (Instant, Fast 10k/Day, Global Real Accounts, No Refill)',
            description: 'REAL followers mula sa Global Real Accounts! Fast 10k/Day. Walang refill.',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 18.67,        // ₱10.6728 + ₱8 = ₱18.67
            providerRate: 10.6728,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4901',
            isDripFeed: false,
            isRefill: false,
            averageTime: '15 hours 7 minutes',
            sortOrder: 22,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers REAL (Instant, Fast 10k/Day, Global Real Accounts, 30 Days Refill Button)',
            description: 'REAL followers mula sa Global Real Accounts! Fast 10k/Day. May 30 days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 19.86,        // ₱11.8587 + ₱8 = ₱19.86
            providerRate: 11.8587,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4902',
            isDripFeed: false,
            isRefill: true,
            averageTime: '56 hours 35 minutes',
            sortOrder: 23,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers REAL (Instant, Fast 10k/Day, Global Real Accounts, 60 Days Refill Button)',
            description: 'REAL followers mula sa Global Real Accounts! Fast 10k/Day. May 60 days refill!',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 20.45,        // ₱12.4516 + ₱8 = ₱20.45
            providerRate: 12.4516,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4903',
            isDripFeed: false,
            isRefill: true,
            averageTime: '56 hours 16 minutes',
            sortOrder: 24,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers REAL (Instant, Fast 10k/Day, Global Real Accounts, 90 Days Refill Button)',
            description: 'REAL followers mula sa Global Real Accounts! Fast 10k/Day. May 90 days refill! Sulit!',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 21.04,        // ₱13.0445 + ₱8 = ₱21.04
            providerRate: 13.0445,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4904',
            isDripFeed: false,
            isRefill: true,
            averageTime: '51 hours 26 minutes',
            sortOrder: 25,
        },
        {
            categoryId: facebookCat.id,
            providerId: provider.id,
            name: 'Facebook Profile/Page Followers REAL (Instant, Fast 10k/Day, Global Real Accounts, 365 Days Refill Button)',
            description: 'REAL followers mula sa Global Real Accounts! Fast 10k/Day. May 1 YEAR refill! Best deal!',
            platform: 'FACEBOOK',
            type: 'Facebook Followers Cheapest',
            rate: 21.64,        // ₱13.6374 + ₱8 = ₱21.64
            providerRate: 13.6374,
            minQuantity: 10,
            maxQuantity: 100000,
            providerServiceId: '4905',
            isDripFeed: false,
            isRefill: true,
            averageTime: '23 hours 50 minutes',
            sortOrder: 26,
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
        console.log(`✅ Added: ${service.name.substring(0, 50)}... - ₱${service.rate.toFixed(2)} (kita: ₱8.00)`);
    }

    console.log('\n🎉 Tapos na! Lahat ng Facebook Followers Cheapest services ay na-add na!');
    console.log('\n📊 Summary ng mga presyo:');
    console.log('─────────────────────────────────────────────────');
    services.forEach(s => {
        const profit = s.rate - s.providerRate;
        const shortName = s.name.includes('Bot') ?
            (s.name.includes('No Refill') ? 'Bot (No Refill)' : 'Bot (30 Days Refill)') :
            s.name.match(/(\d+ Days|365 Days|No) Refill/)?.[0] || s.name;
        console.log(`${shortName}: ₱${s.rate.toFixed(2)} (kita: ₱${profit.toFixed(2)})`);
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
