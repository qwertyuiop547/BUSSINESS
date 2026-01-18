/**
 * Add Twitter (X.com) Impressions Country Targeted Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-twitter-impressions-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🐦 Adding Twitter (X.com) Impressions Country Targeted services...\n');

    // Get Twitter / X category
    let twitterCat = await prisma.category.findFirst({ 
        where: { 
            OR: [
                { name: { contains: 'Twitter' } },
                { slug: { contains: 'twitter' } }
            ]
        } 
    });

    if (!twitterCat) {
        console.log('📁 Creating Twitter / X category...');
        twitterCat = await prisma.category.create({
            data: {
                name: 'Twitter / X',
                slug: 'twitter-x',
                description: 'Twitter / X services',
                sortOrder: 4,
            },
        });
    }

    // Get provider
    let provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });

    // Twitter Impressions Country Targeted services (with ₱16 markup)
    const services = [
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Mix 9 Country (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'Mix 9 Country Impressions! Instant start. 10M/day speed. Max 100M.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 20.10,        // ₱4.0952 + ₱16
            providerRate: 4.0952,
            minQuantity: 100,
            maxQuantity: 100000000,
            providerServiceId: '4077',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 minutes',
            sortOrder: 450,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Korea (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'Korean Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4078',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 17 minutes',
            sortOrder: 451,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Italy (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'Italian Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4079',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 452,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Russia (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'Russian Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4080',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 26 minutes',
            sortOrder: 453,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions India (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'Indian Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4081',
            isDripFeed: false,
            isRefill: false,
            averageTime: '47 minutes',
            sortOrder: 454,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Brazil (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'Brazilian Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4082',
            isDripFeed: false,
            isRefill: false,
            averageTime: '26 minutes',
            sortOrder: 455,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Germany (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'German Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4083',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 43 minutes',
            sortOrder: 456,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions USA (Max 100M, Instant -15 minutes, 10 Million per day)',
            description: 'USA Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4084',
            isDripFeed: false,
            isRefill: false,
            averageTime: '3 hours 8 minutes',
            sortOrder: 457,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions UK (Max 50M, Instant -15 minutes, 10 Million per day)',
            description: 'UK Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4085',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours 41 minutes',
            sortOrder: 458,
        },
        {
            categoryId: twitterCat.id,
            providerId: provider.id,
            name: 'Twitter (X.com) Impressions Arab (Max 50M, Instant -15 minutes, 10 Million per day)',
            description: 'Arab Impressions! Instant start. 10M/day speed.',
            platform: 'TWITTER',
            type: 'Twitter Impressions Country Targeted',
            rate: 22.83,        // ₱6.8252 + ₱16
            providerRate: 6.8252,
            minQuantity: 100,
            maxQuantity: 50000000,
            providerServiceId: '4086',
            isDripFeed: false,
            isRefill: false,
            averageTime: '17 minutes',
            sortOrder: 459,
        },
    ];

    console.log('📝 Adding services to database...\n');

    let count = 0;
    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: service.providerServiceId }
        });

        // Extract country name
        const countryMatch = service.name.match(/Impressions\s+(\w+)/);
        const country = countryMatch ? countryMatch[1] : 'Unknown';

        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: {
                    name: service.name,
                    description: service.description,
                    rate: service.rate,
                    providerRate: service.providerRate,
                    minQuantity: service.minQuantity,
                    maxQuantity: service.maxQuantity,
                    averageTime: service.averageTime,
                    isRefill: service.isRefill,
                    type: service.type,
                }
            });
            console.log(`🔄 Updated: ID ${service.providerServiceId} - ${country} - ₱${service.rate.toFixed(2)}`);
            count++;
            continue;
        }

        await prisma.service.create({
            data: service,
        });
        count++;
        console.log(`✅ Added: ID ${service.providerServiceId} - ${country} - ₱${service.rate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} Twitter Impressions Country Targeted services na-add!`);
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
