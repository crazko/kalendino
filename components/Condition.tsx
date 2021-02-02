import { Field } from 'react-final-form';

type ConditionProps = {
  when: string;
  is: string;
};

export const Condition: React.FC<ConditionProps> = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);
