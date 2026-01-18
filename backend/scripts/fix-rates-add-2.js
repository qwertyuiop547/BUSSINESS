/**
 * Script to ADD ₱2 per 1000 to all services (to reverse the previous reduction)
 * 
 * Run: node scripts/fix-rates-add-2.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Adding back ₱2/1K to all services...\n');

  // Get all services
  const services = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      rate: true,
      providerRate: true,
    },
    orderBy: { name: 'asc' },
  });

  console.log(`Found ${services.length} services to fix.\n`);
  
  // Check for services with 0 or negative rates
  const problematicServices = services.filter(s => parseFloat(s.rate) <= 0);
  console.log(`⚠️  Services with rate <= 0: ${problematicServices.length}`);
  
  if (problematicServices.length > 0) {
    console.log('\nProblematic services:');
    problematicServices.slice(0, 10).forEach(s => {
      console.log(`  - ${s.name}: ₱${parseFloat(s.rate).toFixed(2)}`);
    });
    if (problematicServices.length > 10) {
      console.log(`  ... and ${problematicServices.length - 10} more`);
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log('Service Name'.padEnd(45) + 'Old Rate'.padEnd(12) + 'New Rate'.padEnd(12));
  console.log('─'.repeat(80));

  let updated = 0;

  for (const service of services) {
    const oldRate = parseFloat(service.rate);
    const newRate = oldRate + 2; // ADD ₱2 back

    // Update the service
    await prisma.service.update({
      where: { id: service.id },
      data: { rate: newRate },
    });

    console.log(
      `${service.name.substring(0, 44).padEnd(45)}₱${oldRate.toFixed(2).padEnd(10)}₱${newRate.toFixed(2)}`
    );
    updated++;
  }

  console.log('─'.repeat(80));
  console.log(`\n✅ Fixed: ${updated} services`);
  console.log('\n💰 All rates restored (+₱2/1K)!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
