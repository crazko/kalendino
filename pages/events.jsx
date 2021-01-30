import Head from 'next/head';

import data from '../data';
import { Showcase } from '../components/Showcase';

const title = 'All Events';

export const getStaticProps = async () => {
  return {
    props: {
      events: data,
    },
  };
};

const Events = ({ events }) => {
  return (
    <>
      <Head>
        <title>Upcoming Events</title>
      </Head>

      <h1>{title}</h1>

      <Showcase events={events} />
    </>
  );
};

export default Events;
