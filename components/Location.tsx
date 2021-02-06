import dynamic from 'next/dynamic';

import { WithEvent } from '../app/event';
import { Map } from './Map';

type LocationProps = {
  children?: never;
} & WithEvent;

const DynamicMap = dynamic(() => import('./Map').then((module) => module.Map) as Promise<typeof Map>, {
  ssr: false,
});

export const Location: React.FC<LocationProps> = ({ event }) => {
  if (event.type === 'online') {
    return (
      <a href={event.url} className="font-bold text-red-700">
        {event.url}
      </a>
    );
  }

  return <DynamicMap center={[event.location.latitude, event.location.longitude]} />;
};
