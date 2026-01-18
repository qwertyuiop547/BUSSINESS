const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Get all Twitter platform services with isActive status
    const services = await prisma.service.findMany({
        where: { platform: 'TWITTER' },
        select: { id: true, name: true, type: true, isActive: true, categoryId: true }
    });

    console.log(`Total Twitter services: ${services.length}`);
    console.log(`Active: ${services.filter(s => s.isActive).length}`);
    console.log(`Inactive: ${services.filter(s => !s.isActive).length}`);

    console.log('\nAll Twitter services:');
    services.forEach(s => {
        console.log(`  [${s.isActive ? '✅' : '❌'}] ${s.type}: ${s.name.substring(0, 50)}...`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
