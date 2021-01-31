import Head from 'next/head';
import { useCollection } from '@nandorojo/swr-firestore';

import { Event, parseDates } from '../app/event';
import { Showcase } from '../components/Showcase';

const Home = () => {
  const { data } = useCollection<Event>('events', {
    parseDates,
  });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      {data ? <Showcase events={data} /> : <div>loading</div>}
    </>
  );
};

export default Home;
