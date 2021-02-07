import Link from 'next/link';

import { useAuth } from 'app/AuthProvider';
import { NavigationItem } from 'app/types';

type NavigationProps = {
  children?: never;
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const { isLoggedIn } = useAuth();

  return (
    <nav role="navigation" className="w-full">
      <ul className="flex justify-center space-x-1 sm:space-x-5">
        {items.map(
          ({ name, walled, url }) =>
            ((walled && isLoggedIn) || !walled) && (
              <li key={url}>
                <Link href={url}>
                  <a className="inline-block sm:text-lg text-gray-800 hover:text-red-700 transition p-2">{name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
