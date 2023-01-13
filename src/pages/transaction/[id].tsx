import NextError from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DescriptionListItem from '~/components/DescriptionListItem';
import MetaDataFooter from '~/components/MetaDataFooter';
import PageHeader from '~/components/PageHeader';
import { TagListItem } from '~/components/Tag';
import { NextPageWithLayout } from '~/pages/_app';
import { RouterOutput, trpc } from '~/utils/trpc';

type TransactionByIdOutput = RouterOutput['transaction']['byId'];

const TransactionItem = (props: { transaction: TransactionByIdOutput }) => {
  const { transaction } = props;

  const metaDataListItems = [
    <li key="createdAt">
      <p>
        {`Created on ${transaction.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${transaction.createdAt.toLocaleTimeString('en-US')}`}
      </p>
    </li>,
    <li key="updatedAt">
      <p>
        {`Last updated on ${transaction.updatedAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} at ${transaction.updatedAt.toLocaleTimeString('en-US')}`}
      </p>
    </li>,
  ];

  const transactionPropsListItems = [
    <DescriptionListItem key="accountName" term={'Account'}>
      <Link
        href={`/account/${transaction.account.id}`}
        className="rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {transaction.account.name}
      </Link>
    </DescriptionListItem>,
    <DescriptionListItem
      key="amount"
      term={'Amount'}
      definitionProps={{
        color:
          transaction.amount > 0
            ? 'green'
            : transaction.amount < 0
            ? 'red'
            : 'neutral',
      }}
    >
      {transaction.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: transaction.account.currency,
      })}
    </DescriptionListItem>,
    <DescriptionListItem key="categoryName" term={'Category'}>
      {transaction.category?.name || undefined}
    </DescriptionListItem>,
    <DescriptionListItem
      key="involvedParty"
      term={
        transaction.amount > 0
          ? 'Payee'
          : transaction.amount < 0
          ? 'Receiver'
          : 'Involved party'
      }
    >
      {transaction.involvedParty}
    </DescriptionListItem>,
    <DescriptionListItem key="timestamp" term={'Timestamp'}>
      {`${transaction.timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })} at ${transaction.timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}`}
    </DescriptionListItem>,
    <DescriptionListItem key="paymentMethodName" term={'Payment method'}>
      {transaction.paymentMethod?.name || undefined}
    </DescriptionListItem>,
    <DescriptionListItem key="note" term={'Note'}>
      {transaction?.note || undefined}
    </DescriptionListItem>,
    <DescriptionListItem key="tags" term={'Tags'}>
      {transaction.tags.length === 0 ? undefined : (
        <ul className="flex">
          {transaction.tags.map((tag, index) => (
            <TagListItem key={index} text={tag} />
          ))}
        </ul>
      )}
    </DescriptionListItem>,
  ];

  return (
    <>
      <PageHeader header="Transaction" />
      <div className="mt-8 overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {transaction.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {`${
              transaction.amount > 0
                ? 'From '
                : transaction.amount < 0
                ? 'To '
                : ''
            }${transaction.involvedParty}`}
          </p>
        </div>
        <dl className="border-t">{transactionPropsListItems}</dl>
        <div className="flex justify-end border-t px-4 py-5 sm:px-6">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
            Edit
          </button>
          <button
            type="button"
            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 py-2 px-4 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-inherit"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
      <div className="mt-8">
        <MetaDataFooter listItems={metaDataListItems} />
      </div>
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
