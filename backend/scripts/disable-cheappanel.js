/**
 * Disable CheapPanel Provider
 * Run: node disable-cheappanel.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Disabling CheapPanel provider...');
  
  // Update provider to inactive and clear credentials
  const result = await prisma.provider.updateMany({
    where: {
      OR: [
        { name: 'CheapPanel' },
        { apiUrl: { contains: 'cheappanel' } }
      ]
    },
    data: {
      status: 'INACTIVE',
      apiKey: '',
      apiUrl: '',
      updatedAt: new Date()
    }
  });
  
  console.log(`Updated ${result.count} provider(s)`);
  
  // Show all providers
  const providers = await prisma.provider.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      apiUrl: true
    }
  });
  
  console.log('\nCurrent providers:');
  console.table(providers);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
