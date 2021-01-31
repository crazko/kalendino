import { WithEvent } from '../app/event';

type LocationProps = {
  children?: never;
} & WithEvent;

export const Location: React.FC<LocationProps> = ({ event }) => {
  if ('online' in event) {
    return <a href={event.online}>{event.online}</a>;
  }

  return (
    <span>
      {event.location.latitude} {event.location.longitude}
    </span>
  );
};
