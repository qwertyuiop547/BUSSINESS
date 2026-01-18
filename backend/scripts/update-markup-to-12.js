/**
 * Update All Facebook Services - Change markup from ₱8 to ₱12
 * 
 * Adds ₱4 more to all services we added (total markup: ₱12)
 * Run with: node scripts/update-markup-to-12.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('💰 Updating all Facebook services - Markup from ₱8 to ₱12...\n');

    // Get all services with platform FACEBOOK that have providerServiceId
    // (these are the ones we added)
    const services = await prisma.service.findMany({
        where: {
            platform: 'FACEBOOK',
            providerServiceId: { not: null },
            // Exclude the original seed services
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
        // Add ₱4 to the current rate (since we already added ₱8)
        const newRate = parseFloat(service.rate) + 4;

        await prisma.service.update({
            where: { id: service.id },
            data: { rate: newRate }
        });

        updatedCount++;
        console.log(`✅ Updated: ${service.name.substring(0, 50)}... - ₱${parseFloat(service.rate).toFixed(2)} → ₱${newRate.toFixed(2)}`);
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${updatedCount} services updated!`);
    console.log('💰 Bagong markup: ₱12 bawat service (dati ₱8)');
    console.log('📈 Nadagdagan ang kita mo ng ₱4 per service!');
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
