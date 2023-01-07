import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultAccountSelect = Prisma.validator<Prisma.AccountSelect>()({
  id: true,
  name: true,
  type: true,
  typeId: false,
  currentBalance: true,
  initialBalance: true,
  currency: true,
  totalTransactions: true,
  latestTransactionAt: true,
  transactions: false,
  incomingTransfers: false,
  outgoingTransfers: false,
  createdAt: true,
  updatedAt: true,
});

export const accountRouter = router({
  list: publicProcedure.query(async () => {
    const items = await prisma.account.findMany({
      select: defaultAccountSelect,
      where: {},
      orderBy: {
        name: 'asc',
      },
    });

    return items;
  }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const account = await prisma.account.findUnique({
        where: { id },
        select: defaultAccountSelect,
      });

      if (!account) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No account with id ${id}',
        });
      }

      return account;
    }),
});
