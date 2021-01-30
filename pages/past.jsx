import Head from 'next/head';

import data from '../data';
import { Showcase } from '../components/Showcase';

const title = 'Past Events';

export const getStaticProps = async () => {
  return {
    props: {
      events: data,
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
