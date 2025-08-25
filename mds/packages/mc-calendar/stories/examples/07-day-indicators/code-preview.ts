import { currentYear, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-calendar';
const mcCalendar = document.querySelector('mc-calendar');
mcCalendar.customize = [
  { date: (date) => date.getDay() === 6, indicatorAppearance: 'warning'},
  { date: '${currentYear}-${currentMonthFormat}-25', indicatorAppearance: 'success' },
  { date: '${currentYear}-${currentMonthFormat}-1', indicatorAppearance: 'error' },
  //custom CSS color
  { date: '${currentYear}-${currentMonthFormat}-15', indicatorAppearance: '#000000' },
];

// HTML
<mc-calendar value="${currentYear}-${currentMonthFormat}-10"></mc-calendar>`,
    language: 'javascript',
    copy: true,
  },
];
