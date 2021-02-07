import Link from 'next/link';

import { useAuth } from 'app/AuthProvider';
import { NavigationItem } from 'app/types';
import { useRouter } from 'next/router';

type NavigationProps = {
  children?: never;
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const { isLoggedIn } = useAuth();
  const { pathname } = useRouter();

  return (
    <nav role="navigation" className="w-full">
      <ul className="flex justify-center space-x-1 sm:space-x-5">
        {items.map(
          ({ name, walled, url }) =>
            ((walled && isLoggedIn) || !walled) && (
              <li key={url}>
                <Link href={url}>
                  <a
                    className={`inline-block sm:text-lg hover:underline p-2 ${
                      pathname === url ? 'text-red-600' : 'text-gray-800'
                    }`}
                  >
                    {name}
                  </a>
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
