/**
 * Script to reduce rate by ₱2 per 1000 for all services
 * This will lower customer prices and reduce profit margin
 * 
 * Run: node scripts/reduce-rate-2-peso.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('📉 Reducing rate by ₱2/1K for all services...\n');

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

  console.log(`Found ${services.length} services to update.\n`);
  console.log('─'.repeat(80));
  console.log('Service Name'.padEnd(45) + 'Old Rate'.padEnd(12) + 'New Rate'.padEnd(12) + 'Profit/1K');
  console.log('─'.repeat(80));

  let updated = 0;
  let skipped = 0;

  for (const service of services) {
    const oldRate = parseFloat(service.rate);
    const newRate = oldRate - 2;
    const providerRate = service.providerRate ? parseFloat(service.providerRate) : 0;

    // Skip if new rate would be less than or equal to provider rate (no profit or loss)
    if (newRate <= providerRate) {
      console.log(
        `${service.name.substring(0, 44).padEnd(45)}₱${oldRate.toFixed(2).padEnd(10)}SKIPPED (would have no profit)`
      );
      skipped++;
      continue;
    }

    // Update the service
    await prisma.service.update({
      where: { id: service.id },
      data: { rate: newRate },
    });

    const newProfit = newRate - providerRate;
    console.log(
      `${service.name.substring(0, 44).padEnd(45)}₱${oldRate.toFixed(2).padEnd(10)}₱${newRate.toFixed(2).padEnd(10)}₱${newProfit.toFixed(2)}`
    );
    updated++;
  }

  console.log('─'.repeat(80));
  console.log(`\n✅ Updated: ${updated} services`);
  console.log(`⏭️  Skipped: ${skipped} services (would have no profit if reduced)`);
  console.log('\n💰 All rates reduced by ₱2/1K!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
