/**
 * Add Instagram Post-Story-Profile Share with Direct Message Services
 * 
 * Mga presyo may ₱16 markup para sa kita
 * Run with: node scripts/add-instagram-share-dm-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📤 Adding Instagram Post-Story-Profile Share with Direct Message services...\n');

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

    // Instagram Share with Direct Message services (with ₱16 markup)
    const services = [
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - User Followers',
            description: 'Share Post/Story/Profile with Direct Message! Targets user followers. High engagement!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 105.847,        // Final rate with markup
            providerRate: 89.847,   // ₱105.847 - ₱16
            minQuantity: 5000,
            maxQuantity: 1000001,
            providerServiceId: '3591',
            isDripFeed: false,
            isRefill: false,
            averageTime: '14 hours 37 minutes',
            sortOrder: 550,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - Custom list',
            description: 'Share Post/Story/Profile with Direct Message! Custom target list. Highly targeted!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 141.1293,       // Final rate with markup
            providerRate: 125.1293,  // ₱141.1293 - ₱16
            minQuantity: 1000,
            maxQuantity: 1000001,
            providerServiceId: '3592',
            isDripFeed: false,
            isRefill: false,
            averageTime: '21 minutes',
            sortOrder: 551,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - Media Liker',
            description: 'Share Post/Story/Profile with Direct Message! Targets media likers. Great engagement!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 105.847,        // Final rate with markup
            providerRate: 89.847,   // ₱105.847 - ₱16
            minQuantity: 5000,
            maxQuantity: 1000001,
            providerServiceId: '3593',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 5 minutes',
            sortOrder: 552,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - Media Comments',
            description: 'Share Post/Story/Profile with Direct Message! Targets media commenters. High quality!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 105.847,        // Final rate with markup
            providerRate: 89.847,   // ₱105.847 - ₱16
            minQuantity: 5000,
            maxQuantity: 1000001,
            providerServiceId: '3594',
            isDripFeed: false,
            isRefill: false,
            averageTime: '1 hour 38 minutes',
            sortOrder: 553,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - Multi Hashtag Likers',
            description: 'Share Post/Story/Profile with Direct Message! Targets multi hashtag likers. Wide reach!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 105.847,        // Final rate with markup
            providerRate: 89.847,   // ₱105.847 - ₱16
            minQuantity: 5000,
            maxQuantity: 1000001,
            providerServiceId: '3595',
            isDripFeed: false,
            isRefill: false,
            averageTime: '15 hours 9 minutes',
            sortOrder: 554,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - Multi Hashtag comments',
            description: 'Share Post/Story/Profile with Direct Message! Targets multi hashtag commenters. Targeted engagement!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 105.847,        // Final rate with markup
            providerRate: 89.847,   // ₱105.847 - ₱16
            minQuantity: 5000,
            maxQuantity: 1000001,
            providerServiceId: '3596',
            isDripFeed: false,
            isRefill: false,
            averageTime: '2 hours',  // Estimated (not enough data provided)
            sortOrder: 555,
        },
        {
            categoryId: instagramCat.id,
            providerId: provider.id,
            name: 'Instagram Post-Story-Profile Share with Direct Message - Multi Hashtag (Those who made the publication)',
            description: 'Share Post/Story/Profile with Direct Message! Targets those who made the publication. Premium targeting!',
            platform: 'INSTAGRAM',
            type: 'Instagram Post-Story-Profile Share with Direct Message',
            rate: 105.847,        // Final rate with markup
            providerRate: 89.847,   // ₱105.847 - ₱16
            minQuantity: 5000,
            maxQuantity: 1000001,
            providerServiceId: '3597',
            isDripFeed: false,
            isRefill: false,
            averageTime: '46 minutes',
            sortOrder: 556,
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
    console.log(`🎉 Tapos na! ${count} Instagram Share with Direct Message services na-add!`);
    console.log('📤 Feature: Post-Story-Profile Share with DM');
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
