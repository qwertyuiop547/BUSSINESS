const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const services = await prisma.service.findMany({
        where: { 
            providerServiceId: { in: ['4749', '4750', '4751', '4752', '4753', '4754', '4755', '4756', '4757', '4758'] }
        },
        select: { providerServiceId: true, name: true, rate: true, providerRate: true }
    });
    
    console.log('Twitter Video Views services in DB:\n');
    for (const s of services) {
        console.log(`ID ${s.providerServiceId}: rate=₱${s.rate}, providerRate=₱${s.providerRate}`);
    }
}

main().finally(() => prisma.$disconnect());
