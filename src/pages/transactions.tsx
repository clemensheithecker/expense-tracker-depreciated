import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
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
            <article>
              <h2>{transaction.name}</h2>
              <dl>
                <dt>Amount: </dt>
                <dd>{transaction.amount}</dd>
              </dl>
              <dl>
                <dt>Category: </dt>
                <dd>{transaction.category?.name || 'NaN'}</dd>
              </dl>
              <dl>
                <dt>Timestamp: </dt>
                <dd>{transaction.timestamp.toString()}</dd>
              </dl>
              <dl>
                <dt>Account: </dt>
                <dd>{transaction.account.name}</dd>
              </dl>

              <Link href={`/transaction/${transaction.id}`}>
                Transaction page
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionsPage;
