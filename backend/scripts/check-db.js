const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function check() {
  const services = await p.service.count();
  const providers = await p.provider.findMany({ select: { name: true, status: true, apiUrl: true } });
  const categories = await p.category.count();
  
  console.log('Services:', services);
  console.log('Categories:', categories);
  console.log('Providers:');
  console.table(providers);
}

check().finally(() => p.$disconnect());
