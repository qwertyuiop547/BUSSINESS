const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const cats = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
    console.log('All Categories:\n');
    cats.forEach(c => console.log(`ID: ${c.id} | Name: "${c.name}" | Slug: ${c.slug}`));
}

main().finally(() => prisma.$disconnect());
