/**
 * Sync Peakerr Services
 * Run: node scripts/sync-peakerr.js
 */

const { PrismaClient } = require('@prisma/client');
const https = require('https');
const prisma = new PrismaClient();

// Peakerr API Configuration
const PEAKERR_API = 'https://peakerr.com/api/v2';
const PEAKERR_KEY = '41703b61dc18b1e5dff1283375e14fd6';

// Helper function to make HTTPS request
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      });
    }).on('error', reject);
  });
}

// Platform mapping from category name
function detectPlatform(category, name) {
  const text = (category + ' ' + name).toLowerCase();
  if (text.includes('instagram')) return 'INSTAGRAM';
  if (text.includes('facebook') || text.includes('fb ')) return 'FACEBOOK';
  if (text.includes('tiktok') || text.includes('tik tok')) return 'TIKTOK';
  if (text.includes('twitter') || text.includes(' x ') || text.includes('x.com')) return 'TWITTER';
  if (text.includes('youtube') || text.includes('yt ')) return 'YOUTUBE';
  if (text.includes('telegram')) return 'TELEGRAM';
  if (text.includes('spotify')) return 'SPOTIFY';
  if (text.includes('twitch')) return 'TWITCH';
  if (text.includes('discord')) return 'DISCORD';
  if (text.includes('threads')) return 'THREADS';
  if (text.includes('snapchat')) return 'SNAPCHAT';
  if (text.includes('linkedin')) return 'LINKEDIN';
  return 'OTHER';
}

// Detect service type from name
function detectType(name) {
  const n = name.toLowerCase();
  if (n.includes('follower')) return 'followers';
  if (n.includes('subscriber')) return 'subscribers';
  if (n.includes('like')) return 'likes';
  if (n.includes('view')) return 'views';
  if (n.includes('comment')) return 'comments';
  if (n.includes('share')) return 'shares';
  if (n.includes('reaction')) return 'reactions';
  if (n.includes('member')) return 'members';
  if (n.includes('retweet')) return 'retweets';
  if (n.includes('save')) return 'saves';
  if (n.includes('watch')) return 'watchtime';
  return 'other';
}

async function getOrCreateCategory(name, slug, sortOrder) {
  let category = await prisma.category.findUnique({
    where: { slug }
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name,
        slug,
        description: `${name} services`,
        sortOrder,
        isActive: true,
      }
    });
    console.log(`   📁 Created category: ${name}`);
  }

  return category;
}

async function main() {
  console.log('🔄 Setting up Peakerr provider...\n');

  // Create provider
  let provider = await prisma.provider.findFirst({
    where: { name: 'Peakerr' }
  });

  if (!provider) {
    provider = await prisma.provider.create({
      data: {
        name: 'Peakerr',
        apiUrl: PEAKERR_API,
        apiKey: PEAKERR_KEY,
        status: 'ACTIVE',
        description: 'Peakerr SMM Services Provider',
      }
    });
    console.log('✅ Created Peakerr provider\n');
  } else {
    // Update existing
    provider = await prisma.provider.update({
      where: { id: provider.id },
      data: {
        apiUrl: PEAKERR_API,
        apiKey: PEAKERR_KEY,
        status: 'ACTIVE',
      }
    });
    console.log('✅ Updated Peakerr provider\n');
  }

  // Fetch services from API
  console.log('📡 Fetching services from Peakerr...');
  const services = await fetchJSON(`${PEAKERR_API}?key=${PEAKERR_KEY}&action=services`);

  if (services.error) {
    console.error('❌ API Error:', services.error);
    return;
  }

  console.log(`📦 Found ${services.length} services\n`);

  // Create category map
  const categoryMap = {
    'INSTAGRAM': await getOrCreateCategory('Instagram', 'instagram', 1),
    'FACEBOOK': await getOrCreateCategory('Facebook', 'facebook', 2),
    'TIKTOK': await getOrCreateCategory('TikTok', 'tiktok', 3),
    'TWITTER': await getOrCreateCategory('Twitter / X', 'twitter', 4),
    'YOUTUBE': await getOrCreateCategory('YouTube', 'youtube', 5),
    'TELEGRAM': await getOrCreateCategory('Telegram', 'telegram', 6),
    'SPOTIFY': await getOrCreateCategory('Spotify', 'spotify', 7),
    'THREADS': await getOrCreateCategory('Threads', 'threads', 8),
    'DISCORD': await getOrCreateCategory('Discord', 'discord', 9),
    'SNAPCHAT': await getOrCreateCategory('Snapchat', 'snapchat', 10),
    'LINKEDIN': await getOrCreateCategory('LinkedIn', 'linkedin', 11),
    'TWITCH': await getOrCreateCategory('Twitch', 'twitch', 12),
    'OTHER': await getOrCreateCategory('Other Services', 'other', 99),
  };

  console.log('\n📥 Importing services...');
  
  let imported = 0;
  let updated = 0;
  let skipped = 0;

  for (const svc of services) {
    try {
      const platform = detectPlatform(svc.category || '', svc.name);
      const category = categoryMap[platform];

      if (!category) {
        skipped++;
        continue;
      }

      const serviceData = {
        categoryId: category.id,
        providerId: provider.id,
        name: svc.name.substring(0, 255),
        description: svc.category || 'SMM Service',
        platform: platform,
        type: detectType(svc.name),
        rate: parseFloat(svc.rate),
        minQuantity: parseInt(svc.min) || 10,
        maxQuantity: Math.min(parseInt(svc.max) || 1000000, 2147483647),
        providerServiceId: String(svc.service),
        providerRate: parseFloat(svc.rate),
        isDripFeed: svc.dripfeed === true,
        isRefill: svc.refill === true,
        isActive: true,
        sortOrder: imported,
      };

      // Check if service exists
      const existing = await prisma.service.findFirst({
        where: { providerServiceId: String(svc.service) }
      });

      if (existing) {
        await prisma.service.update({
          where: { id: existing.id },
          data: {
            name: serviceData.name,
            rate: serviceData.rate,
            providerRate: serviceData.providerRate,
            minQuantity: serviceData.minQuantity,
            maxQuantity: serviceData.maxQuantity,
            isDripFeed: serviceData.isDripFeed,
            isRefill: serviceData.isRefill,
          }
        });
        updated++;
      } else {
        await prisma.service.create({ data: serviceData });
        imported++;
      }
    } catch (err) {
      console.error(`   ❌ Error: ${svc.service} - ${err.message}`);
      skipped++;
    }
  }

  console.log(`\n✅ Import complete!`);
  console.log(`   📥 New services: ${imported}`);
  console.log(`   🔄 Updated: ${updated}`);
  console.log(`   ⏭️ Skipped: ${skipped}`);

  // Show summary
  const totalServices = await prisma.service.count();
  const totalCategories = await prisma.category.count();
  
  console.log(`\n📊 Database summary:`);
  console.log(`   Services: ${totalServices}`);
  console.log(`   Categories: ${totalCategories}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
