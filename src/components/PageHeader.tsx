const PageHeader = (props: { header: string; subheader?: string }) => {
  const { header, subheader } = props;

  return (
    <>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {header}
      </h1>
      {subheader && <p className="mt-2 text-sm text-gray-500">{subheader}</p>}
    </>
  );
};

export default PageHeader;
