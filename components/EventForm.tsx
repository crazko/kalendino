import { Field, FormRenderProps } from 'react-final-form';

import { Event } from 'app/event';
import { Button } from './Button';
import { Condition } from './Condition';
import { DateRangeField } from './DateRangeField';
import { Label } from './Label';
import { LocationField } from './LocationField';
import { urlPattern } from 'utils/string';
import { composeValidators, match, required } from 'utils/validators';
import { Spinner } from './Spinner';

const regexUrl = new RegExp(urlPattern);

export const EventForm: React.FC<FormRenderProps<Event>> = ({
  handleSubmit,
  invalid,
  submitting,
  submitSucceeded,
  pristine,
}) => (
  <form onSubmit={handleSubmit}>
    <fieldset className="my-8">
      <legend className="text-lg font-bold mb-4">Event Details</legend>
      <Label htmlFor="name">Name:</Label>
      <Field
        id="name"
        name="name"
        component="input"
        validate={required}
        className="p-2 mt-2 mb-4 w-full shadow-sm rounded-sm"
        required
      ></Field>
      <DateRangeField />
      <Label htmlFor="summary">Summary:</Label>
      <Field
        id="summary"
        name="summary"
        component="textarea"
        validate={required}
        className="p-2 mt-2 mb-4 w-full shadow-sm rounded-sm"
        required
      ></Field>
    </fieldset>

    <fieldset className="my-8">
      <legend className="text-lg font-bold mb-4">Event type</legend>
      <div className="flex space-x-3 mb-4">
        <Label>
          <Field name="type" component="input" type="radio" value="online" /> online
        </Label>
        <Label>
          <Field name="type" component="input" type="radio" value="local" /> local
        </Label>
      </div>

      <Condition when="type" is="online">
        <Label htmlFor="url">URL:</Label>
        <Field
          component="input"
          id="url"
          className="p-2 mt-2 mb-4 w-full shadow-sm rounded-sm"
          name="url"
          type="text"
          pattern={urlPattern}
          validate={composeValidators(required, match(regexUrl))}
          required
        />
      </Condition>
      <Condition when="type" is="local">
        <Label>Location:</Label>
        <p className="my-2">Choose on map.</p>
        <LocationField />
      </Condition>
    </fieldset>

    <Button
      className="flex space-x-2 text-xl"
      type="submit"
      disabled={invalid || submitting || submitSucceeded || pristine}
    >
      <span>Save</span> {submitting && <Spinner />}
    </Button>
  </form>
);
