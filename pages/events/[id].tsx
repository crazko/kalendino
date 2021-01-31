import { GetServerSideProps } from 'next';
import { getDocument } from '@nandorojo/swr-firestore';

import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from '../../app/event';
import { Date } from '../../components/Date';
import { Location } from '../../components/Location';

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
  const event = deserializeEvent(serializedEvent);
  const { name, dateStart, dateEnd, summary } = event;

  return (
    <>
      <h1>{name}</h1>
      <Date dateStart={dateStart} dateEnd={dateEnd} />
      <div>
        <Location event={event} />
      </div>
      <div>{summary}</div>
    </>
  );
};

export default EventPage;
