import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultTransactionSelect = Prisma.validator<Prisma.TransactionSelect>()({
  id: true,
  account: {
    select: {
      id: true,
      name: true,
      type: true,
      typeId: false,
      currentBalance: true,
      initialBalance: false,
      currency: true,
      totalTransactions: false,
      latestTransactionAt: false,
      transactions: false,
      incomingTransfers: false,
      outgoingTransfers: false,
      createdAt: false,
      updatedAt: false,
    },
  },
  accountId: false,
  name: true,
  amount: true,
  category: true,
  categoryId: false,
  involvedParty: true,
  timestamp: true,
  paymentMethod: true,
  paymentMethodId: false,
  note: true,
  tags: true,
  createdAt: true,
  updatedAt: true,
});

export const transactionRouter = router({
  list: publicProcedure.query(async () => {
    const items = await prisma.transaction.findMany({
      select: defaultTransactionSelect,
      where: {},
      orderBy: {
        timestamp: 'desc',
      },
    });

    return items;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const transaction = await prisma.transaction.findUnique({
        where: { id },
        select: defaultTransactionSelect,
      });

      if (!transaction) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No transaction with id ${id}',
        });
      }

      return transaction;
    }),
  byAccountId: publicProcedure
    .input(z.object({ accountId: z.string() }))
    .query(async ({ input }) => {
      const { accountId } = input;
      const items = await prisma.transaction.findMany({
        select: defaultTransactionSelect,
        where: {
          accountId,
        },
        orderBy: {
          timestamp: 'desc',
        },
      });

      return items;
    }),
});
