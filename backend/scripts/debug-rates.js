const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Checking service rates in database...\n');
    
    const services = await prisma.service.findMany({
        take: 10,
        select: {
            id: true,
            name: true,
            rate: true,
            providerRate: true,
            minQuantity: true,
            maxQuantity: true,
            isActive: true
        }
    });
    
    console.log('Sample services from DB:');
    services.forEach(s => {
        console.log(`- ${s.name.substring(0, 50)}...`);
        console.log(`  Rate: ${s.rate}, ProviderRate: ${s.providerRate}, Active: ${s.isActive}`);
    });
    
    // Count services with rate = 0
    const zeroRateCount = await prisma.service.count({
        where: { rate: 0 }
    });
    
    const totalCount = await prisma.service.count();
    
    console.log(`\nTotal services: ${totalCount}`);
    console.log(`Services with rate = 0: ${zeroRateCount}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
