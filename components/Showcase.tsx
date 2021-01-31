import { Event } from '../app/types';

type ShowcaseProps = {
  children?: never;
  events: Event[];
};

export const Showcase: React.FC<ShowcaseProps> = ({ events }) => (
  <div>
    {events.map(({ id, name, summary }) => (
      <article key={id}>
        <h2>{name}</h2>
        <div>{summary}</div>
      </article>
    ))}
  </div>
);
