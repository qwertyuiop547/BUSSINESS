/**
 * Add Provider Script
 * 
 * Usage: node scripts/add-provider.js <name> <apiUrl> <apiKey> [description]
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Get arguments
  const args = process.argv.slice(2);
  
  let name, apiUrl, apiKey, description;

  if (args.length >= 3) {
    name = args[0];
    apiUrl = args[1];
    apiKey = args[2];
    description = args[3] || null;
  } else {
    // If no arguments, use the provided API key and ask for URL
    console.log('📝 Adding Provider\n');
    console.log('API Key provided: e719bb49bbd6059b6d55740db57047e9\n');
    
    // Default values - user can update these
    name = 'Main Provider';
    apiKey = 'e719bb49bbd6059b6d55740db57047e9';
    description = 'Main API provider';
    
    // Check if API URL is provided as argument or use placeholder
    if (args.length >= 1) {
      apiUrl = args[0];
    } else {
      console.log('⚠️  API URL not provided. Please provide it as argument:');
      console.log('   node scripts/add-provider.js <name> <apiUrl> <apiKey> [description]');
      console.log('\nExample:');
      console.log('   node scripts/add-provider.js "My Provider" "https://api.example.com/api/v2" "e719bb49bbd6059b6d55740db57047e9"');
      process.exit(1);
    }
  }

  try {
    console.log(`\n📋 Creating provider...`);
    console.log(`   Name: ${name}`);
    console.log(`   API URL: ${apiUrl}`);
    console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
    if (description) {
      console.log(`   Description: ${description}`);
    }

    // Check if provider with same name exists
    const existing = await prisma.provider.findFirst({
      where: {
        name: name,
      },
    });

    if (existing) {
      console.log(`\n⚠️  Provider "${name}" already exists. Updating instead...`);
      
      const updated = await prisma.provider.update({
        where: { id: existing.id },
        data: {
          apiUrl,
          apiKey,
          description: description || existing.description,
          status: 'ACTIVE',
        },
      });

      console.log(`✅ Provider updated successfully!`);
      console.log(`   ID: ${updated.id}`);
      return;
    }

    // Create new provider
    const provider = await prisma.provider.create({
      data: {
        name,
        apiUrl,
        apiKey,
        description,
        status: 'ACTIVE',
      },
    });

    console.log(`\n✅ Provider created successfully!`);
    console.log(`   ID: ${provider.id}`);
    console.log(`   Name: ${provider.name}`);
    console.log(`   Status: ${provider.status}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Test the connection in admin panel: /admin/providers`);
    console.log(`   2. Sync services from provider: Click "Sync Services" button`);
    console.log(`   3. Or manually add services through admin panel`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'P2002') {
      console.error('   Provider name already exists. Please use a different name.');
    }
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
