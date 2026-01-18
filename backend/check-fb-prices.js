const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkFacebookPrices() {
  console.log('\n📊 FACEBOOK SERVICES - CURRENT PRICES\n');

  const types = ['followers', 'members', 'comments', 'views', 'shares', 'likes', 'reactions'];
  
  for (const type of types) {
    const services = await prisma.service.findMany({
      where: {
        platform: 'FACEBOOK',
        type: type
      },
      select: { name: true, rate: true, providerRate: true },
      take: 3
    });

    if (services.length > 0) {
      console.log('--- ' + type.toUpperCase() + ' ---');
      services.forEach(s => {
        const rate = parseFloat(s.rate);
        const cost = parseFloat(s.providerRate);
        console.log('  Rate: ' + rate.toFixed(2).padStart(7) + ' | Cost: ' + cost.toFixed(2).padStart(7) + ' | Profit: ' + (rate - cost).toFixed(2));
      });
      console.log('');
    }
  }

  await prisma.$disconnect();
}

checkFacebookPrices();
