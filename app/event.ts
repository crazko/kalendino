import { Document } from './types';

export type Event = {
  dateStart: Date;
  dateEnd: Date;
  name: string;
  online?: string;
  summary: string;
} & Document;

export type SerializedEvent = ReturnType<typeof serializeEvent>;

export type WithEvent<EventType extends Event | SerializedEvent = Event> = {
  event: EventType;
};

export type WithEvents = {
  events: Event[];
};

// See https://github.com/vercel/next.js/issues/13209#issuecomment-633149650
export const serializeEvent = (event: Event) => {
  const { __snapshot, ...eventWithoutSnapshot } = event;

  return {
    ...eventWithoutSnapshot,
    dateStart: eventWithoutSnapshot.dateStart.toISOString(),
    dateEnd: eventWithoutSnapshot.dateEnd.toISOString(),
  };
};

export const deserializeEvent = (serializedEvent: SerializedEvent) => ({
  ...serializedEvent,
  dateStart: new Date(serializedEvent.dateStart),
  dateEnd: new Date(serializedEvent.dateEnd),
});

export const parseDates: (keyof Event)[] = ['dateStart', 'dateEnd'];
