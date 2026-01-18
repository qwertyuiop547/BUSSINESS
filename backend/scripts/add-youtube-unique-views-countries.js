const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('📺 Adding YouTube Unique Views by Country services...');
    
    // Get YouTube category
    let youtubeCat = await prisma.category.findFirst({
        where: { OR: [{ name: { contains: 'YouTube' } }, { slug: { contains: 'youtube' } }] }
    });
    
    if (!youtubeCat) {
        youtubeCat = await prisma.category.create({
            data: { name: 'YouTube', slug: 'youtube', icon: 'youtube', sortOrder: 3 }
        });
    }
    
    // Get provider
    const provider = await prisma.provider.findFirst({ where: { status: 'ACTIVE' } });
    if (!provider) {
        console.log('❌ Walang active provider!');
        return;
    }
    
    // ₱16 markup per service
    const MARKUP = 16;
    
    // Standard rate services ($3.4992 provider rate)
    const standardServices = [
        { country: 'Italy', code: 'IT', id: '1984', time: '1 hour 26 minutes' },
        { country: 'Lebanon', code: 'LB', id: '1985', time: '47 minutes' },
        { country: 'Pakistan', code: 'PK', id: '1986', time: '26 minutes' },
        { country: 'France', code: 'FR', id: '1987', time: '1 hour 43 minutes' },
        { country: 'Nepal', code: 'NP', id: '1988', time: '3 hours 8 minutes' },
        { country: 'Mexico', code: 'MX', id: '1989', time: '2 hours 41 minutes' },
        { country: 'Algeria', code: 'DZ', id: '1990', time: '17 minutes' },
        { country: 'Bulgaria', code: 'BG', id: '1991', time: '58 minutes' },
        { country: 'Canada', code: 'CA', id: '1992', time: '21 minutes' },
        { country: 'Germany', code: 'DE', id: '1993', time: '1 hour 5 minutes' },
        { country: 'Netherlands', code: 'NL', id: '1994', time: '1 hour 38 minutes' },
        { country: 'Greece', code: 'GR', id: '1995', time: '2 hours 19 minutes' },
        { country: 'Spain', code: 'ES', id: '1997', time: '46 minutes' },
        { country: 'Poland', code: 'PL', id: '1998', time: '1 hour 17 minutes' },
        { country: 'Costa Rica', code: 'CR', id: '2011', time: '2 hours 19 minutes' },
        { country: 'Dominican Republic', code: 'DO', id: '2012', time: 'Variable' },
        { country: 'El Salvador', code: 'SV', id: '2013', time: '46 minutes' },
        { country: 'Georgia', code: 'GE', id: '2014', time: '1 hour 17 minutes' },
        { country: 'Ghana', code: 'GH', id: '2015', time: '2 hours 41 minutes' },
        { country: 'Guatemala', code: 'GT', id: '2016', time: '1 hour 26 minutes' },
        { country: 'Honduras', code: 'HN', id: '2017', time: '47 minutes' },
        { country: 'Hong Kong', code: 'HK', id: '2018', time: '26 minutes' },
        { country: 'Hungary', code: 'HU', id: '2019', time: '1 hour 43 minutes' },
        { country: 'Iraq', code: 'IQ', id: '2020', time: '3 hours 8 minutes' },
        { country: 'Israel', code: 'IL', id: '2021', time: '2 hours 41 minutes' },
        { country: 'Jamaica', code: 'JM', id: '2022', time: '17 minutes' },
        { country: 'Jordan', code: 'JO', id: '2023', time: '58 minutes' },
        { country: 'Kenya', code: 'KE', id: '2024', time: '21 minutes' },
        { country: 'Kuwait', code: 'KW', id: '2025', time: '1 hour 5 minutes' },
        { country: 'Peru', code: 'PE', id: '2036', time: '3 hours 8 minutes' },
        { country: 'Portugal', code: 'PT', id: '2037', time: '2 hours 41 minutes' },
        { country: 'Puerto Rico', code: 'PR', id: '2038', time: '17 minutes' },
        { country: 'Qatar', code: 'QA', id: '2039', time: '58 minutes' },
        { country: 'Singapore', code: 'SG', id: '2040', time: '21 minutes' },
        { country: 'Senegal', code: 'SN', id: '2041', time: '1 hour 5 minutes' },
        { country: 'Slovenia', code: 'SI', id: '2042', time: '1 hour 38 minutes' },
        { country: 'Sri Lanka', code: 'LK', id: '2043', time: '2 hours 19 minutes' },
        { country: 'Sudan', code: 'SD', id: '2044', time: 'Variable' },
        { country: 'Syria', code: 'SY', id: '2045', time: '46 minutes' },
        { country: 'Tanzania', code: 'TZ', id: '2046', time: '1 hour 17 minutes' },
        { country: 'Trinidad and Tobago', code: 'TT', id: '2047', time: '2 hours 41 minutes' },
    ];
    
    // Premium rate services ($7.26 provider rate)
    const premiumServices = [
        { country: 'USA', code: 'US', id: '1961', time: '1 hour 5 minutes', premium: true },
        { country: 'South Korea', code: 'KR', id: '1962', time: '1 hour 38 minutes', premium: true, suffix: '[Premium Traffic]' },
    ];
    
    // Live Stream & Premiere services
    const liveServices = [
        {
            name: 'YouTube Live Views S2 (RAV™ - Real & Active Views, ULTRAFAST)',
            id: '2068',
            providerRate: 2.1428,
            min: 100000,
            max: 500000,
            time: '3 hours 8 minutes',
            type: 'YouTube Live Stream & Premiere Waiting'
        },
        {
            name: 'YouTube Live Views S1 (RAV™ - Real & Active Views)',
            id: '2067',
            providerRate: 3.7498,
            min: 1000,
            max: 100000,
            time: '1 hour 43 minutes',
            type: 'YouTube Live Stream & Premiere Waiting'
        },
        {
            name: 'YouTube Pre-Premiere Waitings (RAV™ - Real & Active Views)',
            id: '2069',
            providerRate: 3.7498,
            min: 1000,
            max: 100000,
            time: '2 hours 41 minutes',
            type: 'YouTube Live Stream & Premiere Waiting'
        },
        {
            name: 'Website 100% Real Traffic From Youtube',
            id: '764',
            providerRate: 0.248,
            min: 100,
            max: 1000000,
            time: '1 hour 15 minutes',
            type: 'YouTube Traffic'
        },
    ];
    
    console.log('📝 Adding standard country services...\n');
    
    // Add standard country services
    for (const svc of standardServices) {
        const providerRate = 3.4992;
        const rate = providerRate + MARKUP;
        
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: svc.id }
        });
        
        const serviceData = {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: `🇨🇦 YouTube Unique Views - ${svc.country} [RAV-GS™ - Real & Active Views]`.replace('🇨🇦', getFlag(svc.code)),
            platform: 'YOUTUBE',
            type: 'YouTube Unique Views by Country',
            rate: rate,
            providerRate: providerRate,
            minQuantity: 500,
            maxQuantity: 100000,
            providerServiceId: svc.id,
            averageTime: svc.time,
            isDripFeed: false,
            isRefill: false,
            isActive: true,
        };
        
        if (existing) {
            await prisma.service.update({ where: { id: existing.id }, data: serviceData });
            console.log(`🔄 Updated: ${svc.country} (ID ${svc.id}) - ₱${rate.toFixed(2)}`);
        } else {
            await prisma.service.create({ data: serviceData });
            console.log(`✅ Added: ${svc.country} (ID ${svc.id}) - ₱${rate.toFixed(2)}`);
        }
    }
    
    console.log('\n📝 Adding premium country services...\n');
    
    // Add premium country services
    for (const svc of premiumServices) {
        const providerRate = 7.26;
        const rate = providerRate + MARKUP;
        const suffix = svc.suffix || '';
        
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: svc.id }
        });
        
        const serviceData = {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: `${getFlag(svc.code)} YouTube Unique Views - ${svc.country} [RAV-GS™ - Real & Active Views]${suffix}`,
            platform: 'YOUTUBE',
            type: 'YouTube Unique Views by Country (Premium)',
            rate: rate,
            providerRate: providerRate,
            minQuantity: 500,
            maxQuantity: 100000,
            providerServiceId: svc.id,
            averageTime: svc.time,
            isDripFeed: false,
            isRefill: false,
            isActive: true,
        };
        
        if (existing) {
            await prisma.service.update({ where: { id: existing.id }, data: serviceData });
            console.log(`🔄 Updated: ${svc.country} (ID ${svc.id}) - ₱${rate.toFixed(2)}`);
        } else {
            await prisma.service.create({ data: serviceData });
            console.log(`✅ Added: ${svc.country} (ID ${svc.id}) - ₱${rate.toFixed(2)}`);
        }
    }
    
    console.log('\n📝 Adding Live Stream & Premiere services...\n');
    
    // Add live services
    for (const svc of liveServices) {
        const rate = svc.providerRate + MARKUP;
        
        const existing = await prisma.service.findFirst({
            where: { providerServiceId: svc.id }
        });
        
        const serviceData = {
            categoryId: youtubeCat.id,
            providerId: provider.id,
            name: svc.name,
            platform: 'YOUTUBE',
            type: svc.type,
            rate: rate,
            providerRate: svc.providerRate,
            minQuantity: svc.min,
            maxQuantity: svc.max,
            providerServiceId: svc.id,
            averageTime: svc.time,
            isDripFeed: false,
            isRefill: false,
            isActive: true,
        };
        
        if (existing) {
            await prisma.service.update({ where: { id: existing.id }, data: serviceData });
            console.log(`🔄 Updated: ${svc.name} (ID ${svc.id}) - ₱${rate.toFixed(2)}`);
        } else {
            await prisma.service.create({ data: serviceData });
            console.log(`✅ Added: ${svc.name} (ID ${svc.id}) - ₱${rate.toFixed(2)}`);
        }
    }
    
    // Clear Redis cache
    const Redis = require('ioredis');
    const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    await redis.flushall();
    await redis.quit();
    console.log('\n🗑️ Redis cache cleared!');
    
    const totalServices = standardServices.length + premiumServices.length + liveServices.length;
    console.log('\n' + '─'.repeat(50));
    console.log(`🎉 Tapos na! ${totalServices} YouTube services na-add!`);
    console.log('💰 Markup: ₱16 bawat service');
    console.log('─'.repeat(50));
}

function getFlag(code) {
    const flags = {
        'IT': '🇮🇹', 'LB': '🇱🇧', 'PK': '🇵🇰', 'FR': '🇫🇷', 'NP': '🇳🇵', 'MX': '🇲🇽',
        'DZ': '🇩🇿', 'BG': '🇧🇬', 'CA': '🇨🇦', 'DE': '🇩🇪', 'NL': '🇳🇱', 'GR': '🇬🇷',
        'ES': '🇪🇸', 'PL': '🇵🇱', 'CR': '🇨🇷', 'DO': '🇩🇴', 'SV': '🇸🇻', 'GE': '🇬🇪',
        'GH': '🇬🇭', 'GT': '🇬🇹', 'HN': '🇭🇳', 'HK': '🇭🇰', 'HU': '🇭🇺', 'IQ': '🇮🇶',
        'IL': '🇮🇱', 'JM': '🇯🇲', 'JO': '🇯🇴', 'KE': '🇰🇪', 'KW': '🇰🇼', 'PE': '🇵🇪',
        'PT': '🇵🇹', 'PR': '🇵🇷', 'QA': '🇶🇦', 'SG': '🇸🇬', 'SN': '🇸🇳', 'SI': '🇸🇮',
        'LK': '🇱🇰', 'SD': '🇸🇩', 'SY': '🇸🇾', 'TZ': '🇹🇿', 'TT': '🇹🇹', 'US': '🇺🇸',
        'KR': '🇰🇷',
    };
    return flags[code] || '🌍';
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
