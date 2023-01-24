const Input = (props: {
  label: string;
  name: string;
  autocomplete?: string;
  placeholder?: string;
}) => {
  const { label, name, autocomplete, placeholder } = props;

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        autoComplete={autocomplete}
        className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm"
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
