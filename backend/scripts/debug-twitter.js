const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Get Twitter / X category
    const twitterCategory = await prisma.category.findFirst({
        where: { slug: 'twitter-x' }
    });

    console.log('Twitter / X Category:');
    console.log(`  ID: ${twitterCategory?.id}`);
    console.log(`  Name: ${twitterCategory?.name}`);
    console.log(`  isActive: ${twitterCategory?.isActive}`);

    // Get all services in this category
    const services = await prisma.service.findMany({
        where: { categoryId: twitterCategory?.id },
        select: { id: true, name: true, type: true, isActive: true, categoryId: true }
    });

    console.log(`\nServices in category (${services.length}):`);
    services.forEach(s => {
        console.log(`  - [${s.type}] ${s.name.substring(0, 50)}... (active: ${s.isActive})`);
    });

    // Also get all Twitter services (by platform)
    const twitterServices = await prisma.service.findMany({
        where: { platform: 'TWITTER' },
        include: { category: true },
        select: { id: true, name: true, type: true, isActive: true, categoryId: true, category: { select: { name: true, id: true } } }
    });

    console.log(`\nAll Twitter platform services (${twitterServices.length}):`);
    twitterServices.forEach(s => {
        console.log(`  - Category: ${s.category?.name} (${s.categoryId})`);
        console.log(`    [${s.type}] ${s.name.substring(0, 50)}... (active: ${s.isActive})`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
