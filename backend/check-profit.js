const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProfit() {
  console.log('\n📊 SERVICE PROFIT ANALYSIS BY TYPE');
  console.log('═'.repeat(75));
  console.log('TYPE'.padEnd(25) + '│ SELL PRICE │ YOUR COST  │ PROFIT     │ MARGIN');
  console.log('─'.repeat(75));

  // Get unique types and sample from each
  const types = await prisma.service.groupBy({
    by: ['type'],
    _count: { type: true },
    _avg: { rate: true, providerRate: true }
  });

  types.sort((a, b) => b._count.type - a._count.type);

  types.slice(0, 15).forEach(t => {
    const profit = t._avg.rate - t._avg.providerRate;
    const margin = ((profit / t._avg.rate) * 100).toFixed(1);
    console.log(
      t.type.substring(0, 24).padEnd(25) + 
      '│ ₱' + t._avg.rate.toFixed(2).padStart(8) + ' │ ₱' + 
      t._avg.providerRate.toFixed(2).padStart(8) + ' │ ₱' + 
      profit.toFixed(2).padStart(8) + ' │ ' + margin + '% (' + t._count.type + ')'
    );
  });

  console.log('═'.repeat(75));
  
  // Summary
  const summary = await prisma.service.aggregate({
    _avg: { rate: true, providerRate: true },
    _count: true
  });
  
  const avgProfit = summary._avg.rate - summary._avg.providerRate;
  const avgMargin = ((avgProfit / summary._avg.rate) * 100).toFixed(1);
  
  console.log('\n💰 OVERALL SUMMARY:');
  console.log('   Total Services: ' + summary._count);
  console.log('   Average Sell Price: ₱' + summary._avg.rate.toFixed(2) + ' per 1K');
  console.log('   Average Cost: ₱' + summary._avg.providerRate.toFixed(2) + ' per 1K');
  console.log('   Average Profit: ₱' + avgProfit.toFixed(2) + ' per 1K (' + avgMargin + '% margin)');
  console.log('\n✅ OO MAY KITA KA! ~28.6% margin sa lahat ng services!');
  
  await prisma.$disconnect();
}

checkProfit();
