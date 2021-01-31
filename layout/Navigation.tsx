import Link from 'next/link';
import { useAuth } from '../app/AuthProvider';

import { NavigationItem } from '../app/navigation';

type NavigationProps = {
  children?: never;
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <ul>
        {items.map(
          ({ name, walled, url }) =>
            ((walled && isLoggedIn) || !walled) && (
              <li key={url}>
                <Link href={url}>
                  <a>{name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
