import { Field, FormRenderProps } from 'react-final-form';

import { Event, EventType } from 'app/event';
import { Condition } from './Condition';
import { composeValidators, match, required } from 'utils/validators';
import { LocationField } from './LocationField';
import { DateRangeField } from './DateRangeField';

export const EventForm: React.FC<FormRenderProps<Event & EventType>> = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
}) => (
  <form onSubmit={handleSubmit}>
    <Field name="name" component="input" validate={required} required></Field>
    <Field name="summary" component="textarea" validate={required} required></Field>
    <DateRangeField />

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
