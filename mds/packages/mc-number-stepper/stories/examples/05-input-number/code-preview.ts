export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input';

const digitsInput = document.querySelector('mc-input');
digitsInput.mask = /^\\d+$/;

// HTML
<mc-input label="Digits" maxlength="16"></mc-input>`,
    language: 'javascript',
    copy: true,
  },
];
