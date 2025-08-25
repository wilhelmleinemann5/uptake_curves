import { customstyles } from './dates';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-calendar';

// CSS
mc-calendar::part(calendar) {
  padding: 16px;
}

// HTML
<mc-calendar customstyles="${customstyles}{color: green; font-weight: 700}"></mc-calendar>`,
    language: 'javascript',
    copy: true,
  },
];
