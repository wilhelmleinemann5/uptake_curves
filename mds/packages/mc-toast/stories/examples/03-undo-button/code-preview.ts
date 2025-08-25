export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-toast';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-notification';

const restoreFile = () => {
  alert('File has been restored');
  const mcToast = document.querySelector('mc-toast');
  mcToast.hide();
};

// HTML

// N.B. The CSS class "mc-notification__actions" is an optional helper class to provide 
// alignment, spacing and separators between actions when passed as a slot
<mc-toast position="top-right" duration="10000" appearance="info">
  <mc-button icon="trash" label="Delete file" appearance="error" variant="outlined" slot="trigger"></mc-button>
  <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right" body="The file has been deleted">
    <span slot="actions" class="mc-notification__actions">
      <mc-button class="undo" onclick="restoreFile()" variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
    </span>
  </mc-notification>
</mc-toast>`,
    language: 'javascript',
    copy: true,
  },
];
