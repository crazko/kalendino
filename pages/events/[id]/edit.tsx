import { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { getDocument, useDocument } from '@nandorojo/swr-firestore';
import { Field, Form } from 'react-final-form';

import { useAuth } from 'app/AuthProvider';
import {
  Event,
  WithEvent,
  SerializedEvent,
  deserializeEvent,
  serializeEvent,
  parseDates,
  EventType,
  OnlineEvent,
  LocalEvent,
  getEventType,
} from 'app/event';
import { Condition } from 'components/Condition';
import { formatDate } from 'utils/date';
import { required, after, before, composeValidators, match } from 'utils/validators';

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

  const event = useMemo(() => deserializeEvent(serializedEvent), [serializedEvent.id]); // Prevent re-initialize form with old values on submit
  const { update } = useDocument<Event>(`/events/${event.id}`);

  if (!isLoggedIn) {
    return <h1>You need to be logged in</h1>;
  }

  const LocationField = dynamic(
    () => import('components/LocationField').then((module) => module.LocationField) as any,
    {
      ssr: false,
    }
  );

  const title = `Edit ${event.name}`;

  const onSubmit = async (values: Event & EventType) => {
    // TODO: Runs spinner
    try {
      await update({
        name: values.name,
        summary: values.summary,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        ...(values.type === 'online'
          ? { online: (values as OnlineEvent).online, location: firebase.firestore.FieldValue.delete() }
          : {
              online: firebase.firestore.FieldValue.delete(),
              location: new firebase.firestore.GeoPoint(
                (values as LocalEvent).location.latitude,
                (values as LocalEvent).location.longitude
              ),
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

      <h1>{title}</h1>

      <Form
        onSubmit={onSubmit}
        initialValues={{ ...event, type: getEventType(event) }}
        render={({ handleSubmit, invalid, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" component="input" validate={required} required></Field>
            <Field name="summary" component="textarea" validate={required} required></Field>
            <Field
              name="dateStart"
              component="input"
              type="datetime-local"
              format={(value) => formatDate(value)}
              parse={(value) => new Date(value)}
              validate={composeValidators(required, before(values.dateEnd), after(new Date()))}
              required
              key={values.dateEnd.getTime()}
            ></Field>
            <Field
              name="dateEnd"
              component="input"
              type="datetime-local"
              format={(value) => formatDate(value)}
              parse={(value) => new Date(value)}
              validate={composeValidators(required, after(values.dateStart), after(new Date()))}
              required
              key={values.dateStart.getTime()}
            ></Field>

            <fieldset>
              <legend>Event type</legend>
              <label>
                <Field name="type" component="input" type="radio" value="online" /> online
              </label>
              <label>
                <Field name="type" component="input" type="radio" value="local" /> local
              </label>

              <div>
                <Condition when="type" is="online">
                  <Field
                    name="online"
                    component="input"
                    type="text"
                    pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                    validate={composeValidators(
                      required,
                      match(
                        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                      )
                    )}
                    required
                  />
                </Condition>
                <Condition when="type" is="local">
                  <LocationField />
                </Condition>
              </div>
            </fieldset>

            <button type="submit" disabled={invalid || submitting || pristine}>
              Save
            </button>
          </form>
        )}
      />
    </>
  );
};

export default EventPage;
