import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import Link from 'next/link';
import { RouterOutput, trpc } from '~/utils/trpc';
import TransactionPreviewItem from '~/components/TransactionPreviewItem';
import PageHeader from '~/components/PageHeader';

type AccountByIdOutput = RouterOutput['account']['byId'];
type TransactionByAccountIdOutput = RouterOutput['transaction']['byAccountId'];

const TransactionPreviewItems = (props: {
  transactions: TransactionByAccountIdOutput | undefined;
}) => {
  const { transactions } = props;

  return (
    <ul className="mt-6 overflow-hidden rounded-lg border">
      {transactions &&
        transactions.map((transaction) => (
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
  );
};

const AccountItem = (props: {
  account: AccountByIdOutput;
  transactions: TransactionByAccountIdOutput | undefined;
}) => {
  const { account, transactions } = props;

  return (
    <>
      <PageHeader header={account.name} subheader="Account" />

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
        <dl className="">
          <dt className="text-sm font-medium text-gray-500">Type</dt>
          <dd className="mt-1 font-medium text-gray-900">
            {account.type?.name}
          </dd>
        </dl>
        <dl className="">
          <dt className="text-sm font-medium text-gray-500">Current balance</dt>
          <dd
            className={`mt-1 font-medium text-gray-900 ${
              account.currentBalance > 0
                ? 'text-green-500'
                : account.currentBalance < 0
                ? 'text-red-500'
                : 'text-gray-900'
            }`}
          >
            {account.currentBalance.toLocaleString(undefined, {
              style: 'currency',
              currency: account.currency,
            })}
          </dd>
        </dl>
        {/* <dl className="">
          <dt className="font-medium text-gray-500">Initial Balance</dt>
          <dd className="mt-1 text-gray-900">
            {account.initialBalance.toLocaleString(undefined, {
              style: 'currency',
              currency: account.currency,
            })}
          </dd>
        </dl>
        <dl className="">
          <dt className="font-medium text-gray-500">Currency</dt>
          <dd className="mt-1 text-gray-900">{account.currency}</dd>
        </dl> */}
        <dl className="">
          <dt className="text-sm font-medium text-gray-500">
            Total transactions
          </dt>
          <dd className="mt-1 font-medium text-gray-900">
            {account.totalTransactions}
          </dd>
        </dl>
      </div>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Transactions</h2>

      <TransactionPreviewItems transactions={transactions} />

      <p className="mt-8 text-xs text-gray-300">
        {`Created on ${account.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${account.createdAt.toLocaleTimeString('en-US')}`}
      </p>
      <p className="text-xs text-gray-300">
        {`Last updated on ${account.updatedAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${account.updatedAt.toLocaleTimeString('en-US')}`}
      </p>

      {/* <h2>Raw data:</h2>
      <pre>{JSON.stringify(account, null, 4)}</pre> */}
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
