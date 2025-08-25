import { McInputDate } from '@maersk-global/mds-components-core-input-date';

const wireUpValidation = () => {
  const birthdate1 = document.getElementById('birthdate1');
  const birthdate2 = document.getElementById('birthdate2');
  const errorSlot = document.getElementById('error-slot');

  birthdate1?.addEventListener('invalid', (event) => {
    const target = event.target as McInputDate;
    if (target.validity.rangeOverflow) {
      target.errormessage = 'Date is overflown!';
    } else if (target.validity.rangeUnderflow) {
      target.errormessage = 'Date is underflown!';
    } else {
      target.errormessage = 'Date is invalid!';
    }
  });

  birthdate2?.addEventListener('invalid', (event) => {
    if (errorSlot) {
      const target = event.target as McInputDate;
      if (target.validity.rangeOverflow) {
        errorSlot.innerText = 'Date is overflown!';
      } else if (target.validity.rangeUnderflow) {
        errorSlot.innerText = 'Date is underflown!';
      } else {
        errorSlot.innerText = 'Date is invalid!';
      }
    }
  });

  document.querySelector('form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log('Form validity state', form.checkValidity());
  });
};

(window as any).wireUpValidation = wireUpValidation;
