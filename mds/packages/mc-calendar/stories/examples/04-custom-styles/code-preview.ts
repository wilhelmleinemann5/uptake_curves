import { currentYear, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-calendar';

const customStyles = \`
.available { 
  background-color: green;
}

.weekday {
  color: green;
}\`;

const mcCalendar = document.querySelector('mc-calendar');
mcCalendar.customize = [
  //customClasses can be a string with many classes or an array of strings i.e. ['available', 'friday'] or 'available friday'
  { date: '${currentYear}-${currentMonthFormat}-05', customClasses: 'available' },
];
mcCalendar.customstyles = customStyles;
// HTML
<mc-calendar></mc-calendar>`,
    language: 'javascript',
    copy: true,
  },
];
