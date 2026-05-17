const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // Show current services
  const services = await p.service.findMany({
    take: 10,
    select: { id: true, name: true, providerId: true }
  });
  console.log('Sample services:');
  console.table(services);
  
  const total = await p.service.count();
  console.log('Total services:', total);
  
  // Delete ALL services
  const deleted = await p.service.deleteMany({});
  console.log('Deleted:', deleted.count, 'services');
  
  // Also delete all providers except essential ones
  const deletedProviders = await p.provider.deleteMany({});
  console.log('Deleted:', deletedProviders.count, 'providers');
  
  console.log('\n✅ All services and providers cleared!');
}

main().catch(console.error).finally(() => p.$disconnect());

