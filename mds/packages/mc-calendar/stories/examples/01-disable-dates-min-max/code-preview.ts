import { currentYear, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-calendar';

// HTML
<mc-calendar
  value="${currentYear}-${currentMonthFormat}-10"
  min="${currentYear}-${currentMonthFormat}-08"
  max="${currentYear}-${currentMonthFormat}-12"
></mc-calendar>
`,
    language: 'javascript',
    copy: true,
  },
];
