/**
 * Add Provider with API Key
 * Creates provider with placeholder URL that can be updated later
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const apiKey = 'e719bb49bbd6059b6d55740db57047e9';
  const name = 'Main Provider';
  const apiUrl = 'https://api.example.com/api/v2'; // Placeholder - update this in admin panel
  const description = 'Main API provider - Please update API URL in admin panel';

  try {
    console.log('📝 Creating provider...\n');
    console.log(`   Name: ${name}`);
    console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
    console.log(`   API URL: ${apiUrl} (PLACEHOLDER - please update)`);
    console.log(`   Description: ${description}\n`);

    // Check if provider exists
    const existing = await prisma.provider.findFirst({
      where: {
        name: name,
      },
    });

    if (existing) {
      console.log('⚠️  Provider already exists. Updating API key...\n');
      
      const updated = await prisma.provider.update({
        where: { id: existing.id },
        data: {
          apiKey,
          apiUrl,
          description,
          status: 'ACTIVE',
        },
      });

      console.log('✅ Provider updated!');
      console.log(`   ID: ${updated.id}`);
      console.log(`\n💡 IMPORTANT: Update the API URL in admin panel: /admin/providers`);
    } else {
      const provider = await prisma.provider.create({
        data: {
          name,
          apiUrl,
          apiKey,
          description,
          status: 'ACTIVE',
        },
      });

      console.log('✅ Provider created!');
      console.log(`   ID: ${provider.id}`);
      console.log(`\n💡 IMPORTANT: Update the API URL in admin panel: /admin/providers`);
      console.log(`   Go to: http://localhost:3001/admin/providers`);
      console.log(`   Click "Edit" and update the API URL field`);
    }

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
