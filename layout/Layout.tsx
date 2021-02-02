import Head from 'next/head';
import Link from 'next/link';

import { useAuth } from 'app/AuthProvider';
import { items } from 'app/navigation';
import { Navigation } from './Navigation';

export const Layout: React.FC = ({ children }) => {
  const { isLoggedIn, login, logout } = useAuth();

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

        {isLoggedIn ? (
          <button onClick={logout} type="button">
            logout
          </button>
        ) : (
          <button onClick={login} type="button">
            login
          </button>
        )}
      </header>

      <main role="role">{children}</main>

      <footer>
        <a href="https://github.com/crazko/kalendino">source</a>
      </footer>
    </>
  );
};
