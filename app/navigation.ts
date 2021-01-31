export const items = [
  {
    name: 'all events',
    walled: false,
    url: '/events',
  },
  {
    name: 'past events',
    walled: false,
    url: '/past',
  },
  {
    name: 'add event',
    walled: true,
    url: '/new',
  },
];

export type NavigationItem = typeof items[0];
