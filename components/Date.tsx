import { format } from 'date-fns';
import { Event } from '../app/event';

type DateProps = { children?: never } & Pick<Event, 'dateStart' | 'dateEnd'>;

export const Date: React.FC<DateProps> = ({ dateStart, dateEnd }) => (
  <dl>
    <dt>Start:</dt>
    <dd>{format(dateStart, 'PPPPpp')}</dd>
    <dt>End:</dt>
    <dd>{format(dateEnd, 'PPPPpp')}</dd>
  </dl>
);
