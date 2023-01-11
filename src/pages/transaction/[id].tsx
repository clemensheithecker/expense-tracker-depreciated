import NextError from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageHeader from '~/components/PageHeader';
import { NextPageWithLayout } from '~/pages/_app';
import { RouterOutput, trpc } from '~/utils/trpc';

type TransactionByIdOutput = RouterOutput['transaction']['byId'];

const TransactionItem = (props: { transaction: TransactionByIdOutput }) => {
  const { transaction } = props;

  return (
    <>
      <PageHeader header={transaction.name} subheader="Transaction" />

      <ul className="mt-6">
        <li>
          <dl className="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Account</dt>
            <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
              <Link href={`/account/${transaction.account.id}`}>
                {transaction.account.name}
              </Link>
            </dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Amount</dt>
            <dd
              className={`mt-1 sm:col-span-2 sm:mt-0 ${
                transaction.amount > 0
                  ? 'text-green-500'
                  : transaction.amount < 0
                  ? 'text-red-500'
                  : 'text-gray-900'
              }`}
            >
              {transaction.amount.toLocaleString(undefined, {
                style: 'currency',
                currency: transaction.account.currency,
              })}
            </dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Category</dt>
            <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
              {transaction.category?.name || 'NaN'}
            </dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">
              {transaction.amount > 0
                ? 'Payee'
                : transaction.amount < 0
                ? 'Receiver'
                : 'Involved party'}
            </dt>
            <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
              {transaction.involvedParty}
            </dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Timestamp</dt>
            <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
              {transaction.timestamp.toLocaleString('en-US')}
            </dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Payment method</dt>
            <dd>{transaction.paymentMethod?.name}</dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Note</dt>
            <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
              {transaction.note}
            </dd>
          </dl>
        </li>
        <li>
          <dl className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-500">Tags</dt>
            <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
              {transaction.tags.length === 0 ? (
                'NaN'
              ) : (
                <ul className="flex">
                  {transaction.tags.map((tag, index) => (
                    <li key={index} className="ml-2 first:ml-0">
                      <span className="rounded-md bg-indigo-100 px-2 py-1">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </dl>
        </li>
      </ul>

      <p className="mt-8 text-xs text-gray-300">
        {`Created on ${transaction.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${transaction.createdAt.toLocaleTimeString('en-US')}`}
      </p>
      <p className="text-xs text-gray-300">
        {`Last updated on ${transaction.updatedAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${transaction.updatedAt.toLocaleTimeString('en-US')}`}
      </p>

      {/* <h2>Raw data:</h2>
      <pre>{JSON.stringify(transaction, null, 4)}</pre> */}
    </>
  );
};

const TransactionViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const transactionQuery = trpc.transaction.byId.useQuery({ id });

  if (transactionQuery.error) {
    return (
      <NextError
        title={transactionQuery.error.message}
        statusCode={transactionQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (transactionQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = transactionQuery;
  return <TransactionItem transaction={data} />;
};

export default TransactionViewPage;
