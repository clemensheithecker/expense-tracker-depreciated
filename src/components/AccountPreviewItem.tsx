import PreviewItem from './PreviewItem';

const AccountPreviewItem = (props: {
  id: string;
  name: string;
  type: { name?: string };
  currentBalance: number;
  currency: string;
  totalTransactions: number;
}) => {
  const { id, name, type, currentBalance, currency, totalTransactions } = props;

  return (
    <PreviewItem href={`/account/${id}`}>
      <div>
        <h2 className="font-medium text-gray-900">{name}</h2>
        <p className="mt-1 text-xs text-gray-500">
          {type.name !== undefined && <span className="mr-2">{type.name}</span>}
          <span>
            {totalTransactions.toLocaleString('en-US') +
              `${totalTransactions === 1 ? ' transaction' : ' transactions'}`}
          </span>
        </p>
      </div>
      <p
        className={`font-medium ${
          currentBalance > 0
            ? 'text-green-500'
            : currentBalance < 0
            ? 'text-red-500'
            : 'text-gray-900'
        }`}
      >
        {currentBalance.toLocaleString('en-US', {
          style: 'currency',
          currency,
        })}
      </p>
    </PreviewItem>
  );
};

export default AccountPreviewItem;
