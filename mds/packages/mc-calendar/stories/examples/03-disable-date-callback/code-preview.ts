import { currentYear, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-calendar';
const mcCalendar = document.querySelector('mc-calendar');
mcCalendar.customize = [
  { date: (date) => date.getDay() === 6 || date.getDay() === 0, disabled: true },
];

// HTML
<mc-calendar value="${currentYear}-${currentMonthFormat}-10"></mc-calendar>`,
    language: 'javascript',
    copy: true,
  },
];
