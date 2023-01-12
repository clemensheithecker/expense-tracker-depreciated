import Link from 'next/link';

const PreviewItem = (props: { href: string; children: React.ReactNode }) => {
  const { href, children } = props;

  return (
    <Link href={href} className="group focus:outline-none">
      <article className="bg-white p-1 hover:bg-gray-50">
        <div className="flex flex-row items-center justify-between rounded p-4 group-focus:ring-2 group-focus:ring-indigo-500">
          {children}
        </div>
      </article>
    </Link>
  );
};

export default PreviewItem;
