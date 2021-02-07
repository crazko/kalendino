import { Field, FormRenderProps } from 'react-final-form';

import { Event } from 'app/event';
import { Button } from './Button';
import { Condition } from './Condition';
import { DateRangeField } from './DateRangeField';
import { LocationField } from './LocationField';
import { urlPattern } from 'utils/string';
import { composeValidators, match, required } from 'utils/validators';

const regexUrl = new RegExp(urlPattern);

export const EventForm: React.FC<FormRenderProps<Event>> = ({ handleSubmit, invalid, submitting, pristine }) => (
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
            name="url"
            type="text"
            pattern={urlPattern}
            validate={composeValidators(required, match(regexUrl))}
            required
          />
        </Condition>
        <Condition when="type" is="local">
          <LocationField />
        </Condition>
      </div>
    </fieldset>

    <Button type="submit" disabled={invalid || submitting || pristine}>
      Save
    </Button>
  </form>
);
