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
    <div className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-500">{term}</dt>
      <dd
        className={`mt-1 sm:col-span-2 sm:mt-0 ${
          color === 'green'
            ? 'text-green-500'
            : color === 'red'
            ? 'text-red-500'
            : color === 'disabled'
            ? 'text-gray-500'
            : 'text-gray-900'
        }`}
      >
        {children ? children : '—'}
      </dd>
    </div>
  );
};

export default DescriptionListItem;
