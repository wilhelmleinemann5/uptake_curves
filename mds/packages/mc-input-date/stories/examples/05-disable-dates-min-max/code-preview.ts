export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';
const mcInputDate = document.querySelector('mc-input-date');
mcInputDate.customize = [
  { date: (date) => date.getDay() === 6 || date.getDay() === 0, disabled: true },
];

// HTML
<mc-input-date
  value="2022-09-15"
  label="Shipping day"
  placeholder="Choose a date"
></mc-input-date>`,
    language: 'javascript',
    copy: true,
  },
];
