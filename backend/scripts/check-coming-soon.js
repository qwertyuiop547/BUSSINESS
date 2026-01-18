const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
    const settings = await p.setting.findMany({
        where: { key: { startsWith: 'coming_soon' } }
    });
    console.log('Coming Soon counts in database:');
    settings.forEach(s => {
        console.log(`  ${s.key}: ${s.value?.count || 0}`);
    });
    if (settings.length === 0) {
        console.log('  (No coming soon entries yet)');
    }
}

main().finally(() => p.$disconnect());
