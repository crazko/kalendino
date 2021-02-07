import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDocument, useDocument } from '@nandorojo/swr-firestore';

import { useAuth } from 'app/AuthProvider';
import {
  Event,
  WithEvent,
  SerializedEvent,
  deserializeEvent,
  serializeEvent,
  parseDates,
  createGoogleURLLink,
} from 'app/event';
import { Button } from 'components/Button';
import { Container } from 'components/Container';
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
  const router = useRouter();

  const event = deserializeEvent(serializedEvent);
  const { id, name, dateStart, dateEnd, summary } = event;

  const { deleteDocument } = useDocument(`/events/${id}`);

  const handleDelete = async () => {
    if (confirm('Do you really want to remove this event?')) {
      try {
        await deleteDocument();
        router.push(`/`);
      } catch (error) {
        // notif
      }
    }
  };

  return (
    <Container>
      <Head>
        <title>{name}</title>
      </Head>

      <Heading>{name}</Heading>

      <EventDate dateStart={dateStart} dateEnd={dateEnd} className="md:text-xl my-5" showFull />

      <div className="space-x-3">
        <a
          href={createGoogleURLLink(event)}
          className="p-2 inline-block shadow-sm font-bold bg-white rounded-sm text-gray-800 hover:text-red-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          export
        </a>
        {isLoggedIn && isAfter(dateStart, today) && (
          <Link href={`/events/${id}/edit`}>
            <a className="p-2 inline-block shadow-sm font-bold bg-white rounded-sm text-gray-800 hover:text-red-700 transition">
              edit
            </a>
          </Link>
        )}
        {isLoggedIn && (
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-300">
            delete
          </Button>
        )}
      </div>

      <div className="whitespace-pre-line my-5 max-w-screen-sm border-t-2 border-red-200 pt-5">{summary}</div>

      <Location event={event} />
    </Container>
  );
};

export default EventPage;
