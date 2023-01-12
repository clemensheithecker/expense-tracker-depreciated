const StatsItem = (props: {
  label: string;
  value: string;
  color?: 'green' | 'red';
}) => {
  const { label, value, color } = props;

  return (
    <dl className="rounded-lg border p-4 shadow-sm">
      <dt className="text-xs leading-6 text-gray-500">{label}</dt>
      <dd
        className={`text-xl font-medium ${
          color === 'green'
            ? 'text-green-500'
            : color === 'red'
            ? 'text-red-500'
            : 'text-gray-900'
        }`}
      >
        {value}
      </dd>
    </dl>
  );
};

export default StatsItem;
