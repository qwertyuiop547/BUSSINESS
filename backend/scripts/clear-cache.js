const Redis = require('ioredis');
const redis = new Redis();

async function main() {
    console.log('Clearing all Redis cache...');
    await redis.flushall();
    console.log('✅ Redis cache cleared!');
    
    // Also clear specific service keys if any
    const keys = await redis.keys('*service*');
    console.log(`Found ${keys.length} service-related keys`);
    
    const allKeys = await redis.keys('*');
    console.log(`Total keys in Redis: ${allKeys.length}`);
    
    await redis.quit();
}

main();
