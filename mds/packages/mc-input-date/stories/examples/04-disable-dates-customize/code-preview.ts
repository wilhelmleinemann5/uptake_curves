import { currentYear, currentMonthIndex, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';
const mcInputDate = document.querySelector('mc-input-date');
mcInputDate.customize = [
  { date: '${currentYear}-${currentMonthFormat}-05', disabled: true },
  { date: new Date(${currentYear}, ${currentMonthIndex}, 12), disabled: true },
  { date: { from: new Date(${currentYear}, ${currentMonthIndex}, 18), to: '${currentYear}-${currentMonthFormat}-22' }, disabled: true },
];

// HTML
<mc-input-date
  value="${currentYear}-${currentMonthFormat}-10"
  label="Shipping day"
  placeholder="Choose a date"
></mc-input-date>`,
    language: 'javascript',
    copy: true,
  },
];
