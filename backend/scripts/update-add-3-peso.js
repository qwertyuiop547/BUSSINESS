/**
 * Update All Facebook Services - Add ₱3 more
 * 
 * Total markup will be ₱17 (was ₱14)
 * Run with: node scripts/update-add-3-peso.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💰 Adding ₱3 more to all Facebook services...\n');

    const services = await prisma.service.findMany({
        where: {
            platform: 'FACEBOOK',
            providerServiceId: { not: null },
            NOT: {
                providerServiceId: {
                    in: ['fb_page_likes', 'fb_post_likes', 'ig_followers_hq', 'ig_likes_real', 'ig_views_video', 'ig_comments_custom']
                }
            }
        }
    });

    console.log(`📋 Found ${services.length} services to update\n`);

    let updatedCount = 0;

    for (const service of services) {
        const newRate = parseFloat(service.rate) + 3;

        await prisma.service.update({
            where: { id: service.id },
            data: { rate: newRate }
        });

        updatedCount++;
    }

    console.log(`✅ Updated ${updatedCount} services!`);
    console.log('\n─────────────────────────────────────────────────');
    console.log('🎉 Tapos na!');
    console.log('💰 Bagong markup: ₱17 bawat service!');
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
