type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block uppercase text-sm">
    {children}
  </label>
);
