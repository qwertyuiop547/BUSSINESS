const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.category.findMany({ select: { name: true, slug: true } })
  .then(cats => {
    console.log('Categories in database:');
    cats.forEach(c => console.log(`  - ${c.name} (${c.slug})`));
    prisma.$disconnect();
  });
