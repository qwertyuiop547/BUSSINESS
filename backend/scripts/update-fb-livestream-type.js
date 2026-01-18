/**
 * Update Facebook Live Stream Viewers Type
 * 
 * Changes type to "Facebook Live Stream Viewers Cheapest"
 * Run with: node scripts/update-fb-livestream-type.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Updating Facebook Live Stream Viewers type...\n');

    // Update all services with providerServiceId 4906-4914
    const serviceIds = ['4906', '4907', '4908', '4909', '4910', '4911', '4912', '4913', '4914'];

    const result = await prisma.service.updateMany({
        where: {
            providerServiceId: { in: serviceIds }
        },
        data: {
            type: 'Facebook Live Stream Viewers Cheapest'
        }
    });

    console.log(`✅ Na-update ang ${result.count} services!`);
    console.log('📝 Bagong type: "Facebook Live Stream Viewers Cheapest"');

    // Show updated services
    const updatedServices = await prisma.service.findMany({
        where: { providerServiceId: { in: serviceIds } },
        select: { name: true, type: true }
    });

    console.log('\n📋 Updated services:');
    updatedServices.forEach(s => {
        console.log(`   ${s.name} → type: "${s.type}"`);
    });
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
