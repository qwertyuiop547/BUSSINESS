/**
 * Update All Facebook Services - Add ₱1 more
 * 
 * Total markup will be ₱13 (was ₱12)
 * Run with: node scripts/update-add-1-peso.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💰 Adding ₱1 more to all Facebook services...\n');

    // Get all services with platform FACEBOOK that have providerServiceId
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
        // Add ₱1 to the current rate
        const newRate = parseFloat(service.rate) + 1;

        await prisma.service.update({
            where: { id: service.id },
            data: { rate: newRate }
        });

        updatedCount++;
    }

    console.log(`✅ Updated ${updatedCount} services!`);
    console.log('\n─────────────────────────────────────────────────');
    console.log('🎉 Tapos na!');
    console.log('💰 Bagong markup: ₱13 bawat service (dati ₱12)');
    console.log('📈 Nadagdagan ang kita mo ng ₱1 per service!');
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
