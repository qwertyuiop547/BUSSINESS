/**
 * Add TikTok Likes Country Targeted R365 Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-tiktok-likes-country-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌍 Adding TikTok Likes Country Targeted R365 services...\n');

    // Get TikTok category
    let tiktokCat = await prisma.category.findUnique({ where: { slug: 'tiktok' } });

    if (!tiktokCat) {
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

    // Base rate for most countries: ₱12.1475, UAE: ₱12.1499
    const baseRate = 12.1475;
    const uaeRate = 12.1499;

    // Countries data
    const countries = [
        { id: '2214', country: 'Mexico', avgTime: '17 minutes', rate: baseRate },
        { id: '2215', country: 'Nigeria', avgTime: '58 minutes', rate: baseRate },
        { id: '2216', country: 'Greece', avgTime: '21 minutes', rate: baseRate },
        { id: '2217', country: 'Romania', avgTime: '1 hour 5 minutes', rate: baseRate },
        { id: '2218', country: 'Bulgaria', avgTime: '1 hour 38 minutes', rate: baseRate },
        { id: '2219', country: 'Hungary', avgTime: '2 hours 19 minutes', rate: baseRate },
        { id: '2220', country: 'Poland', avgTime: 'Not enough data', rate: baseRate },
        { id: '2221', country: 'Pakistan', avgTime: '46 minutes', rate: baseRate },
        { id: '2222', country: 'India', avgTime: '1 hour 17 minutes', rate: baseRate },
        { id: '2223', country: 'Bangladesh', avgTime: '2 hours 41 minutes', rate: baseRate },
        { id: '2246', country: 'Philippines', avgTime: '1 hour 34 minutes', rate: baseRate },
        { id: '2255', country: 'Portugal', avgTime: '2 hours 41 minutes', rate: baseRate },
        { id: '2256', country: 'Georgia', avgTime: '1 hour 26 minutes', rate: baseRate },
        { id: '2257', country: 'Cyprus', avgTime: '47 minutes', rate: baseRate },
        { id: '2258', country: 'Canada', avgTime: '26 minutes', rate: baseRate },
        { id: '2259', country: 'Taiwan', avgTime: '1 hour 43 minutes', rate: baseRate },
        { id: '2260', country: 'Japan', avgTime: '3 hours 8 minutes', rate: baseRate },
        { id: '2261', country: 'UAE', avgTime: '2 hours 41 minutes', rate: uaeRate },
        { id: '2262', country: 'South Korea', avgTime: '4 hours 11 minutes', rate: baseRate },
    ];

    // Generate services
    const services = countries.map((c, index) => ({
        categoryId: tiktokCat.id,
        providerId: provider.id,
        name: `TikTok Likes | ${c.country} (Superinstant, Superfast 20K/Day, High Quality, Max 500K, 365 Days Guaranteed)`,
        description: `${c.country} targeted likes! 365 Days Guarantee. Superfast 20K/Day. High Quality.`,
        platform: 'TIKTOK',
        type: 'TikTok Likes Country Targeted R365',
        rate: parseFloat((c.rate + 16).toFixed(4)),
        providerRate: c.rate,
        minQuantity: 10,
        maxQuantity: 500000,
        providerServiceId: c.id,
        isDripFeed: false,
        isRefill: true,
        averageTime: c.avgTime,
        sortOrder: 280 + index,
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
        const country = service.name.match(/\| (\w+)/)?.[1] || '';
        console.log(`✅ ${country}: ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} TikTok Likes Country Targeted services na-add!`);
    console.log('🌍 Countries: 19');
    console.log('💰 Kita mo: ₱16 bawat service');
    console.log('🔄 Refill: 365 Days Guaranteed');
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
