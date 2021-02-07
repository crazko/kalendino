type LoaderProps = {
  children?: never;
  items?: number;
};

export const Loader: React.FC<LoaderProps> = ({ items = 3 }) => (
  <div className="py-10 grid gap-5 lg:grid-cols-3 2xl:grid-cols-5">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="bg-white p-5 h-32 shadow-md rounded-lg">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="flex space-x-2">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
