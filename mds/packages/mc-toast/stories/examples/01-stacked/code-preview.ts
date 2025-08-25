export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-toast';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-notification';

// HTML
<mc-toast appearance="success" position="top-right">
  <mc-button appearance="neutral" label="Success" slot="trigger"></mc-button>
  <mc-notification icon="check-circle" body="Toast message"></mc-notification>
</mc-toast>
<mc-toast appearance="warning" position="top-right">
  <mc-button appearance="neutral" label="Warning" slot="trigger"></mc-button>
  <mc-notification icon="exclamation-triangle" body="Toast message"></mc-notification>
</mc-toast>
<mc-toast appearance="error" position="top-right">
  <mc-button appearance="neutral" label="Error" slot="trigger"></mc-button>
  <mc-notification icon="exclamation-octagon" body="Toast message"></mc-notification>
</mc-toast>
<mc-toast appearance="info" position="top-right">
  <mc-button appearance="neutral" label="Info" slot="trigger"></mc-button>
  <mc-notification icon="info-circle" body="Toast message"></mc-notification>
</mc-toast>
<mc-toast appearance="neutral-default" position="top-right">
  <mc-button appearance="neutral" label="Neutral Default" slot="trigger"></mc-button>
  <mc-notification icon="cog" body="Toast message"></mc-notification>
</mc-toast>
<mc-toast appearance="neutral-inverse" position="top-right">
  <mc-button appearance="neutral" label="Neutral Inverse" slot="trigger"></mc-button>
  <mc-notification icon="moon" body="Toast message"></mc-notification>
</mc-toast>`,
    language: 'javascript',
    copy: true,
  },
];
