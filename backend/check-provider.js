const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProvider() {
    try {
        const providers = await prisma.provider.findMany();
        console.log('=== PROVIDERS ===');
        providers.forEach(p => {
            console.log(`\nID: ${p.id}`);
            console.log(`Name: ${p.name}`);
            console.log(`API URL: ${p.apiUrl}`);
            console.log(`API Key: ${p.apiKey ? p.apiKey.substring(0, 10) + '...' : 'NOT SET'}`);
            console.log(`Status: ${p.status}`);
            console.log(`Balance: ${p.balance}`);
        });

        if (providers.length === 0) {
            console.log('No providers configured! You need to add a provider in the admin panel.');
        }

        // Count services linked to providers
        const services = await prisma.service.findMany({
            where: { providerId: { not: null } },
            select: { id: true, name: true, providerServiceId: true, providerId: true }
        });

        console.log(`\n=== SERVICES WITH PROVIDER ===`);
        console.log(`Total services linked to provider: ${services.length}`);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkProvider();
