/**
 * Check User in Database
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@smpanel.com';
  const password = process.argv[3] || 'Admin123!';

  try {
    console.log(`🔍 Checking user: ${email}\n`);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        role: true,
        status: true,
        balance: true,
      },
    });

    if (!user) {
      console.log('❌ User not found in database');
      console.log('\n💡 Creating admin user...');
      
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await prisma.user.create({
        data: {
          email,
          username: 'admin',
          password: hashedPassword,
          role: 'ADMIN',
          status: 'ACTIVE',
          balance: 100, // Give some initial balance
        },
      });

      console.log('✅ Admin user created!');
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Username: ${newUser.username}`);
      console.log(`   Role: ${newUser.role}`);
      console.log(`   Status: ${newUser.status}`);
      console.log(`   Balance: ${newUser.balance}`);
    } else {
      console.log('✅ User found!');
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Username: ${user.username}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Status: ${user.status}`);
      console.log(`   Balance: ${user.balance}`);

      // Test password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        console.log('\n✅ Password is correct!');
      } else {
        console.log('\n❌ Password is incorrect!');
        console.log('\n💡 Resetting password...');
        
        const hashedPassword = await bcrypt.hash(password, 12);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        
        console.log('✅ Password reset to:', password);
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        console.log(`\n⚠️  User status is ${user.status}, updating to ACTIVE...`);
        await prisma.user.update({
          where: { id: user.id },
          data: { status: 'ACTIVE' },
        });
        console.log('✅ User status updated to ACTIVE');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
