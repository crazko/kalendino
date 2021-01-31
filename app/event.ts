import { Document } from './types';

export type Event = {
  date_start: Date;
  date_end: Date;
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
    date_start: eventWithoutSnapshot.date_start.toISOString(),
    date_end: eventWithoutSnapshot.date_end.toISOString(),
  };
};

export const deserializeEvent = (serializedEvent: SerializedEvent) => ({
  ...serializedEvent,
  date_start: new Date(serializedEvent.date_start),
  date_end: new Date(serializedEvent.date_end),
});

export const parseDates: (keyof Event)[] = ['date_start', 'date_end'];
