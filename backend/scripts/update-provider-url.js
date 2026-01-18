/**
 * Update Provider API URL
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const providerName = 'Main Provider';
  const apiUrl = 'https://cheappanel.com/api/v2';
  const apiKey = 'e719bb49bbd6059b6d55740db57047e9';

  try {
    console.log('📝 Updating provider...\n');

    const provider = await prisma.provider.findFirst({
      where: {
        name: providerName,
      },
    });

    if (!provider) {
      console.log('❌ Provider not found. Creating new provider...\n');
      
      const newProvider = await prisma.provider.create({
        data: {
          name: providerName,
          apiUrl,
          apiKey,
          description: 'Main API provider - CheapPanel',
          status: 'ACTIVE',
        },
      });

      console.log('✅ Provider created!');
      console.log(`   ID: ${newProvider.id}`);
      console.log(`   Name: ${newProvider.name}`);
      console.log(`   API URL: ${newProvider.apiUrl}`);
      console.log(`   Status: ${newProvider.status}`);
    } else {
      const updated = await prisma.provider.update({
        where: { id: provider.id },
        data: {
          apiUrl,
          apiKey,
          description: 'Main API provider - CheapPanel',
          status: 'ACTIVE',
        },
      });

      console.log('✅ Provider updated!');
      console.log(`   ID: ${updated.id}`);
      console.log(`   Name: ${updated.name}`);
      console.log(`   API URL: ${updated.apiUrl}`);
      console.log(`   Status: ${updated.status}`);
    }

    console.log('\n💡 Next steps:');
    console.log('   1. Test connection in admin panel: /admin/providers');
    console.log('   2. Sync services from provider');
    console.log('   3. Start using the services!');

  } catch (error) {
    console.error('❌ Error:', error.message);
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
