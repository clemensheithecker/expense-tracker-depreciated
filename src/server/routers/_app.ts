/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { accountRouter } from './account';
import { postRouter } from './post';
import { transactionRouter } from './transaction';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  account: accountRouter,
  post: postRouter,
  transaction: transactionRouter,
});

export type AppRouter = typeof appRouter;
