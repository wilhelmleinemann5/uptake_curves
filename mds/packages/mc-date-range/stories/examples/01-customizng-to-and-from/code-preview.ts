export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-date-range';

// HTML
<mc-date-range>
  <mc-input-date slot="from" label="Check-in date"></mc-input-date>
  <mc-input-date slot="to" label="Check-out date">
    <span slot="hint">Look at our <a target="_blank" href="https://designsystem.maersk.com">website</a> for available slots</span>
  </mc-input-date>
</mc-date-range>`,
    language: 'javascript',
    copy: true,
  },
];
