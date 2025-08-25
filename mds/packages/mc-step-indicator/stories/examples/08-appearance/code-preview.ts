export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator";
import "@maersk-global/mds-components-core/mc-step-indicator-item";

// HTML
<mc-step-indicator>
  <mc-step-indicator-item state="completed" label="ETD"> </mc-step-indicator-item>
  <mc-step-indicator-item state="completed" label="Release Sent"> </mc-step-indicator-item>
  <mc-step-indicator-item state="current" appearance="warning" label="Carrier Released"> </mc-step-indicator-item>
  <mc-step-indicator-item label="ETA" state="pending"> </mc-step-indicator-item>
</mc-step-indicator>
<mc-step-indicator>
  <mc-step-indicator-item state="completed" label="ETD"> </mc-step-indicator-item>
  <mc-step-indicator-item state="completed" label="Release Sent"> </mc-step-indicator-item>
  <mc-step-indicator-item state="current" appearance="error" label="Carrier Released"> </mc-step-indicator-item>
  <mc-step-indicator-item label="ETA" state="pending"> </mc-step-indicator-item>
</mc-step-indicator>
  `,
    language: 'javascript',
    copy: true,
  },
];
