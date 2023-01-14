const StatsItem = (props: {
  label: string;
  value: string;
  color?: 'green' | 'red';
}) => {
  const { label, value, color } = props;

  return (
    <dl className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-800">
      <dt className="text-xs leading-6 text-gray-500 dark:text-gray-400">
        {label}
      </dt>
      <dd
        className={`text-xl font-medium ${
          color === 'green'
            ? 'text-green-500'
            : color === 'red'
            ? 'text-red-500'
            : 'text-inherit'
        }`}
      >
        {value}
      </dd>
    </dl>
  );
};

export default StatsItem;
