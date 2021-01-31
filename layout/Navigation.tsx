import Link from 'next/link';

import { NavigationItem } from '../app/navigation';

type NavigationProps = {
  children?: never;
  items: NavigationItem[];
};

export const Navigation: React.FC<NavigationProps> = ({ items }) => (
  <nav>
    <ul>
      {items.map(
        ({ name, walled, url }) =>
          !walled && (
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
