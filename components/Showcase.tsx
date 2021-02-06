import Link from 'next/link';

import { WithEvents } from '../app/event';
import { EventDate } from './EventDate';

type ShowcaseProps = {
  children?: never;
} & WithEvents;

export const Showcase: React.FC<ShowcaseProps> = ({ events }) => (
  <div className="py-10 grid gap-5 lg:grid-cols-3 2xl:grid-cols-5">
    {events.map(({ id, name, dateStart, dateEnd }) => (
      <Link href={`/events/${id}`} key={id}>
        <a className="bg-white p-5 hover:bg-gray-100 shadow-md rounded-lg transition group">
          <article>
            <h2 className="text-3xl font-bold tracking-tighter group-hover:text-red-900 transition mb-4 break-words">
              {name}
            </h2>
            <EventDate dateStart={dateStart} dateEnd={dateEnd} />
          </article>
        </a>
      </Link>
    ))}
  </div>
);
