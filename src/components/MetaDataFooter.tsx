const MetaDataFooter = (props: { listItems: JSX.Element[] }) => {
  const { listItems } = props;

  return <ul className="text-xs text-gray-500">{listItems}</ul>;
};

export default MetaDataFooter;
