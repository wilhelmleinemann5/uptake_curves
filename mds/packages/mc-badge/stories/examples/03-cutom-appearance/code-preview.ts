export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-components-core-button";

// CSS
<style>
mc-badge::part(badge) {
  top: 2px;
  right: 2px;
}
</style>

// HTML
<mc-button variant="plain" appearance="neutral" label="Notifications" icon="calendar" hiddenlabel>
  <mc-badge display="pinned" position="top" slot="badge" label="9" distance="medium"></mc-badge>
</mc-button>`,
    language: 'html',
    copy: true,
  },
];
