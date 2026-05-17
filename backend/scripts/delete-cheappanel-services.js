/**
 * Delete all CheapPanel services
 * Run: node scripts/delete-cheappanel-services.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🗑️ Deleting all CheapPanel services...\n');
  
  // Delete all services from CheapPanel provider
  const result = await prisma.service.deleteMany({
    where: {
      provider: {
        name: 'CheapPanel'
      }
    }
  });
  
  console.log(`✅ Deleted ${result.count} services from CheapPanel`);
  
  // Also delete the provider itself
  const providerResult = await prisma.provider.deleteMany({
    where: {
      name: 'CheapPanel'
    }
  });
  
  console.log(`✅ Deleted ${providerResult.count} provider(s)`);
  
  // Show remaining
  const remainingServices = await prisma.service.count();
  const remainingProviders = await prisma.provider.count();
  
  console.log(`\n📊 Remaining:`);
  console.log(`   Services: ${remainingServices}`);
  console.log(`   Providers: ${remainingProviders}`);
  
  // Show remaining providers
  const providers = await prisma.provider.findMany({
    select: { id: true, name: true, status: true }
  });
  
  if (providers.length > 0) {
    console.log('\n📋 Current providers:');
    console.table(providers);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
