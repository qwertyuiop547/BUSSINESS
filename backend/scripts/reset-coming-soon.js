const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
    const result = await p.setting.deleteMany({
        where: { key: { startsWith: 'coming_soon' } }
    });
    console.log('Reset complete! Deleted', result.count, 'entries');
}

main().finally(() => p.$disconnect());
