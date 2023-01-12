const Tag = (props: { text: string }) => {
  const { text } = props;

  return (
    <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-900">
      {text}
    </span>
  );
};

export const TagListItem = (props: { text: string }) => {
  const { text } = props;

  return (
    <li className="ml-2 first:ml-0">
      <Tag text={text} />
    </li>
  );
};

export default Tag;
