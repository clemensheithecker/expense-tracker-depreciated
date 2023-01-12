import NextError from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DescriptionListItem from '~/components/DescriptionListItem';
import MetaDataFooter from '~/components/MetaDataFooter';
import PageHeader from '~/components/PageHeader';
import TagListItem from '~/components/TagListItem';
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
            <TagListItem key={index} tag={tag} />
          ))}
        </ul>
      )}
    </DescriptionListItem>,
  ];

  return (
    <>
      <PageHeader header="Transaction" />
      <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-sm">
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
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Edit
          </button>
          <button
            type="button"
            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 py-2 px-4 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
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
