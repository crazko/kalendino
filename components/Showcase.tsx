import Link from 'next/link';

import { WithEvents } from '../app/event';
import { Date } from './Date';

type ShowcaseProps = {
  children?: never;
} & WithEvents;

export const Showcase: React.FC<ShowcaseProps> = ({ events }) => (
  <div>
    {events.map(({ id, name, dateStart, dateEnd }) => (
      <Link href={`/events/${id}`} key={id}>
        <a>
          <article>
            <h2>{name}</h2>
            <Date dateStart={dateStart} dateEnd={dateEnd} />
          </article>
        </a>
      </Link>
    ))}
  </div>
);
