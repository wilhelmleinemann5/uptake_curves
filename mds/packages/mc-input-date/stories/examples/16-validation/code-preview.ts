export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';

// JavaScript
document.querySelector('mc-input-date').addEventListener('invalid', (event) => {
  const target = event.target;
  if (target.validity.rangeOverflow) {
    target.errormessage = 'Date is overflown!';
  } else if (target.validity.rangeUnderflow) {
    target.errormessage = 'Date is underflown!';
  } else {
    target.errormessage = 'Date is invalid!';
  }
});

// HTML
<mc-input-date label="Birthdate" min="2024-11-02" max="2024-11-16"></mc-input-date>`,
    language: 'javascript',
    copy: true,
  },
];
