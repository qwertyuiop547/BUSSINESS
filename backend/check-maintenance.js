const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.setting.findUnique({ 
    where: { key: 'maintenanceMode' } 
  });
  
  console.log('Maintenance setting:', JSON.stringify(setting, null, 2));
  
  await prisma.$disconnect();
}

main();
