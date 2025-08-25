export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-notification';
const notification = document.querySelector('mc-notification');
notification.addEventListener('close', (event) => event.target.remove());

// HTML
<mc-notification appearance="success" heading="Heading" closable></mc-notification>`,
    language: 'javascript',
    copy: true,
  },
];
