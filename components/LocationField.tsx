import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import { useField } from 'react-final-form';

import { LocalEvent } from 'app/event';
import { Map } from './Map';

const defaultLocation = new firebase.firestore.GeoPoint(48.720384, 21.2538303);

const DynamicMap = dynamic(() => import('./Map').then((module) => module.Map) as Promise<typeof Map>, {
  ssr: false,
});

export const LocationField: React.FC<{ children?: never }> = () => {
  const { input } = useField<LocalEvent['location']>('location', {
    format: (value) => [value.latitude, value.longitude],
    parse: (value) => new firebase.firestore.GeoPoint(value[0], value[1]),
    initialValue: defaultLocation,
  });

  return <DynamicMap center={input.value as any} onClick={(value) => input.onChange(value)} />;
};
