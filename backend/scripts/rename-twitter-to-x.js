/**
 * Script to rename Twitter category to Twitter / X
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating Twitter category to Twitter / X...');
  
  const result = await prisma.category.updateMany({
    where: { name: 'Twitter' },
    data: { name: 'Twitter / X' }
  });
  
  console.log('Updated:', result.count, 'categories');
  
  // Also update the slug
  await prisma.category.updateMany({
    where: { slug: 'twitter' },
    data: { slug: 'twitter-x' }
  });
  
  console.log('Done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
