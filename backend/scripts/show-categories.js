const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function check() {
  const cats = await p.category.findMany({
    select: { name: true, slug: true, _count: { select: { services: true } } },
    orderBy: { sortOrder: 'asc' }
  });
  
  console.log('Categories with service count:');
  cats.forEach(c => {
    console.log(`  ${c.name}: ${c._count.services} services`);
  });
  
  const total = await p.service.count();
  console.log('\nTotal services:', total);
}

check().finally(() => p.$disconnect());
