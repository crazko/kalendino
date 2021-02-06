import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getDocument } from '@nandorojo/swr-firestore';

import { useAuth } from 'app/AuthProvider';
import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from 'app/event';
import { EventDate } from 'components/EventDate';
import { Heading } from 'components/Heading';
import { Location } from 'components/Location';
import { isAfter } from 'date-fns';

const today = new Date();

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
    <div className="container mx-auto">
      <Head>
        <title>{name}</title>
      </Head>

      <Heading>{name}</Heading>

      <EventDate dateStart={dateStart} dateEnd={dateEnd} className="md:text-xl my-5" showFull />

      {isLoggedIn && isAfter(dateStart, today) && (
        <div>
          <Link href={`/events/${id}/edit`}>
            <a>edit</a>
          </Link>
        </div>
      )}

      <div className="whitespace-pre-line my-5 max-w-screen-sm border-t-2 border-red-200 pt-5">{summary}</div>

      <div>
        <Location event={event} />
      </div>
    </div>
  );
};

export default EventPage;
