import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import AccountPreviewItem from '~/components/AccountPreviewItem';
import PageHeader from '~/components/PageHeader';
import type { AppRouter } from '~/server/routers/_app';

const AccountsPage: NextPageWithLayout = () => {
  const accountsQuery = trpc.account.list.useQuery();

  return (
    <>
      <PageHeader header="Accounts" />

      {accountsQuery.status === 'loading' && '(loading)'}

      <ul className="mt-6 overflow-hidden rounded-lg border">
        {accountsQuery.data?.map((account) => (
          <li key={account.id}>
            <AccountPreviewItem
              id={account.id}
              name={account.name}
              type={{ name: account.type?.name }}
              currentBalance={account.currentBalance}
              currency={account.currency}
              totalTransactions={account.totalTransactions}
            />
            {/* <article>
              <h2>{account.name}</h2>
              <dl>
                <dt>Type: </dt>
                <dd>{account.type?.name}</dd>
              </dl>
              <dl>
                <dt>Balance: </dt>
                <dd>
                  {account.currentBalance.toLocaleString(undefined, {
                    style: 'currency',
                    currency: account.currency,
                  })}
                </dd>
              </dl>
              <dl>
                <dt>Number of Transactions: </dt>
                <dd>{account.totalTransactions}</dd>
              </dl>
              <Link href={`/account/${account.id}`}>Account page</Link>
            </article> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccountsPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
