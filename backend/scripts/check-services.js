const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.service.count();
  console.log('Total services in database:', count);
  
  const services = await prisma.service.findMany({
    take: 10,
    select: {
      id: true,
      name: true,
      rate: true,
      minQuantity: true,
      maxQuantity: true,
      status: true
    }
  });
  
  console.log('\nSample services:');
  services.forEach(s => {
    console.log(`- ${s.name}: Rate=${s.rate}, Min=${s.minQuantity}, Max=${s.maxQuantity}, Status=${s.status}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
