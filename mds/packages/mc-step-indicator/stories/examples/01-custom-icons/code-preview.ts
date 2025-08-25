export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator";
import "@maersk-global/mds-components-core/mc-step-indicator-item";

// HTML
<mc-step-indicator>
  <mc-step-indicator-item
    state="completed"
    icon="clock"
    label="ETD">
  </mc-step-indicator-item>
  <mc-step-indicator-item
    state="completed"
    icon="envelope"
    label="Release Sent">
  </mc-step-indicator-item>
  <mc-step-indicator-item
    state="current"
    icon="vessel-front"
    label="Carrier Released">
  </mc-step-indicator-item>
  <mc-step-indicator-item 
    label="ETA"
    state="pending"
    icon="clock">
  </mc-step-indicator-item>
</mc-step-indicator>
  `,
    language: 'javascript',
    copy: true,
  },
];
