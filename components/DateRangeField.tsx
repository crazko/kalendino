import { useField, useFormState } from 'react-final-form';
import DatePicker from 'react-datepicker';
import { addHours, startOfHour } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { Event } from 'app/event';
import { Label } from './Label';
import { after, before, composeValidators, required } from 'utils/validators';

const initialStartDate = addHours(startOfHour(new Date()), 1);
const initialEndDate = addHours(initialStartDate, 1);

export const DateRangeField: React.FC<{ children?: never }> = () => {
  const { values } = useFormState<Event>();

  const beforeEnd = before(values.dateEnd);
  const afterStart = after(values.dateStart);

  const {
    input: { value: startDate, onChange: setStartDate },
  } = useField<Event['dateStart']>('dateStart', {
    initialValue: initialStartDate,
    validate: composeValidators(required, beforeEnd),
  });

  const {
    input: { value: endDate, onChange: setEndDate },
  } = useField<Event['dateEnd']>('dateEnd', {
    initialValue: initialEndDate,
    validate: composeValidators(required, afterStart),
  });

  return (
    <div style={{ zIndex: 2000, position: 'relative' }}>
      <div>
        <Label htmlFor="dateStart">Start Date:</Label>
        <DatePicker
          id="dateStart"
          className="p-2 mt-2 mb-4 shadow-sm rounded-sm"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={initialStartDate}
          showTimeSelect
          dateFormat="MMMM d, yyyy HH:mm"
          timeFormat="HH:mm"
        />
      </div>
      <div>
        <Label htmlFor="dateEnd">End Date:</Label>
        <DatePicker
          id="dateEnd"
          className="p-2 mt-2 mb-4 shadow-sm rounded-sm"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showTimeSelect
          dateFormat="MMMM d, yyyy HH:mm"
          timeFormat="HH:mm"
        />
      </div>
    </div>
  );
};
