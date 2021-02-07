import Head from 'next/head';
import Link from 'next/link';

import { useAuth } from 'app/AuthProvider';
import { items } from 'app/navigation';
import { Navigation } from './Navigation';
import { Button } from 'components/Button';

export const Layout: React.FC = ({ children }) => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <>
      <Head>
        <title>kalendi.no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0 sm:flex p-2 sm:p-5 bg-white border-b-2 border-red-200 text-center sm:text-left z-5000">
        <Link href="/">
          <a className="inline-block font-bold tracking-tighter text-lg text-gray-800 hover:text-red-700 p-2 sm:mr-5 sm:-ml-2 transition">
            kalendi.no
          </a>
        </Link>

        <Navigation items={items} />

        <Button onClick={isLoggedIn ? logout : login} className="absolute sm:static top-2 right-2">
          {isLoggedIn ? 'logout' : 'login'}
        </Button>
      </header>

      <main role="main" className="px-5 py-10 flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="p-5 text-center border-t-2 border-red-200 text-xs uppercase space-x-2">
        <a href="https://github.com/crazko/kalendino" className="text-gray-600 hover:underline">
          source
        </a>
        <span>&bull;</span>
        <a
          href="https://gist.github.com/crazko/b421859b8b8fd71e43668f0de7668992"
          className="text-gray-600 hover:underline"
        >
          thoughts
        </a>
      </footer>
    </>
  );
};
