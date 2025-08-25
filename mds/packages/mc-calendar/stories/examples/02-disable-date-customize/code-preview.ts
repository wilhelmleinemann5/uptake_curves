import { currentYear, currentMonthIndex, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-calendar';
const mcCalendar = document.querySelector('mc-calendar');
mcCalendar.customize = [
  { date: '${currentYear}-${currentMonthFormat}-05', disabled: true },
  { date: new Date(${currentYear}, ${currentMonthIndex}, 12), disabled: true },
  { date: { from: new Date(${currentYear}, ${currentMonthIndex}, 18), to: '${currentYear}-${currentMonthFormat}-22' }, disabled: true },
];

// HTML
<mc-calendar value="${currentYear}-${currentMonthFormat}-10"></mc-calendar>`,
    language: 'javascript',
    copy: true,
  },
];
