import Head from 'next/head';
import Link from 'next/link';

import { Navigation } from './Navigation';

const items = [
  {
    name: 'all events',
    walled: false,
    url: '/events',
  },
  {
    name: 'past events',
    walled: false,
    url: '/past',
  },
  {
    name: 'add event',
    walled: true,
    url: '/new',
  },
];

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>kalendi.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Link href="/">
          <a>kalendi.no</a>
        </Link>

        <Navigation items={items} />
      </header>

      <main role="role">{children}</main>

      <footer>
        <a href="https://github.com/crazko/kalendino">source</a>
      </footer>
    </>
  );
};
