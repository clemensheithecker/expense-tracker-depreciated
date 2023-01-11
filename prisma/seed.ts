/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cashPaymentMethodId = 'd42b806e-7e3e-47c3-8127-1272b1596419';
  const checkingAccountTypeId = '4011c463-e51d-4736-b83e-941bfc39a0f3';
  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  const firstTransactionId = '0d08dcb6-0d68-454c-a712-a4ad0bafe4ae';
  const householdAccountId = '98e7b57e-c88b-45f0-b1f2-d583ca7a0943';
  const laundryCategoryId = '6946c8cf-2f4d-405f-9afa-046f2fa2480d';
  const secondTransactionId = '7cdee75e-98d3-4bd0-8522-b2f9a3b7eb3d';

  await prisma.accountType.upsert({
    where: {
      id: checkingAccountTypeId,
    },
    create: {
      id: checkingAccountTypeId,
      name: 'Checking',
    },
    update: {},
  });

  await prisma.account.upsert({
    where: {
      id: householdAccountId,
    },
    create: {
      id: householdAccountId,
      name: 'Household',
      typeId: checkingAccountTypeId,
      currentBalance: 34.06,
      initialBalance: 100,
      totalTransactions: 2,
      latestTransactionAt: new Date('2023-01-07T14:29:00'),
    },
    update: {},
  });

  await prisma.transactionCategory.upsert({
    where: {
      id: laundryCategoryId,
    },
    create: {
      id: laundryCategoryId,
      name: 'Laundry',
    },
    update: {},
  });

  await prisma.paymentMethod.upsert({
    where: {
      id: cashPaymentMethodId,
    },
    create: {
      id: cashPaymentMethodId,
      name: 'Cash',
      type: 'NEUTRAL',
    },
    update: {},
  });

  await prisma.transaction.upsert({
    where: {
      id: firstTransactionId,
    },
    create: {
      id: firstTransactionId,
      accountId: householdAccountId,
      name: 'Groceries',
      amount: -47.95,
      involvedParty: 'Whole Foods',
      timestamp: new Date('2023-01-06'),
      paymentMethodId: cashPaymentMethodId,
      note: 'Bought bananas, apples, and milk',
      tags: ['food', 'groceries'],
    },
    update: {},
  });

  await prisma.transaction.upsert({
    where: {
      id: secondTransactionId,
    },
    create: {
      id: secondTransactionId,
      accountId: householdAccountId,
      name: 'Dry Cleaning',
      amount: -17.99,
      categoryId: laundryCategoryId,
      involvedParty: 'Laundromat',
      timestamp: new Date('2023-01-07T14:29:00'),
      paymentMethodId: cashPaymentMethodId,
      note: 'Picked up white dress shirt and pants',
      tags: ['laundry', 'cleaning', 'clothes'],
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
