const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FIXED_PROFIT = 40; // ₱40 profit for ALL Instagram services

async function updateInstagramPrices() {
  console.log('\n🔧 UPDATING ALL INSTAGRAM SERVICE PRICES');
  console.log('   Fixed profit: ₱' + FIXED_PROFIT + ' per 1K');
  console.log('═'.repeat(60));

  const services = await prisma.service.findMany({
    where: { platform: 'INSTAGRAM' },
    select: { id: true, type: true, rate: true, providerRate: true }
  });

  console.log('   Found ' + services.length + ' Instagram services...\n');

  let updated = 0;

  for (const service of services) {
    const providerRate = parseFloat(service.providerRate);
    const currentRate = parseFloat(service.rate);
    const newRate = providerRate + FIXED_PROFIT;
    
    if (Math.abs(currentRate - newRate) > 0.01) {
      await prisma.service.update({
        where: { id: service.id },
        data: { rate: newRate }
      });
      updated++;
      
      if (updated <= 10) {
        console.log('   ✅ ' + service.type.substring(0, 15).padEnd(16) + 
          '| Cost: ₱' + providerRate.toFixed(2).padStart(7) +
          ' → Sell: ₱' + newRate.toFixed(2).padStart(7) +
          ' | Profit: ₱' + FIXED_PROFIT);
      }
    }
  }

  if (updated > 10) {
    console.log('   ... and ' + (updated - 10) + ' more Instagram services updated');
  }

  console.log('\n📊 INSTAGRAM SERVICES SUMMARY:');
  console.log('─'.repeat(60));
  
  const igServices = await prisma.service.findMany({
    where: { platform: 'INSTAGRAM' },
    select: { type: true, rate: true, providerRate: true }
  });

  const typeGroups = {};
  igServices.forEach(s => {
    const type = s.type;
    if (!typeGroups[type]) {
      typeGroups[type] = { count: 0, totalRate: 0, totalCost: 0 };
    }
    typeGroups[type].count++;
    typeGroups[type].totalRate += parseFloat(s.rate);
    typeGroups[type].totalCost += parseFloat(s.providerRate);
  });

  Object.entries(typeGroups)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([type, data]) => {
      const avgRate = data.totalRate / data.count;
      const avgCost = data.totalCost / data.count;
      const profit = avgRate - avgCost;
      console.log('   ' + type.substring(0, 20).padEnd(22) + 
        '| Sell: ₱' + avgRate.toFixed(2).padStart(7) +
        ' | Cost: ₱' + avgCost.toFixed(2).padStart(7) +
        ' | Profit: ₱' + profit.toFixed(2) + ' (' + data.count + ')');
    });

  console.log('\n═'.repeat(60));
  console.log('✅ Updated ' + updated + ' Instagram services! All have ₱' + FIXED_PROFIT + ' profit!');
  
  await prisma.$disconnect();
}

updateInstagramPrices();
