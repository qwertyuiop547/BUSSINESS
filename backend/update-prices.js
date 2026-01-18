const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FIXED_PROFIT = 17; // ₱17 profit per 1K

async function updateAllPrices() {
  console.log('\n🔧 UPDATING ALL SERVICE PRICES');
  console.log('   Fixed profit: ₱' + FIXED_PROFIT + ' per 1K');
  console.log('═'.repeat(60));

  // Get all services
  const services = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      rate: true,
      providerRate: true,
      type: true
    }
  });

  console.log('   Found ' + services.length + ' services to update...\n');

  let updated = 0;
  let skipped = 0;

  for (const service of services) {
    const providerRate = parseFloat(service.providerRate);
    const currentRate = parseFloat(service.rate);
    const newRate = providerRate + FIXED_PROFIT;
    const oldProfit = currentRate - providerRate;
    
    // Only update if rate changed
    if (Math.abs(currentRate - newRate) > 0.01) {
      await prisma.service.update({
        where: { id: service.id },
        data: { rate: newRate }
      });
      updated++;
      
      if (updated <= 10) {
        console.log('   ✅ ' + service.type.substring(0, 15).padEnd(16) + 
          '| Cost: ₱' + providerRate.toFixed(2).padStart(7) + 
          ' | Old: ₱' + currentRate.toFixed(2).padStart(7) + 
          ' → New: ₱' + newRate.toFixed(2).padStart(7) +
          ' | Profit: ₱' + oldProfit.toFixed(2) + ' → ₱' + FIXED_PROFIT);
      }
    } else {
      skipped++;
    }
  }

  if (updated > 10) {
    console.log('   ... and ' + (updated - 10) + ' more services updated');
  }

  console.log('\n═'.repeat(60));
  console.log('📊 SUMMARY:');
  console.log('   Updated: ' + updated + ' services');
  console.log('   Skipped (already correct): ' + skipped + ' services');
  console.log('   New profit margin: ₱' + FIXED_PROFIT + ' per 1K for ALL services');

  // Show sample of new prices
  console.log('\n📋 SAMPLE NEW PRICES:');
  const samples = await prisma.service.findMany({
    take: 8,
    select: { type: true, rate: true, providerRate: true },
    distinct: ['type']
  });

  samples.forEach(s => {
    const profit = parseFloat(s.rate) - parseFloat(s.providerRate);
    console.log('   ' + s.type.substring(0, 15).padEnd(16) + 
      '| Sell: ₱' + parseFloat(s.rate).toFixed(2).padStart(8) + 
      ' | Cost: ₱' + parseFloat(s.providerRate).toFixed(2).padStart(8) + 
      ' | Profit: ₱' + profit.toFixed(2));
  });

  console.log('\n✅ DONE! Lahat ng services may ₱' + FIXED_PROFIT + ' profit na!');
  
  await prisma.$disconnect();
}

updateAllPrices();
