import Head from 'next/head';

import { Heading } from 'components/Heading';

const title = 'Not Found';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Heading>{title}</Heading>
    </>
  );
};

export default NotFoundPage;
