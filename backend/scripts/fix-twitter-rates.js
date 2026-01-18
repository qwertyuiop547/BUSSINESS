/**
 * Script to fix Twitter/X services with 0 or negative rates
 * Adds back appropriate rates based on provider rate
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking Twitter/X services with zero or low rates...\n');

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

  console.log(`Found category: ${twitterCategory.name} (${twitterCategory.id})\n`);

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

  let fixed = 0;

  for (const service of services) {
    const currentRate = parseFloat(service.rate);
    const providerRate = service.providerRate ? parseFloat(service.providerRate) : 0;
    
    // If rate is 0 or less than provider rate, fix it
    if (currentRate <= providerRate || currentRate <= 0) {
      // Set rate to provider rate + 14 (standard markup)
      const newRate = providerRate + 14;
      
      await prisma.service.update({
        where: { id: service.id },
        data: { rate: newRate }
      });
      
      console.log(`FIXED: ${service.name.substring(0, 50)}`);
      console.log(`  Old: ₱${currentRate.toFixed(2)} → New: ₱${newRate.toFixed(2)} (provider: ₱${providerRate.toFixed(2)})`);
      fixed++;
    } else {
      console.log(`OK: ${service.name.substring(0, 50)} - ₱${currentRate.toFixed(2)}`);
    }
  }

  console.log('─'.repeat(80));
  console.log(`\n✅ Fixed ${fixed} services`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
