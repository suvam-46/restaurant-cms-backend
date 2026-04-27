import prisma from '../src/lib/prisma';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    const sites = await prisma.site.findMany();
    console.log('Current Sites:', JSON.stringify(sites, null, 2));
  } catch (err) {
    console.error('Check Error:', err);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
