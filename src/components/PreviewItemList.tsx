const PreviewItemList = (props: { children?: JSX.Element }) => {
  const { children } = props;

  return (
    <ul className="overflow-hidden rounded-lg border shadow-sm">{children}</ul>
  );
};

export default PreviewItemList;
