import Head from 'next/head';
import { useRouter } from 'next/router';
import { Form } from 'react-final-form';
import firebase from 'firebase/app';
import { useCollection } from '@nandorojo/swr-firestore';

import { useAuth } from 'app/AuthProvider';
import { Event } from 'app/event';
import { EventForm } from 'components/EventForm';

const title = 'Add Event';

const AddEventPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const { add } = useCollection('/events');

  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }

    return null;
  }

  const onSubmit = async (values: Event) => {
    // TODO: Runs spinner
    try {
      await add({
        name: values.name,
        summary: values.summary,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        ...(values.type === 'online'
          ? { type: 'online', url: values.url }
          : {
              type: 'local',
              location: new firebase.firestore.GeoPoint(values.location.latitude, values.location.longitude),
            }),
      });

      router.push(`/`);

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

      <Form onSubmit={onSubmit} initialValues={{ type: 'online' }} component={EventForm} />
    </>
  );
};

export default AddEventPage;
