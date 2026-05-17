const { PrismaClient } = require('@prisma/client');
const https = require('https');
const p = new PrismaClient();

const PEAKERR_API = 'https://peakerr.com/api/v2';
const PEAKERR_KEY = '41703b61dc18b1e5dff1283375e14fd6';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function detectPlatform(category, name) {
  const text = (category + ' ' + name).toLowerCase();
  if (text.includes('telegram')) return 'TELEGRAM';
  if (text.includes('discord')) return 'DISCORD';
  return null;
}

function detectType(name) {
  const n = name.toLowerCase();
  if (n.includes('member')) return 'members';
  if (n.includes('view')) return 'views';
  if (n.includes('reaction')) return 'reactions';
  if (n.includes('comment')) return 'comments';
  if (n.includes('share')) return 'shares';
  return 'other';
}

async function getOrCreateCategory(name, slug, sortOrder) {
  let category = await p.category.findUnique({ where: { slug } });
  if (!category) {
    category = await p.category.create({
      data: { name, slug, description: `${name} services`, sortOrder, isActive: true }
    });
    console.log(`   📁 Created category: ${name}`);
  }
  return category;
}

async function run() {
  console.log('🔄 Restoring Telegram and Discord...\n');
  
  const provider = await p.provider.findFirst({ where: { name: 'Peakerr' } });
  if (!provider) {
    console.log('❌ Peakerr provider not found!');
    return;
  }
  
  console.log('📡 Fetching services from Peakerr...');
  const services = await fetchJSON(`${PEAKERR_API}?key=${PEAKERR_KEY}&action=services`);
  console.log(`📦 Found ${services.length} total services\n`);
  
  const categoryMap = {
    'TELEGRAM': await getOrCreateCategory('Telegram', 'telegram', 6),
    'DISCORD': await getOrCreateCategory('Discord', 'discord', 7),
  };
  
  let imported = 0;
  for (const svc of services) {
    const platform = detectPlatform(svc.category || '', svc.name);
    if (!platform) continue;
    
    const category = categoryMap[platform];
    const existing = await p.service.findFirst({ where: { providerServiceId: String(svc.service) } });
    
    if (!existing) {
      await p.service.create({
        data: {
          categoryId: category.id,
          providerId: provider.id,
          name: svc.name.substring(0, 255),
          description: svc.category || 'SMM Service',
          platform,
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
        }
      });
      imported++;
    }
  }
  
  console.log(`\n✅ Imported ${imported} services`);
  
  const cats = await p.category.findMany({ select: { name: true }, orderBy: { sortOrder: 'asc' } });
  const total = await p.service.count();
  console.log(`📊 Total services: ${total}`);
  console.log('📁 Categories:', cats.map(c => c.name).join(', '));
}

run().catch(console.error).finally(() => p.$disconnect());
