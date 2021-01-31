import Head from 'next/head';
import { useCollection } from '@nandorojo/swr-firestore';

import { Showcase } from '../components/Showcase';

const Home = () => {
  const { data, update, error } = useCollection('events');

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      {data ? <Showcase events={data} /> : <div>loading</div>}
    </>
  );
};

export default Home;
