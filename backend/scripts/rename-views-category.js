/**
 * Rename Views category to Views Monetization
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Renaming category...\n');
    
    const cat = await prisma.category.findFirst({ 
        where: { name: 'Views' } 
    });
    
    if (cat) {
        await prisma.category.update({ 
            where: { id: cat.id }, 
            data: { 
                name: 'Views Monetization', 
                slug: 'views-monetization' 
            } 
        });
        console.log('✅ Updated: Views -> Views Monetization');
    } else {
        console.log('❌ Views category not found');
    }
}

main()
    .catch((e) => console.error('Error:', e))
    .finally(() => prisma.$disconnect());
