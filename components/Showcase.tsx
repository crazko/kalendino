import Link from 'next/link';

import { WithEvents } from '../app/event';

type ShowcaseProps = {
  children?: never;
} & WithEvents;

export const Showcase: React.FC<ShowcaseProps> = ({ events }) => (
  <div>
    {events.map(({ id, name, date_start, date_end }) => (
      <Link href={`/events/${id}`} key={id}>
        <a>
          <article>
            <h2>{name}</h2>
            <dl>
              <dt>Start:</dt>
              <dd>{date_start.toISOString()}</dd>
              <dt>End:</dt>
              <dd>{date_end.toISOString()}</dd>
            </dl>
          </article>
        </a>
      </Link>
    ))}
  </div>
);
