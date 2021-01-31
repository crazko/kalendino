import Head from 'next/head';

import { WithEvents } from '../app/event';
import { Showcase } from '../components/Showcase';

const title = 'All Events';

export const getServerSideProps = async () => {
  return {
    props: {
      events: [],
    },
  };
};

const Events: React.FC<WithEvents> = ({ events }) => {
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

export default Events;
