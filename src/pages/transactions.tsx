import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import TransactionPreviewItem from '~/components/TransactionPreviewItem';
import type { AppRouter } from '~/server/routers/_app';

const TransactionsPage: NextPageWithLayout = () => {
  const transactionsQuery = trpc.transaction.list.useQuery();

  return (
    <>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Transactions</h1>

      {transactionsQuery.status === 'loading' && '(loading)'}

      <ul className="mt-6 overflow-hidden rounded-lg border">
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
      </ul>
    </>
  );
};

export default TransactionsPage;
