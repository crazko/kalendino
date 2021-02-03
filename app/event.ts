import firebase from 'firebase/app';

import { Document } from './types';

type EventCommon = {
  dateStart: Date;
  dateEnd: Date;
  name: string;
  summary: string;
} & Document;

export type OnlineEvent = {
  online: string;
} & EventCommon;

export type LocalEvent = {
  location: firebase.firestore.GeoPoint;
} & EventCommon;

export type Event = OnlineEvent | LocalEvent;

export type SerializedEvent = ReturnType<typeof serializeEvent>;

export type EventType = {
  type: 'online' | 'local';
};

export type WithEvent<EventType extends Event | SerializedEvent = Event> = {
  event: EventType;
};

export type WithEvents = {
  events: Event[];
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

export const getEventType = (event: Event): EventType['type'] => ('online' in event ? 'online' : 'local');

export const parseDates: (keyof Event)[] = ['dateStart', 'dateEnd'];
