const Textarea = (props: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
}) => {
  const { label, name, placeholder, defaultValue } = props;
  const rows = props.rows || 3;

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={name}
          name={name}
          rows={rows}
          className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default Textarea;
