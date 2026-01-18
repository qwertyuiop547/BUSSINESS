const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Fixing Twitter category issue...\n');

    // Find the correct category (Twitter / X)
    const correctCategory = await prisma.category.findFirst({
        where: { slug: 'twitter-x' }
    });

    // Find the duplicate category (Twitter)
    const duplicateCategory = await prisma.category.findFirst({
        where: { slug: 'twitter' }
    });

    if (!correctCategory) {
        console.log('❌ Twitter / X category not found!');
        return;
    }

    console.log(`✅ Correct category: ${correctCategory.name} (${correctCategory.id})`);

    if (duplicateCategory) {
        console.log(`🔄 Duplicate category: ${duplicateCategory.name} (${duplicateCategory.id})`);

        // Move all services from duplicate to correct category
        const updateResult = await prisma.service.updateMany({
            where: { categoryId: duplicateCategory.id },
            data: { categoryId: correctCategory.id }
        });

        console.log(`✅ Moved ${updateResult.count} services to ${correctCategory.name}`);

        // Delete the duplicate category
        await prisma.category.delete({
            where: { id: duplicateCategory.id }
        });

        console.log(`🗑️  Deleted duplicate category: ${duplicateCategory.name}`);
    }

    // Verify
    const services = await prisma.service.count({
        where: { categoryId: correctCategory.id }
    });

    console.log(`\n✅ ${correctCategory.name} now has ${services} services`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
