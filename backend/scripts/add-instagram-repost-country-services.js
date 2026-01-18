/**
 * Add Instagram Repost Country Targeted Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-repost-country-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌍 Adding Instagram Repost Country Targeted services...\n');

    // Get or create Instagram category
    let instagramCat = await prisma.category.findUnique({ where: { slug: 'instagram' } });

    if (!instagramCat) {
        instagramCat = await prisma.category.create({
            data: {
                name: 'Instagram',
                slug: 'instagram',
                description: 'Instagram services',
                sortOrder: 2,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Base rate for all: ₱42.3632
    const baseRate = 42.3632;

    // Countries data
    const countries = [
        { id: '4820', country: 'Worldwide', flag: '🌍', avgTime: '36 minutes' },
        { id: '4821', country: 'Turkey', flag: '🇹🇷', avgTime: '2 hours 41 minutes' },
        { id: '4822', country: 'Brazil', flag: '🇧🇷', avgTime: '17 minutes' },
        { id: '4823', country: 'UK', flag: '🇬🇧', avgTime: '50 minutes' },
        { id: '4824', country: 'Spain', flag: '🇪🇸', avgTime: '17 minutes' },
        { id: '4825', country: 'Germany', flag: '🇩🇪', avgTime: '1 hour 12 minutes' },
        { id: '4826', country: 'USA', flag: '🇺🇸', avgTime: '45 minutes' },
        { id: '4827', country: 'Azerbaijan', flag: '🇦🇿', avgTime: '2 hours 19 minutes' },
        { id: '4828', country: 'France', flag: '🇫🇷', avgTime: '1 hour 42 minutes' },
        { id: '4829', country: 'Italy', flag: '🇮🇹', avgTime: '58 minutes' },
        { id: '4830', country: 'Pakistan', flag: '🇵🇰', avgTime: '1 hour 17 minutes' },
        { id: '4831', country: 'Russia', flag: '🇷🇺', avgTime: '2 hours 41 minutes' },
    ];

    // Generate services
    const services = countries.map((c, index) => ({
        categoryId: instagramCat.id,
        providerId: provider.id,
        name: `Instagram Repost ${c.flag} ${c.country} (100% Real Accounts, Cancel Enable, Max 100K, Instant Start ♻️)`,
        description: `${c.country} targeted reposts! 100% Real Accounts. Cancel enabled. Instant start.`,
        platform: 'INSTAGRAM',
        type: 'Instagram Repost Country Targeted',
        rate: parseFloat((baseRate + 16).toFixed(4)),
        providerRate: baseRate,
        minQuantity: 10,
        maxQuantity: 100000,
        providerServiceId: c.id,
        isDripFeed: false,
        isRefill: false,
        averageTime: c.avgTime,
        sortOrder: 420 + index,
    }));

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        if (existing) {
            console.log(`⚠️  Existing na: ${service.providerServiceId}`);
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        const country = countries.find(c => c.id === service.providerServiceId);
        console.log(`✅ ${country.flag} ${country.country}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Repost Country Targeted services na-add!`);
    console.log('🌍 Countries: 12');
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
