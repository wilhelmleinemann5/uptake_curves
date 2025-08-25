import { useState } from 'react';
import { McInputDate } from '@maersk-global/mds-react-wrapper/components-core/mc-input-date';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

import { McInputDate as InputDate } from '@maersk-global/mds-components-core-input-date';

function ValidationForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [rangeUnderflow, setRangeUnderflow] = useState(false);
  const [rangeOverflow, setRangeOverflow] = useState(false);

  const minDate = '2024-11-02';
  const maxDate = '2024-11-16';

  const validateDate = (event: Event) => {
    console.log('event');
    const target = event.target as InputDate;
    if (target.validity.rangeUnderflow) {
      setRangeUnderflow(true);
      setRangeOverflow(false);
      setErrorMessage('The date is underflown!');
    } else if (target.validity.rangeOverflow) {
      setRangeUnderflow(false);
      setRangeOverflow(true);
      setErrorMessage('The date is overflown!');
    } else {
      setRangeUnderflow(false);
      setRangeOverflow(false);
      setErrorMessage('');
    }
  };

  const handleSubmit = (event) => {
    const form = event.target as HTMLFormElement;
    console.log('Is form valid?', form.checkValidity());
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mds-grid mds-grid-cols-1">
      <h3>Unified error message for all validations</h3>
      <McInputDate label="Birthdate" min={minDate} max={maxDate} errormessage="Invalid date!" />

      <h3>State-based error messages</h3>
      <McInputDate
        label="Birthdate"
        min={minDate}
        max={maxDate}
        errormessage={errorMessage}
        oninvalid={validateDate}
      ></McInputDate>

      <h3>Slotted state-based error messages</h3>
      <McInputDate label="Birthdate" name="Birthdate" min={minDate} max={maxDate} oninvalid={validateDate}>
        {rangeUnderflow && <span slot="errormessage">The date is underflown!</span>}
        {rangeOverflow && <span slot="errormessage">The date is overflown!</span>}
      </McInputDate>

      <McButton type="submit">Submit</McButton>
    </form>
  );
}

export default ValidationForm;
