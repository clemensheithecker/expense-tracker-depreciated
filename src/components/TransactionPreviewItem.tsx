import Link from 'next/link';

const TransactionPreviewItem = (props: {
  id: string;
  name: string;
  amount: number;
  category: { name?: string };
  timestamp: Date;
  currency: string;
}) => {
  const { id, name, amount, category, timestamp, currency } = props;

  return (
    <Link href={`/transaction/${id}`}>
      <article className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 focus:bg-gray-50">
        <div>
          <h2 className="font-medium text-gray-900">{name}</h2>
          <p className="mt-1 text-xs text-gray-500">
            <span>
              {timestamp.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            {category.name !== undefined && (
              <span className="ml-2">{category.name}</span>
            )}
          </p>
        </div>
        <p
          className={`font-medium ${
            amount > 0
              ? 'text-green-500'
              : amount < 0
              ? 'text-red-500'
              : 'text-gray-900'
          }`}
        >
          {amount.toLocaleString('en-US', {
            style: 'currency',
            currency,
            signDisplay: 'exceptZero',
          })}
        </p>
      </article>
    </Link>
  );
};

export default TransactionPreviewItem;
