export const Showcase = ({ events }) => (
  <div>
    {events.map(({ name, summary }) => (
      <article>
        <h2>{name}</h2>
        <div>{summary}</div>
      </article>
    ))}
  </div>
);
