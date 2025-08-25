export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-notification';

// CSS
.mc-notification__actions > *::after {
  content: '';
}

// HTML
// N.B. The CSS class "mc-notification__actions" is an optional helper class to provide 
// alignment, spacing and separators between actions when passed as a slot
<mc-notification appearance="info" body="The file has been deleted" icon="info-circle" verticalalign="middle" actionsposition="right" closable> 
  <span slot="actions" class="mc-notification__actions">
    <mc-button variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
  </span>
</mc-notification>`,
    language: 'javascript',
    copy: true,
  },
];
