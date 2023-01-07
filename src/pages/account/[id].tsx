import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import Link from 'next/link';
import { RouterOutput, trpc } from '~/utils/trpc';

type AccountByIdOutput = RouterOutput['account']['byId'];
type TransactionByAccountIdOutput = RouterOutput['transaction']['byAccountId'];

const TransactionPreviewItems = (props: {
  transactions: TransactionByAccountIdOutput | undefined;
}) => {
  const { transactions } = props;

  return (
    <>
      {transactions &&
        transactions.map((transaction) => (
          <article key={transaction.id}>
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
              <dd>{transaction.timestamp.toLocaleString()}</dd>
            </dl>

            <Link href={`/transaction/${transaction?.id}`}>
              Transaction page
            </Link>
          </article>
        ))}
      ;
    </>
  );
};

const AccountItem = (props: {
  account: AccountByIdOutput;
  transactions: TransactionByAccountIdOutput | undefined;
}) => {
  const { account, transactions } = props;

  return (
    <>
      <h1>{account.name}</h1>
      <p>
        <em>{`Created on ${account.createdAt}`}</em>
      </p>
      <p>
        <em>{`Last updated on ${account.updatedAt}`}</em>
      </p>

      <dl>
        <dt>Type: </dt>
        <dd>{account.type?.name}</dd>
      </dl>
      <dl>
        <dt>Current Balance: </dt>
        <dd>
          {account.currentBalance.toLocaleString(undefined, {
            style: 'currency',
            currency: account.currency,
          })}
        </dd>
      </dl>
      <dl>
        <dt>Initial Balance: </dt>
        <dd>
          {account.initialBalance.toLocaleString(undefined, {
            style: 'currency',
            currency: account.currency,
          })}
        </dd>
      </dl>
      <dl>
        <dt>Currency</dt>
        <dd>{account.currency}</dd>
      </dl>
      <dl>
        <dt>Number of Transactions: </dt>
        <dd>{account.totalTransactions}</dd>
      </dl>

      <h2>Transactions</h2>

      <p>
        <em>{`Last transaction on ${account.latestTransactionAt}`}</em>
      </p>

      <TransactionPreviewItems transactions={transactions} />

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(account, null, 4)}</pre>
    </>
  );
};

const AccountViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const accountQuery = trpc.account.byId.useQuery({ id });
  const transactionsQuery = trpc.transaction.byAccountId.useQuery({
    accountId: id,
  });

  if (accountQuery.error) {
    return (
      <NextError
        title={accountQuery.error.message}
        statusCode={accountQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (accountQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const { data: accountData } = accountQuery;
  const { data: transactionsData } = transactionsQuery;

  return <AccountItem account={accountData} transactions={transactionsData} />;
};

export default AccountViewPage;
