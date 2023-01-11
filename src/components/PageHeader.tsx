const PageHeader = (props: { header: string; subheader?: string }) => {
  const { header, subheader } = props;

  return (
    <>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">{header}</h1>
      {subheader && <p className="mt-1 text-gray-500">{subheader}</p>}
    </>
  );
};

export default PageHeader;
