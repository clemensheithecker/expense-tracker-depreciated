import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';
import { RouterOutput, trpc } from '~/utils/trpc';
import TransactionPreviewItem from '~/components/TransactionPreviewItem';
import PageHeader from '~/components/PageHeader';
import MetaDataFooter from '~/components/MetaDataFooter';
import StatsItem from '~/components/StatsItem';
import PreviewItemList from '~/components/PreviewItemList';

type AccountByIdOutput = RouterOutput['account']['byId'];
type TransactionByAccountIdOutput = RouterOutput['transaction']['byAccountId'];

const TransactionPreviewItems = (props: {
  transactions: TransactionByAccountIdOutput | undefined;
}) => {
  const { transactions } = props;

  return (
    <div className="mt-4">
      <PreviewItemList>
        <>
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
        </>
      </PreviewItemList>
    </div>
  );
};

const AccountItem = (props: {
  account: AccountByIdOutput;
  transactions: TransactionByAccountIdOutput | undefined;
}) => {
  const { account, transactions } = props;

  type StatsItem = {
    key: string;
    label: string;
    value: string;
    color?: 'green' | 'red' | undefined;
  };

  const statsItems: StatsItem[] = [
    {
      key: 'accountTypeName',
      label: 'Type',
      value: account.type?.name || '—',
    },
    {
      key: 'currentBalance',
      label: 'Current balance',
      value: account.currentBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: account.currency,
      }),
      color:
        account.currentBalance > 0
          ? 'green'
          : account.currentBalance < 0
          ? 'red'
          : undefined,
    },
    {
      key: 'totalTransactions',
      label: 'Total transactions',
      value: account.totalTransactions.toLocaleString('en-US'),
    },
  ];

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
      <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {statsItems.map((statsItem) => (
          <StatsItem
            key={statsItem.key}
            label={statsItem.label}
            value={statsItem.value}
            color={statsItem.color}
          />
        ))}
      </section>
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
          <div>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-inherit"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Add transaction
            </button>
          </div>
        </div>
        <TransactionPreviewItems transactions={transactions} />
      </section>
      <section className="mt-8">
        <MetaDataFooter listItems={metaDataListItems} />
      </section>
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
