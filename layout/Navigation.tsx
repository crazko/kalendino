import Link from 'next/link';

import { useAuth } from 'app/AuthProvider';
import { NavigationItem } from 'app/navigation';

type NavigationProps = {
  children?: never;
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const { isLoggedIn } = useAuth();

  return (
    <nav role="navigation" className="w-full">
      <ul className="flex space-x-5">
        {items.map(
          ({ name, walled, url }) =>
            ((walled && isLoggedIn) || !walled) && (
              <li key={url}>
                <Link href={url}>
                  <a className="inline-block text-lg text-gray-800 p-2">{name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
