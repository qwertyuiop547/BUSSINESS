const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listPlatforms() {
  const platforms = await prisma.service.groupBy({
    by: ['platform'],
    _count: { platform: true }
  });
  
  console.log('Available Platforms:');
  platforms.sort((a, b) => b._count.platform - a._count.platform);
  platforms.forEach(p => console.log('  ' + p.platform + ': ' + p._count.platform + ' services'));
  
  await prisma.$disconnect();
}

listPlatforms();
