/**
 * Update Twitter/X Views services type to "Views Monetization"
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Updating Twitter/X Views services type...\n');

    // Find all Twitter services with Views-related types or names
    const viewsServices = await prisma.service.findMany({
        where: {
            platform: 'TWITTER',
            OR: [
                { type: { contains: 'Views' } },
                { name: { contains: 'Views' } },
                { name: { contains: 'Impressions' } },
            ]
        }
    });

    console.log(`Found ${viewsServices.length} Twitter/X Views services to update\n`);

    let count = 0;
    for (const service of viewsServices) {
        await prisma.service.update({
            where: { id: service.id },
            data: { type: 'Views Monetization' }
        });
        console.log(`✅ Updated: ${service.name.substring(0, 60)}...`);
        count++;
    }

    console.log('\n─────────────────────────────────────────────────');
    console.log(`🎉 Tapos na! ${count} services updated to "Views Monetization" type`);
    console.log('─────────────────────────────────────────────────');
}

main()
    .catch((e) => console.error('Error:', e))
    .finally(() => prisma.$disconnect());
