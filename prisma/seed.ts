/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  const householdAccountId = '98e7b57e-c88b-45f0-b1f2-d583ca7a0943';

  await prisma.account.upsert({
    where: {
      id: householdAccountId,
    },
    create: {
      id: householdAccountId,
      name: 'Household',
      currentBalance: 0,
      initialBalance: 0,
    },
    update: {},
  });

  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`',
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
