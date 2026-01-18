/**
 * CheapPanel Services Import Script
 * 
 * Run with: node sync-cheappanel.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// API Configuration
const CHEAPPANEL_API = 'https://cheappanel.com/api/v2';
const CHEAPPANEL_KEY = '494a05cc345e8012ee25f3a059cf4462';
const MARKUP = 1.4; // 40% markup on provider prices

// Platform mapping from category name
function detectPlatform(category, name) {
    const text = (category + ' ' + name).toLowerCase();
    if (text.includes('instagram')) return 'INSTAGRAM';
    if (text.includes('facebook')) return 'FACEBOOK';
    if (text.includes('tiktok') || text.includes('tik tok')) return 'TIKTOK';
    if (text.includes('twitter') || text.includes('x.com')) return 'TWITTER';
    if (text.includes('youtube')) return 'YOUTUBE';
    if (text.includes('telegram')) return 'TELEGRAM';
    if (text.includes('spotify')) return 'SPOTIFY';
    if (text.includes('twitch')) return 'TWITCH';
    if (text.includes('discord')) return 'DISCORD';
    if (text.includes('linkedin')) return 'OTHER';
    if (text.includes('whatsapp')) return 'OTHER';
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
    return 'other';
}

async function main() {
    console.log('🔄 Syncing services from CheapPanel...');

    // Fetch services from API
    const response = await fetch(`${CHEAPPANEL_API}?key=${CHEAPPANEL_KEY}&action=services`);
    const services = await response.json();

    console.log(`📦 Found ${services.length} services from CheapPanel`);

    // Get or create provider
    let provider = await prisma.provider.findFirst({
        where: { name: 'CheapPanel' }
    });

    if (!provider) {
        provider = await prisma.provider.create({
            data: {
                name: 'CheapPanel',
                apiUrl: CHEAPPANEL_API,
                apiKey: CHEAPPANEL_KEY,
                status: 'ACTIVE',
                description: 'CheapPanel SMM Services Provider',
            }
        });
        console.log('✅ Created CheapPanel provider');
    }

    // Create category map
    const categoryMap = {
        'INSTAGRAM': await getOrCreateCategory('Instagram', 'instagram', 1),
        'FACEBOOK': await getOrCreateCategory('Facebook', 'facebook', 2),
        'TIKTOK': await getOrCreateCategory('TikTok', 'tiktok', 3),
        'TWITTER': await getOrCreateCategory('Twitter', 'twitter', 4),
        'YOUTUBE': await getOrCreateCategory('YouTube', 'youtube', 5),
        'TELEGRAM': await getOrCreateCategory('Telegram', 'telegram', 6),
        'SPOTIFY': await getOrCreateCategory('Spotify', 'spotify', 7),
        'OTHER': await getOrCreateCategory('Other', 'other', 10),
    };

    let imported = 0;
    let skipped = 0;

    for (const svc of services) {
        try {
            const platform = detectPlatform(svc.category || '', svc.name);
            const category = categoryMap[platform];

            if (!category) {
                skipped++;
                continue;
            }

            // Check if service exists
            const existing = await prisma.service.findFirst({
                where: { providerServiceId: String(svc.service) }
            });

            if (existing) {
                // Update existing service
                await prisma.service.update({
                    where: { id: existing.id },
                    data: {
                        name: svc.name.substring(0, 255),
                        rate: parseFloat(svc.rate) * MARKUP,
                        providerRate: parseFloat(svc.rate),
                        minQuantity: svc.min,
                        maxQuantity: svc.max,
                        isDripFeed: svc.dripfeed || false,
                        isRefill: svc.refill || false,
                    }
                });
            } else {
                // Create new service
                await prisma.service.create({
                    data: {
                        categoryId: category.id,
                        providerId: provider.id,
                        name: svc.name.substring(0, 255),
                        description: `${svc.category || 'SMM Service'}`,
                        platform: platform,
                        type: detectType(svc.name),
                        rate: parseFloat(svc.rate) * MARKUP,
                        minQuantity: svc.min,
                        maxQuantity: Math.min(svc.max, 2147483647), // Postgres int max
                        providerServiceId: String(svc.service),
                        providerRate: parseFloat(svc.rate),
                        isDripFeed: svc.dripfeed || false,
                        isRefill: svc.refill || false,
                        isActive: true,
                        sortOrder: imported,
                    }
                });
                imported++;
            }
        } catch (err) {
            console.error(`❌ Error importing service ${svc.service}:`, err.message);
            skipped++;
        }
    }

    console.log(`✅ Imported ${imported} new services`);
    console.log(`⏭️ Skipped ${skipped} services`);

    // Count total services
    const total = await prisma.service.count();
    console.log(`📊 Total services in database: ${total}`);
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
    }

    return category;
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
