const PreviewItemList = (props: { children?: JSX.Element }) => {
  const { children } = props;

  return (
    <ul className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
      {children}
    </ul>
  );
};

export default PreviewItemList;
