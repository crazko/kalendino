import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getDocument } from '@nandorojo/swr-firestore';

import { useAuth } from 'app/AuthProvider';
import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from 'app/event';
import { Date } from 'components/Date';
import { Location } from 'components/Location';

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

  const event = deserializeEvent(serializedEvent);
  const { id, name, dateStart, dateEnd, summary } = event;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <h1>{name}</h1>

      <Date dateStart={dateStart} dateEnd={dateEnd} />
      {isLoggedIn && (
        <div>
          <Link href={`/events/${id}/edit`}>
            <a>edit</a>
          </Link>
        </div>
      )}
      <div>
        <Location event={event} />
      </div>
      <div style={{ whiteSpace: 'pre-line' }}>{summary}</div>
    </>
  );
};

export default EventPage;
