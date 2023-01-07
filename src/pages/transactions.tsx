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
      <h1>Transactions</h1>
      <p>A list of all transactions.</p>

      {transactionsQuery.status === 'loading' && '(loading)'}

      <ul>
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
