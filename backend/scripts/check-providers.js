/**
 * Check Remaining Providers
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('📋 Checking remaining providers...\n');

  try {
    const providers = await prisma.provider.findMany({
      include: {
        _count: {
          select: { services: true, orders: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    if (providers.length === 0) {
      console.log('⚠️  No providers found in database');
    } else {
      console.log(`Found ${providers.length} provider(s):\n`);
      
      providers.forEach((provider, index) => {
        console.log(`${index + 1}. ${provider.name}`);
        console.log(`   Status: ${provider.status}`);
        console.log(`   API URL: ${provider.apiUrl}`);
        console.log(`   Services: ${provider._count.services}`);
        console.log(`   Orders: ${provider._count.orders}`);
        if (provider.balance) {
          console.log(`   Balance: ${provider.balance}`);
        }
        if (provider.description) {
          console.log(`   Description: ${provider.description}`);
        }
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
