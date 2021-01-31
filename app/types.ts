export type Event = {
  id: string;
  name: string;
  summary: string;
};

export type WithEvents = {
  events: Event[];
};
