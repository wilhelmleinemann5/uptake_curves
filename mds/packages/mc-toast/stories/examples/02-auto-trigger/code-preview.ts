export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-toast';
import '@maersk-global/mds-components-core/mc-notification';
setTimeout(() => {
  const mcToast = document.querySelectorAll('mc-toast');
  mcToast[1].show();
}, 500);

// HTML
<mc-toast open position="bottom-center" appearance="success">
  <mc-notification body="Toast triggered programmatically on page load"></mc-notification>
</mc-toast>
<mc-toast position="bottom-right" appearance="error">
  <mc-notification body="Toast triggered programmatically after 0.5s."></mc-notification>
</mc-toast>`,
    language: 'javascript',
    copy: true,
  },
];
