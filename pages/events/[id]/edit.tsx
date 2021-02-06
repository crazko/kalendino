import { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { getDocument, useDocument } from '@nandorojo/swr-firestore';
import { Form } from 'react-final-form';

import { useAuth } from 'app/AuthProvider';
import { Event, WithEvent, SerializedEvent, deserializeEvent, serializeEvent, parseDates } from 'app/event';
import { EventForm } from 'components/EventForm';
import { Heading } from 'components/Heading';

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

const EditEventPage: React.FC<WithEvent<SerializedEvent>> = ({ event: serializedEvent }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const event = useMemo(() => deserializeEvent(serializedEvent), [serializedEvent.id]); // Prevent re-initialize form with old values on submit
  const { update } = useDocument<Event>(`/events/${event.id}`);

  if (!isLoggedIn) {
    return <Heading>You need to be logged in</Heading>;
  }

  const title = `Edit ${event.name}`;

  const onSubmit = async (values: Event) => {
    // TODO: Runs spinner
    try {
      await update({
        name: values.name,
        summary: values.summary,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        ...(values.type === 'online'
          ? { type: 'online', url: values.url, location: firebase.firestore.FieldValue.delete() }
          : {
              type: 'local',
              url: firebase.firestore.FieldValue.delete(),
              location: new firebase.firestore.GeoPoint(values.location.latitude, values.location.longitude),
            }),
      });

      router.push(`/events/${values.id}`);

      // toast
    } catch (e) {
      // toast
      throw e;
    } finally {
      // TODO: remove spinner
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Heading>{title}</Heading>

      <Form onSubmit={onSubmit} initialValues={event} component={EventForm} />
    </>
  );
};

export default EditEventPage;
