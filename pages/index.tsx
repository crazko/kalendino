import Head from 'next/head';
import { useCollection } from '@nandorojo/swr-firestore';

import { Event, parseDates } from '../app/event';
import { Showcase } from '../components/Showcase';

const title = 'Upcoming Events';

const Home = () => {
  const { data } = useCollection<Event>('events', {
    parseDates,
    limit: 5,
    orderBy: ['dateStart', 'desc'],
  });

  console.log({ data });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      {data ? <Showcase events={data} /> : <div>loading</div>}
    </>
  );
};

export default Home;
