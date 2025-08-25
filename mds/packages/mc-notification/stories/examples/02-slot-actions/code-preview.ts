export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-notification';

// HTML

// N.B. The CSS class "mc-notification__actions" is an optional helper class to provide 
// alignment, spacing and separators between actions when passed as a slot
<mc-notification appearance="error" heading="Heading">
  <span slot="actions" class="mc-notification__actions">
    <a class="mds-error--weak__on-background-color" href="http://designsystem.maersk.com">Maersk Design System</a>  
    <a class="mds-error--weak__on-background-color" href="http://www.google.com">Google</a>
  </span>
</mc-notification>`,
    language: 'javascript',
    copy: true,
  },
];
