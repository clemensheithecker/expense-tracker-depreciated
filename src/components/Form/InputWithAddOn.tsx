const InputWithAddOn = (props: {
  label: string;
  name: string;
  placeholder: string;
}) => {
  const { label, name, placeholder } = props;

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name={name}
          id={name}
          className="block w-full rounded-md border-gray-300 bg-white pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputWithAddOn;
