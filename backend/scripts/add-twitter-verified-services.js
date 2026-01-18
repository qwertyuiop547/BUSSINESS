/**
 * Add Twitter X.com Verified Account Services
 * 100% Verified Blue Tick Real Accounts
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Profit margin: ₱16 per 1000
const PROFIT_MARGIN = 16;

// Twitter Verified Account Services from provider
const twitterVerifiedServices = [
    {
        providerServiceId: '4875',
        name: 'Twitter X.com Verified Followers (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '2 hours 19 minutes',
        type: 'Followers',
    },
    {
        providerServiceId: '4876',
        name: 'Twitter X.com Verified Likes (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: 'Not enough data',
        type: 'Likes',
    },
    {
        providerServiceId: '4877',
        name: 'Twitter X.com Verified Retweets (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '46 minutes',
        type: 'Retweets',
    },
    {
        providerServiceId: '4878',
        name: 'Twitter X.com Verified Custom Comments (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '1 hour 17 minutes',
        type: 'Comments',
    },
    {
        providerServiceId: '4879',
        name: 'Twitter X.com Verified Comments Reply (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '2 hours 41 minutes',
        type: 'Comments',
    },
    {
        providerServiceId: '4880',
        name: 'Twitter X.com Verified Comment Likes (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '1 hour 26 minutes',
        type: 'Likes',
    },
    {
        providerServiceId: '4881',
        name: 'Twitter X.com Verified Saves (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '47 minutes',
        type: 'Saves',
    },
    {
        providerServiceId: '4882',
        name: 'Twitter X.com Verified Shares (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '26 minutes',
        type: 'Shares',
    },
    {
        providerServiceId: '4883',
        name: 'Twitter X.com Verified Space Listeners (100% Verified Blue Tick Real Accounts, Drop 0%, NR, Start 0-6 Hours, Max 100)',
        providerRate: 5710.159,
        minQuantity: 5,
        maxQuantity: 100,
        averageTime: '1 hour 43 minutes',
        type: 'Listeners',
    },
];

async function main() {
    console.log('🐦 Adding Twitter Verified Account Services...\n');

    // Find Twitter / X category
    const twitterCategory = await prisma.category.findFirst({
        where: { slug: 'twitter-x' }
    });

    if (!twitterCategory) {
        console.error('❌ Twitter / X category not found!');
        process.exit(1);
    }

    console.log(`📁 Using category: ${twitterCategory.name} (${twitterCategory.id})\n`);

    // Find provider (if exists)
    const provider = await prisma.provider.findFirst({
        where: { status: 'ACTIVE' }
    });

    let addedCount = 0;
    let skippedCount = 0;

    for (const service of twitterVerifiedServices) {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
            where: {
                providerServiceId: service.providerServiceId,
                categoryId: twitterCategory.id,
            }
        });

        if (existing) {
            console.log(`⏭️  Skipped (exists): ${service.name.substring(0, 50)}...`);
            skippedCount++;
            continue;
        }

        // Calculate selling rate (provider rate + profit margin)
        const sellingRate = service.providerRate + PROFIT_MARGIN;

        // Create service
        await prisma.service.create({
            data: {
                categoryId: twitterCategory.id,
                providerId: provider?.id || null,
                name: service.name,
                description: `100% Verified Blue Tick Real Accounts - ${service.averageTime} average delivery`,
                platform: 'TWITTER',
                type: service.type,
                rate: sellingRate,
                minQuantity: service.minQuantity,
                maxQuantity: service.maxQuantity,
                providerServiceId: service.providerServiceId,
                providerRate: service.providerRate,
                isActive: true,
                isDripFeed: false,
                isRefill: false,
                averageTime: service.averageTime,
                sortOrder: parseInt(service.providerServiceId),
            }
        });

        console.log(`✅ Added: ${service.name.substring(0, 60)}...`);
        console.log(`   Type: ${service.type} | Rate: ₱${sellingRate.toFixed(2)}/1000 | Min: ${service.minQuantity} | Max: ${service.maxQuantity}`);
        addedCount++;
    }

    console.log('\n========================================');
    console.log(`✅ Added: ${addedCount} services`);
    console.log(`⏭️  Skipped: ${skippedCount} services`);
    console.log('========================================\n');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
