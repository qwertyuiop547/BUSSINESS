/**
 * Script to set Twitter/X services profit to ₱16/1K
 * rate = providerRate + 16
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Setting Twitter/X services profit to ₱16/1K...\n');

  // Find Twitter/X category
  const twitterCategory = await prisma.category.findFirst({
    where: { 
      OR: [
        { name: { contains: 'Twitter' } },
        { name: { contains: 'X' } }
      ]
    }
  });

  if (!twitterCategory) {
    console.log('Twitter/X category not found!');
    return;
  }

  console.log(`Found category: ${twitterCategory.name}\n`);

  // Get all services in Twitter/X category
  const services = await prisma.service.findMany({
    where: { categoryId: twitterCategory.id },
    select: {
      id: true,
      name: true,
      rate: true,
      providerRate: true,
    }
  });

  console.log(`Found ${services.length} Twitter/X services\n`);
  console.log('─'.repeat(80));
  console.log('Service'.padEnd(50) + 'Provider'.padEnd(12) + 'New Rate'.padEnd(12) + 'Profit');
  console.log('─'.repeat(80));

  const PROFIT_MARGIN = 16; // ₱16 profit per 1K

  for (const service of services) {
    const providerRate = service.providerRate ? parseFloat(service.providerRate) : 0;
    const newRate = providerRate + PROFIT_MARGIN;
    
    await prisma.service.update({
      where: { id: service.id },
      data: { rate: newRate }
    });
    
    console.log(
      `${service.name.substring(0, 49).padEnd(50)}₱${providerRate.toFixed(2).padEnd(10)}₱${newRate.toFixed(2).padEnd(10)}₱${PROFIT_MARGIN.toFixed(2)}`
    );
  }

  console.log('─'.repeat(80));
  console.log(`\n✅ Updated ${services.length} services with ₱${PROFIT_MARGIN}/1K profit margin`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
