const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testProviderBalance() {
    try {
        const provider = await prisma.provider.findFirst();

        if (!provider) {
            console.log('No provider found!');
            return;
        }

        console.log(`Testing connection to: ${provider.name}`);
        console.log(`API URL: ${provider.apiUrl}`);

        // Make API call to check balance
        const body = new URLSearchParams({
            key: provider.apiKey,
            action: 'balance'
        });

        const response = await fetch(provider.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        const data = await response.json();

        if (data.error) {
            console.log('\n❌ API Error:', data.error);
        } else {
            console.log('\n✅ API CONNECTION SUCCESSFUL!');
            console.log(`💰 Your Balance: $${data.balance} ${data.currency || 'USD'}`);

            // Update balance in database
            await prisma.provider.update({
                where: { id: provider.id },
                data: { balance: parseFloat(data.balance) }
            });
            console.log('Balance synced to database.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testProviderBalance();
