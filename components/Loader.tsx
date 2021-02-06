type LoaderProps = {
  children?: never;
  items?: number;
};

export const Loader: React.FC<LoaderProps> = ({ items = 3 }) => (
  <div className="py-10 grid gap-5 lg:grid-cols-3 2xl:grid-cols-5">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="bg-white p-5 h-32 shadow-md rounded-lg" />
    ))}
  </div>
);
