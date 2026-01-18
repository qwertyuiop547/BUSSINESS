const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FIXED_PROFIT = 35; // ₱35 profit for ALL TikTok services

async function updateTikTokPrices() {
  console.log('\n🔧 UPDATING ALL TIKTOK SERVICE PRICES');
  console.log('   Fixed profit: ₱' + FIXED_PROFIT + ' per 1K');
  console.log('═'.repeat(60));

  // Get only TIKTOK services
  const services = await prisma.service.findMany({
    where: {
      platform: 'TIKTOK'
    },
    select: { id: true, type: true, rate: true, providerRate: true, name: true }
  });

  console.log('   Found ' + services.length + ' TikTok services...\n');

  let updated = 0;

  for (const service of services) {
    const providerRate = parseFloat(service.providerRate);
    const currentRate = parseFloat(service.rate);
    const typeLower = service.type.toLowerCase();
    const nameLower = service.name.toLowerCase();
    
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
    console.log('   ... and ' + (updated - 10) + ' more TikTok services updated');
  }

  console.log('\n📊 TIKTOK SERVICES SUMMARY:');
  console.log('─'.repeat(60));
  
  // Show summary by type for TikTok only
  const ttServices = await prisma.service.findMany({
    where: { platform: 'TIKTOK' },
    select: { type: true, rate: true, providerRate: true }
  });

  const typeGroups = {};
  ttServices.forEach(s => {
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
  console.log('✅ Updated ' + updated + ' TikTok services! All have ₱' + FIXED_PROFIT + ' profit!');
  
  await prisma.$disconnect();
}

updateTikTokPrices();
