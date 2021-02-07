import { format, isSameDay, isThisYear } from 'date-fns';
import { Event } from '../app/event';

type DateProps = { children?: never; className?: string; showFull?: boolean } & Pick<Event, 'dateStart' | 'dateEnd'>;

const dateFormat = 'E, MMM dd';
const fullDateFormat = `${dateFormat} y`;
const timeFormat = 'HH:mm';

export const EventDate: React.FC<DateProps> = ({ dateStart, dateEnd, className, showFull = false }) => (
  <dl className={`flex text-xs sm:text-sm md:text-base ${className ? className : ''}`}>
    <dt className="sr-only">Start:</dt>
    <dd>
      {format(dateStart, isThisYear(dateStart) ? dateFormat : fullDateFormat)} at {format(dateStart, timeFormat)}
    </dd>
    {(!isSameDay(dateStart, dateEnd) || showFull) && (
      <>
        <dt className="sr-only">End:</dt>
        <dd className="date--end">
          {format(dateEnd, dateFormat)} {showFull && ` ${format(dateEnd, timeFormat)}`}
        </dd>
      </>
    )}
  </dl>
);
