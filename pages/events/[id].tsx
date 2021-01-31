import { GetServerSideProps } from 'next';
import { getDocument } from '@nandorojo/swr-firestore';

import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from '../../app/event';
import { Date } from '../../components/Date';

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
  const { name, summary, online, dateStart, dateEnd } = deserializeEvent(serializedEvent);

  return (
    <>
      <h1>{name}</h1>
      <Date dateStart={dateStart} dateEnd={dateEnd} />
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
