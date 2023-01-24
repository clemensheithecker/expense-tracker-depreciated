const SelectInput = (props: {
  label: string;
  name: string;
  options: string[];
}) => {
  const { label, name, options, ...rest } = props;

  const uniqueOptions = [...new Set(options.map((option) => option.trim()))];

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        autoComplete="account-name"
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm"
        {...rest}
      >
        {uniqueOptions.map((option) => {
          const value = option
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^a-z0-9-]/gi, '');

          return (
            <option key={value} value={value}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectInput;
