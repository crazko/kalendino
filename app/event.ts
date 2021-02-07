import firebase from 'firebase/app';
import { formatISO } from 'date-fns';

import { FirebaseDocumentData } from './types';

type EventCommon = {
  dateStart: Date;
  dateEnd: Date;
  name: string;
  summary: string;
} & FirebaseDocumentData;

export type OnlineEvent = {
  type: 'online';
  url: string;
} & EventCommon;

export type LocalEvent = {
  type: 'local';
  location: firebase.firestore.GeoPoint;
} & EventCommon;

export type Event = OnlineEvent | LocalEvent;

export type SerializedEvent = ReturnType<typeof serializeEvent>;

export type WithEvent<EventType extends Event | SerializedEvent = Event> = {
  event: EventType;
};

// Need to simplify objects, see https://github.com/vercel/next.js/issues/13209#issuecomment-633149650
export const serializeEvent = (event: Event) => {
  const { __snapshot, ...eventWithoutSnapshot } = event;

  const serializedEvent = {
    ...eventWithoutSnapshot,
    dateStart: eventWithoutSnapshot.dateStart.toISOString(),
    dateEnd: eventWithoutSnapshot.dateEnd.toISOString(),
  };

  if ('location' in serializedEvent) {
    return {
      ...serializedEvent,
      location: JSON.stringify(serializedEvent.location),
    };
  }

  return serializedEvent;
};

export const deserializeEvent = (serializedEvent: SerializedEvent): Event => {
  const deserializedEvent = {
    ...serializedEvent,
    __snapshot: undefined,
    dateStart: new Date(serializedEvent.dateStart),
    dateEnd: new Date(serializedEvent.dateEnd),
  };

  if ('location' in deserializedEvent) {
    const { latitude, longitude } = JSON.parse(deserializedEvent.location);

    return {
      ...deserializedEvent,
      location: new firebase.firestore.GeoPoint(latitude, longitude),
    };
  }

  return deserializedEvent;
};

export const createGoogleURLLink = (event: Event) => {
  const { name, summary, dateStart, dateEnd } = event;

  let location;

  if (event.type === 'online') {
    location = event.url;
  } else {
    location = `${event.location.latitude} ${event.location.longitude}`;
  }

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${name}&details=${encodeURIComponent(
    summary
  )}&location=${location}&dates=${formatISO(dateStart, { format: 'basic' })}%2F${formatISO(dateEnd, {
    format: 'basic',
  })}`;
};

export const parseDates: (keyof Event)[] = ['dateStart', 'dateEnd'];
