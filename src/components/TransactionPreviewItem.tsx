import Link from 'next/link';

const TransactionPreviewItem = (props: {
  id: string;
  name: string;
  amount: number;
  category: { name?: string };
  timestamp: Date;
}) => {
  const { id, name, amount, category, timestamp } = props;

  return (
    <article>
      <h2>{name}</h2>
      <dl>
        <dt>Amount: </dt>
        <dd>{amount}</dd>
      </dl>
      <dl>
        <dt>Category: </dt>
        <dd>{category?.name || 'NaN'}</dd>
      </dl>
      <dl>
        <dt>Timestamp: </dt>
        <dd>{timestamp.toString()}</dd>
      </dl>

      <Link href={`/transaction/${id}`}>Transaction page</Link>
    </article>
  );
};

export default TransactionPreviewItem;
