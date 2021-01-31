export const Showcase = ({ events }) => (
  <div>
    {events.map(({ id, name, summary }) => (
      <article key={id}>
        <h2>{name}</h2>
        <div>{summary}</div>
      </article>
    ))}
  </div>
);
