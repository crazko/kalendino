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

      <header className="sticky top-0 flex p-5 bg-white border-b-2 border-red-200 shadow-md">
        <Link href="/">
          <a className="inline-block font-bold tracking-tighter text-lg text-gray-800 p-2 mr-5 -ml-2">kalendi.no</a>
        </Link>

        <Navigation items={items} />

        {isLoggedIn ? (
          <button onClick={logout} type="button" className="p-2 -mr-2">
            logout
          </button>
        ) : (
          <button onClick={login} type="button" className="p-2 -mr-2">
            login
          </button>
        )}
      </header>

      <main role="main" className="px-5 py-10 flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="p-5 text-center border-t-2 border-red-200 text-xs uppercase">
        <a href="https://github.com/crazko/kalendino" className="text-gray-600">
          source
        </a>
      </footer>
    </>
  );
};
