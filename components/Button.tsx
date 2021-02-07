export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  type = 'button',
  className,
  ...props
}) => (
  <button
    className={`p-2 inline-block shadow-sm font-bold bg-white rounded-sm text-gray-800 hover:text-red-700 transition disabled:opacity-50 ${
      className ? className : ''
    }`}
    type={type}
    {...props}
  >
    {children}
  </button>
);
