const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.topUpRequest.count({ where: { status: 'PENDING' } });
  console.log('Pending count:', count);
  
  const all = await prisma.topUpRequest.findMany({
    select: { id: true, status: true, amount: true }
  });
  console.log('All top-ups:', JSON.stringify(all, null, 2));
  
  await prisma.$disconnect();
}

main();
