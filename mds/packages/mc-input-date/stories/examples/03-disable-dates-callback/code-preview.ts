import { currentYear, currentMonthFormat } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';

// HTML
<mc-input-date
  value="${currentYear}-${currentMonthFormat}-10"
  label="Shipping day"
  placeholder="Choose a date"
  min="${currentYear}-${currentMonthFormat}-08"
  max="${currentYear}-${currentMonthFormat}-12"
></mc-input-date>`,
    language: 'javascript',
    copy: true,
  },
];
