const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const services = await prisma.service.findMany({
        where: { platform: 'TWITTER' },
        select: { id: true, name: true, type: true, isActive: true }
    });

    console.log('Twitter Services by Type:\n');
    const byType = {};
    services.forEach(s => {
        if (!byType[s.type]) byType[s.type] = [];
        byType[s.type].push(s);
    });

    for (const [type, svcs] of Object.entries(byType)) {
        console.log(`=== ${type} (${svcs.length} services) ===`);
        svcs.forEach(s => console.log(`  - ${s.name.substring(0, 60)}... (active: ${s.isActive})`));
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
