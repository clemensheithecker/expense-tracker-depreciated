import PreviewItem from './PreviewItem';

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
    <PreviewItem href={`/transaction/${id}`}>
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
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
    </PreviewItem>
  );
};

export default TransactionPreviewItem;
