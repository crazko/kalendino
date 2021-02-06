import { WithEvent } from '../app/event';

type LocationProps = {
  children?: never;
} & WithEvent;

export const Location: React.FC<LocationProps> = ({ event }) => {
  if (event.type === 'online') {
    return <a href={event.url}>{event.url}</a>;
  }

  return (
    <span>
      {event.location.latitude} {event.location.longitude}
    </span>
  );
};
