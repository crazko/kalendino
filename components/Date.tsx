import { Event } from '../app/event';

type DateProps = { children?: never } & Pick<Event, 'dateStart' | 'dateEnd'>;

export const Date: React.FC<DateProps> = ({ dateStart, dateEnd }) => (
  <dl>
    <dt>Start:</dt>
    <dd>{dateStart.toISOString()}</dd>
    <dt>End:</dt>
    <dd>{dateEnd.toISOString()}</dd>
  </dl>
);
