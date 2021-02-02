import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getDocument } from '@nandorojo/swr-firestore';

import { useAuth } from 'app/AuthProvider';
import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from 'app/event';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const event = await getDocument<Event>(`/events/${id}`, {
    parseDates,
  });

  if (!event.exists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: serializeEvent(event),
    },
  };
};

const EventPage: React.FC<WithEvent<SerializedEvent>> = ({ event: serializedEvent }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <h1>You need to be logged in</h1>;
  }

  const event = deserializeEvent(serializedEvent);
  const { name } = event;

  const title = `Edit ${name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>
    </>
  );
};

export default EventPage;
