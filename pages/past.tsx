import Head from 'next/head';
import { useCollection } from '@nandorojo/swr-firestore';

import { Event, parseDates } from 'app/event';
import { Heading } from 'components/Heading';
import { Loader } from 'components/Loader';
import { Showcase } from 'components/Showcase';

const title = 'Past Events';

const now = new Date();

const PastPage = () => {
  const { data } = useCollection<Event>('events', {
    parseDates,
    orderBy: ['dateStart', 'desc'],
    // where: ['dateStart', '<', now], Currently not possible to query by datetime, see https://github.com/nandorojo/swr-firestore/issues/51
  });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Heading>{title}</Heading>

      {data ? <Showcase events={data.filter((event) => event.dateStart < now)} /> : <Loader />}
    </>
  );
};

export default PastPage;
