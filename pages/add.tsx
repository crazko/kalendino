import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAuth } from '../app/AuthProvider';

const title = 'Add Event';

const Add: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }

    return null;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>
    </>
  );
};

export default Add;
