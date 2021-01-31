import { GetServerSideProps } from 'next';
import { getDocument } from '@nandorojo/swr-firestore';

import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from '../../app/event';

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
  const { name, summary, online, date_start, date_end } = deserializeEvent(serializedEvent);

  return (
    <>
      <h1>{name}</h1>
      <dl>
        <dt>Start:</dt>
        <dd>{date_start.toISOString()}</dd>
        <dt>End:</dt>
        <dd>{date_end.toISOString()}</dd>
      </dl>
      {online && (
        <div>
          <a href={online}>{online}</a>
        </div>
      )}
      <div>{summary}</div>
    </>
  );
};

export default EventPage;
