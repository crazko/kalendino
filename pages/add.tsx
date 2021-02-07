import Head from 'next/head';
import { useRouter } from 'next/router';
import { Form } from 'react-final-form';
import firebase from 'firebase/app';
import { useCollection } from '@nandorojo/swr-firestore';
import { toast } from 'react-toastify';

import { useAuth } from 'app/AuthProvider';
import { Event } from 'app/event';
import { Container } from 'components/Container';
import { EventForm } from 'components/EventForm';
import { Heading } from 'components/Heading';

const title = 'Add Event';

const AddEventPage: React.FC = () => {
  const { isLoggedIn, state } = useAuth();
  const router = useRouter();

  const { add } = useCollection('/events');

  if (state === 'idle' || state === 'pending') {
    return null;
  }

  if (!isLoggedIn) {
    return <Heading>You need to be logged in</Heading>;
  }

  const onSubmit = async (values: Event) => {
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

      toast('Event was successfully created.');

      router.push(`/`);
    } catch (e) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>

      <Heading>{title}</Heading>

      <Form onSubmit={onSubmit} initialValues={{ type: 'online' }} component={EventForm} />
    </Container>
  );
};

export default AddEventPage;
