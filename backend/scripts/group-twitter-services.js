const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Grouping Twitter Verified services together...\n');

    // Update all Twitter Verified services to have the same type
    const result = await prisma.service.updateMany({
        where: {
            platform: 'TWITTER',
            name: { contains: 'Verified' }
        },
        data: {
            type: 'Verified Account'
        }
    });

    console.log(`✅ Updated ${result.count} services to type "Verified Account"`);

    // Verify the changes
    const services = await prisma.service.findMany({
        where: { platform: 'TWITTER' },
        select: { name: true, type: true }
    });

    // Group by type
    const byType = {};
    services.forEach(s => {
        if (!byType[s.type]) byType[s.type] = 0;
        byType[s.type]++;
    });

    console.log('\nTwitter services by type:');
    for (const [type, count] of Object.entries(byType)) {
        console.log(`  ${type}: ${count} services`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
