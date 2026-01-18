/**
 * Update All Facebook Services - Subtract ₱1
 * 
 * Total markup will be ₱16 (was ₱17)
 * Run with: node scripts/update-subtract-1-peso.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💰 Subtracting ₱1 from all Facebook services...\n');

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
        const newRate = parseFloat(service.rate) - 1;

        await prisma.service.update({
            where: { id: service.id },
            data: { rate: newRate }
        });

        updatedCount++;
    }

    console.log(`✅ Updated ${updatedCount} services!`);
    console.log('\n─────────────────────────────────────────────────');
    console.log('🎉 Tapos na!');
    console.log('💰 Bagong markup: ₱16 bawat service!');
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
