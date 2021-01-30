import Link from 'next/link';

export const Navigation = ({ items }) => (
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
