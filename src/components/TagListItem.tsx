const TagListItem = (props: { tag: string }) => {
  const { tag } = props;

  return (
    <li className="ml-2 first:ml-0">
      <span className="rounded-md bg-indigo-100 px-2 py-1">{tag}</span>
    </li>
  );
};

export default TagListItem;
