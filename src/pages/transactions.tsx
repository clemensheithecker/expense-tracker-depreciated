import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import PageHeader from '~/components/PageHeader';
import PreviewItemList from '~/components/PreviewItemList';
import TransactionPreviewItem from '~/components/TransactionPreviewItem';
import type { AppRouter } from '~/server/routers/_app';

const TransactionsPage: NextPageWithLayout = () => {
  const transactionsQuery = trpc.transaction.list.useQuery();

  return (
    <>
      <PageHeader header="Transactions" />

      {transactionsQuery.status === 'loading' && '(loading)'}

      <div className="mt-8">
        <PreviewItemList>
          <>
            {transactionsQuery.data?.map((transaction) => (
              <li key={transaction.id}>
                <TransactionPreviewItem
                  id={transaction.id}
                  name={transaction.name}
                  amount={transaction.amount}
                  category={{ name: transaction.category?.name }}
                  timestamp={transaction.timestamp}
                  currency={transaction.account.currency}
                />
              </li>
            ))}
          </>
        </PreviewItemList>
      </div>
    </>
  );
};

export default TransactionsPage;
