import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import { RouterOutput, trpc } from '~/utils/trpc';
import TransactionPreviewItem from '~/components/TransactionPreviewItem';
import PageHeader from '~/components/PageHeader';
import MetaDataFooter from '~/components/MetaDataFooter';

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

  const metaDataListItems = [
    <li key="createdAt">
      <p>
        {`Created on ${account.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${account.createdAt.toLocaleTimeString('en-US')}`}
      </p>
    </li>,
    <li key="updatedAt">
      <p>
        {`Last updated on ${account.updatedAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${account.updatedAt.toLocaleTimeString('en-US')}`}
      </p>
    </li>,
  ];

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
        <dl className="">
          <dt className="text-sm font-medium text-gray-500">
            Total transactions
          </dt>
          <dd className="mt-1 font-medium text-gray-900">
            {account.totalTransactions}
          </dd>
        </dl>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
        <div>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add transaction
          </button>
        </div>
      </div>
      <TransactionPreviewItems transactions={transactions} />
      <div className="mt-8">
        <MetaDataFooter listItems={metaDataListItems} />
      </div>
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
