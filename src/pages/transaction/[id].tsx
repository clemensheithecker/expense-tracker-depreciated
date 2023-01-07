import NextError from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '~/pages/_app';
import { RouterOutput, trpc } from '~/utils/trpc';

type TransactionByIdOutput = RouterOutput['transaction']['byId'];

const TransactionItem = (props: { transaction: TransactionByIdOutput }) => {
  const { transaction } = props;

  return (
    <>
      <h1>{transaction.name}</h1>
      <p>
        <em>{`Created on ${transaction.createdAt}`}</em>
      </p>
      <p>
        <em>{`Last updated on ${transaction.updatedAt}`}</em>
      </p>

      <ul>
        <li>
          <dl>
            <dt>Account: </dt>
            <dd>
              <Link href={`/account/${transaction.account.id}`}>
                {transaction.account.name}
              </Link>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Amount: </dt>
            <dd>
              {transaction.amount.toLocaleString(undefined, {
                style: 'currency',
                currency: transaction.account.currency,
              })}
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Category: </dt>
            <dd>{transaction.category?.name || 'NaN'}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              {transaction.amount > 0
                ? 'Payee'
                : transaction.amount < 0
                ? 'Receiver'
                : 'Involved Party'}
            </dt>
            <dd>{transaction.involvedParty}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Timestamp: </dt>
            <dd>{transaction.timestamp.toString()}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Payment Method: </dt>
            <dd>{transaction.paymentMethod?.name}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Note: </dt>
            <dd>{transaction.note}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Tags: </dt>
            <dd>
              {transaction.tags.length === 0 ? (
                'NaN'
              ) : (
                <ul>
                  {transaction.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              )}
            </dd>
          </dl>
        </li>
      </ul>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(transaction, null, 4)}</pre>
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
