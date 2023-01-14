type Colors = 'neutral' | 'green' | 'red' | 'disabled';

const DescriptionListItem = (props: {
  term: string;
  definitionProps?: {
    color?: Colors;
  };
  children?: string | JSX.Element;
}) => {
  const { term, definitionProps, children } = props;
  const { color = children ? 'neutral' : 'disabled' } = definitionProps || {};

  return (
    <div className="px-4 py-5 odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {term}
      </dt>
      <dd
        className={`mt-1 text-sm sm:col-span-2 sm:mt-0 ${
          color === 'green'
            ? 'text-green-500'
            : color === 'red'
            ? 'text-red-500'
            : color === 'disabled'
            ? 'text-gray-500 dark:text-gray-400'
            : 'text-inherit'
        }`}
      >
        {children ? children : '—'}
      </dd>
    </div>
  );
};

export default DescriptionListItem;
