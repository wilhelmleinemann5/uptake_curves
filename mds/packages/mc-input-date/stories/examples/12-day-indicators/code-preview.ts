import { currentYear, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';
const mcInputDate = document.querySelector('mc-input-date');
mcInputDate.customize = [
  { date: (date) => date.getDay() === 6, indicatorAppearance: 'warning'},
  { date: '${currentYear}-${currentMonthFormat}-25', indicatorAppearance: 'success' },
  { date: '${currentYear}-${currentMonthFormat}-1', indicatorAppearance: 'error' },
  //custom CSS color
  { date: '${currentYear}-${currentMonthFormat}-15', indicatorAppearance: '#000000' },
];


// HTML
<mc-input-date
  value="${currentYear}-${currentMonthFormat}-10"
></mc-input-date>`,
    language: 'javascript',
    copy: true,
  },
];
