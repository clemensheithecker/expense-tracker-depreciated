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
      <Link href={`/account/${transaction.account.id}`}>
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
      <PageHeader header={transaction.name} subheader="Transaction" />
      <dl className="mt-6">{transactionPropsListItems}</dl>
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
