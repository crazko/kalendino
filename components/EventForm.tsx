import { Field, FormRenderProps } from 'react-final-form';

import { Event, EventType } from 'app/event';
import { Condition } from './Condition';
import { formatDate } from 'utils/date';
import { after, before, composeValidators, match, required } from 'utils/validators';
import { LocationField } from './LocationField';

export const EventForm: React.FC<FormRenderProps<Event & EventType>> = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  values,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component="input" validate={required} required></Field>
      <Field name="summary" component="textarea" validate={required} required></Field>
      <Field
        name="dateStart"
        component="input"
        type="datetime-local"
        format={(value) => formatDate(value)}
        parse={(value) => new Date(value)}
        validate={composeValidators(required, before(values.dateEnd), after(new Date()))}
        required
        key={values.dateEnd.getTime()}
      ></Field>
      <Field
        name="dateEnd"
        component="input"
        type="datetime-local"
        format={(value) => formatDate(value)}
        parse={(value) => new Date(value)}
        validate={composeValidators(required, after(values.dateStart), after(new Date()))}
        required
        key={values.dateStart.getTime()}
      ></Field>

      <fieldset>
        <legend>Event type</legend>
        <label>
          <Field name="type" component="input" type="radio" value="online" /> online
        </label>
        <label>
          <Field name="type" component="input" type="radio" value="local" /> local
        </label>

        <div>
          <Condition when="type" is="online">
            <Field
              component="input"
              name="online"
              type="text"
              pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
              validate={composeValidators(
                required,
                match(
                  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                )
              )}
              required
            />
          </Condition>
          <Condition when="type" is="local">
            <LocationField />
          </Condition>
        </div>
      </fieldset>

      <button type="submit" disabled={invalid || submitting || pristine}>
        Save
      </button>
    </form>
  );
};
