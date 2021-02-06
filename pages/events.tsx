import Head from 'next/head';
import { useCollection } from '@nandorojo/swr-firestore';

import { Event, parseDates } from 'app/event';
import { Loader } from 'components/Loader';
import { Showcase } from 'components/Showcase';

const title = 'All Events';

const EventsPage = () => {
  const { data } = useCollection<Event>('events', {
    parseDates,
    orderBy: ['dateStart', 'desc'],
  });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      {data ? <Showcase events={data} /> : <Loader />}
    </>
  );
};

export default EventsPage;
