import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-switch";
import '@maersk-global/mds-components-core/mc-switch-group';

// CSS
mc-switch-group::part(fieldset-container) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
}

// HTML
<mc-switch-group legend="Select features to enable" hint="Choose one or more">
  <mc-switch name="features" value="Notifications" label="Notifications"></mc-switch>
  <mc-switch name="features" value="DarkMode" label="Dark Mode"></mc-switch>
  <mc-switch name="features" value="AutoSave" label="Auto Save"></mc-switch>
  <mc-switch name="features" value="Analytics" label="Analytics"></mc-switch>
  <mc-switch name="features" value="Sync" label="Cloud Sync"></mc-switch>
  <mc-switch name="features" value="Backups" label="Auto Backups"></mc-switch>
</mc-switch-group>`,
    language: 'javascript',
    copy: true,
  } as IMcCCode,
];
