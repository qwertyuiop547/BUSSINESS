/**
 * Update Provider API URL
 * Usage: node scripts/update-provider-url.js <name> <apiUrl> <apiKey>
 * Example: node scripts/update-provider-url.js "My Provider" "https://api.example.com" "your-api-key"
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node scripts/update-provider-url.js <name> <apiUrl> <apiKey>');
    console.log('Example: node scripts/update-provider-url.js "My Provider" "https://api.example.com" "your-api-key"');
    process.exit(1);
  }
  
  const [providerName, apiUrl, apiKey] = args;

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
          description: `${providerName} API Provider`,
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
          description: `${providerName} API Provider`,
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
