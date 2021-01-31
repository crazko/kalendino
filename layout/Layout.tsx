import Head from 'next/head';
import Link from 'next/link';

import { items } from '../app/navigation';
import { Navigation } from './Navigation';

export const Layout: React.FC = ({ children }) => {
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
