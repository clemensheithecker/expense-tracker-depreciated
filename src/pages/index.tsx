import PageHeader from '~/components/PageHeader';
import { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <PageHeader header="Expense Tracker" />
    </>
  );
};

export default IndexPage;
