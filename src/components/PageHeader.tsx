const PageHeader = (props: { header: string; subheader?: string }) => {
  const { header, subheader } = props;

  return (
    <>
      <h1 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
        {header}
      </h1>
      {subheader && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {subheader}
        </p>
      )}
    </>
  );
};

export default PageHeader;
