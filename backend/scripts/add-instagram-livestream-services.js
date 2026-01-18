/**
 * Add Instagram Live Stream Views + Likes Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-livestream-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🎥 Adding Instagram Live Stream Views + Likes services...\n');

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

    // Instagram Live Stream Views + Likes services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Live Stream Likes S2 (Instant, 10K/Hour, NoRefill)',
            description: 'Live Stream Likes! Instant start. 10K/Hour speed. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 10.6737,        // Final rate with markup
            providerRate: -5.3263,  // ₱10.6737 - ₱16 (negative means very low cost base)
            minQuantity: 100,
            maxQuantity: 20000,
            providerServiceId: '3649',
            isDripFeed: false,
            isRefill: false,
            averageTime: '5 minutes',
            sortOrder: 510,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Live Stream Likes (Instant, hq, Fast, NoRefill)',
            description: 'High Quality Live Stream Likes! Instant start. Fast delivery. No Refill.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 11.8597,        // Final rate with markup
            providerRate: -4.1403,  // ₱11.8597 - ₱16
            minQuantity: 100,
            maxQuantity: 50000,
            providerServiceId: '3648',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 511,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [15 Minutes]',
            description: 'Livestream Views + Likes for 15 minutes! Fast delivery. High quality!',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 41.1766,        // Final rate with markup
            providerRate: 25.1766,  // ₱41.1766 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3638',
            isDripFeed: false,
            isRefill: false,
            averageTime: '14 minutes',
            sortOrder: 512,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [30 Minutes]',
            description: 'Livestream Views + Likes for 30 minutes! Perfect for short streams.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 82.3531,        // Final rate with markup
            providerRate: 66.3531,  // ₱82.3531 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3639',
            isDripFeed: false,
            isRefill: false,
            averageTime: '15 minutes',
            sortOrder: 513,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Live Video Views (30 minute+)',
            description: 'Live Video Views for 30+ minutes! High quality views for your live videos.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 83.1655,        // Final rate with markup
            providerRate: 67.1655,  // ₱83.1655 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '154',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 514,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [60 Minutes]',
            description: 'Livestream Views + Likes for 1 hour! Great for events and longer streams.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 164.7062,       // Final rate with markup
            providerRate: 148.7062,  // ₱164.7062 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3640',
            isDripFeed: false,
            isRefill: false,
            averageTime: '16 minutes',
            sortOrder: 515,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [90 Minutes]',
            description: 'Livestream Views + Likes for 1.5 hours! Perfect for extended broadcasts.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 247.0593,       // Final rate with markup
            providerRate: 231.0593,  // ₱247.0593 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3641',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 516,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [120 Minutes]',
            description: 'Livestream Views + Likes for 2 hours! Ideal for longer content sessions.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 329.4124,       // Final rate with markup
            providerRate: 313.4124,  // ₱329.4124 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3642',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 517,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Live Video Views+Likes+Comments (30 minute)',
            description: 'Live Video Views + Likes + Comments for 30 minutes! Complete engagement package!',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 437.6194,       // Final rate with markup
            providerRate: 421.6194,  // ₱437.6194 - ₱16
            minQuantity: 20,
            maxQuantity: 30000,
            providerServiceId: '1064',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 518,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [180 Minutes]',
            description: 'Livestream Views + Likes for 3 hours! Best for marathon streams.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 494.1185,       // Final rate with markup
            providerRate: 478.1185,  // ₱494.1185 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3643',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 19 minutes',
            sortOrder: 519,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [240 Minutes]',
            description: 'Livestream Views + Likes for 4 hours! Extended stream support.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 658.8247,       // Final rate with markup
            providerRate: 642.8247,  // ₱658.8247 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3644',
            isDripFeed: false,
            isRefill: false,
            averageTime: '7 minutes',
            sortOrder: 520,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [360 Minutes]',
            description: 'Livestream Views + Likes for 6 hours! Perfect for all-day events.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 988.237,        // Final rate with markup
            providerRate: 972.237,   // ₱988.237 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3645',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 521,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [720 Minutes]',
            description: 'Livestream Views + Likes for 12 hours! Ultimate stream package.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 1976.4739,      // Final rate with markup
            providerRate: 1960.4739,  // ₱1976.4739 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3646',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 522,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Livestream Views + Likes [1440 Minutes]',
            description: 'Livestream Views + Likes for 24 hours! Maximum duration package.',
            platform: 'INSTAGRAM',
            type: 'Instagram Live Stream Views + Likes',
            rate: 3952.9477,      // Final rate with markup
            providerRate: 3936.9477,  // ₱3952.9477 - ₱16
            minQuantity: 10,
            maxQuantity: 30000,
            providerServiceId: '3647',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 523,
        },
    ];

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
        console.log(`✅ ID ${service.providerServiceId}: ₱${service.rate.toFixed(4)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Instagram Live Stream Views + Likes services na-add!`);
    console.log('🎥 Feature: Live Stream Views + Likes');
    console.log('📸 Platform: Instagram');
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
