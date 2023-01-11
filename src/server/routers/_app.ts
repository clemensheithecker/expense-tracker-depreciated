/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { accountRouter } from './account';
import { transactionRouter } from './transaction';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  account: accountRouter,
  transaction: transactionRouter,
});

export type AppRouter = typeof appRouter;
