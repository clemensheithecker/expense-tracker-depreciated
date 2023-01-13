import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import AccountPreviewItem from '~/components/AccountPreviewItem';
import PageHeader from '~/components/PageHeader';
import PreviewItemList from '~/components/PreviewItemList';
import type { AppRouter } from '~/server/routers/_app';

const AccountsPage: NextPageWithLayout = () => {
  const accountsQuery = trpc.account.list.useQuery();

  return (
    <>
      <PageHeader header="Accounts" />

      {accountsQuery.status === 'loading' && '(loading)'}

      <div className="mt-8">
        <PreviewItemList>
          <>
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
              </li>
            ))}
          </>
        </PreviewItemList>
      </div>
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
