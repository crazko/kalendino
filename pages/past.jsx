import Head from 'next/head';

import { Showcase } from '../components/Showcase';

const title = 'Past Events';

export const getServerSideProps = async () => {
  return {
    props: {
      events: [],
    },
  };
};

const Past = ({ events }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      <Showcase events={events} />
    </>
  );
};

export default Past;
