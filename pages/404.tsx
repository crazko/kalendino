import Head from 'next/head';

import { Container } from 'components/Container';
import { Heading } from 'components/Heading';

const title = 'Not Found';

const NotFoundPage = () => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>

      <Heading>{title}</Heading>
    </Container>
  );
};

export default NotFoundPage;
