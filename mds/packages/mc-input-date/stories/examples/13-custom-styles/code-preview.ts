export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';
const mcInputDate = document.querySelector('mc-input-date');
mcInputDate.customize = [
  { date: (date) => date.getDay() === 6 || date.getDay() === 0, customClasses: ["holiday"] },
];

// HTML
<mc-input-date
  value="2022-08-17"
  customstyles=".holiday mc-button::part(button){ color: green; font-weight: bold;}"
></mc-input-date>`,
    language: 'javascript',
    copy: true,
  },
];
