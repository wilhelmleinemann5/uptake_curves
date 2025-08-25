export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tab-bar';
import '@maersk-global/mds-components-core/mc-tab';

// HTML
<mc-tab-bar>
  <!-- tab 0: -->
  <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
  <div slot="panel">Info page with lots of information about us.</div>
  <!-- tab 1: -->
  <mc-tab slot="tab" label="Prices"></mc-tab>
  <div slot="panel">Prices info</div>
  <!-- tab 2: -->
  <mc-tab slot="tab" disabled label="Overdue"></mc-tab>
  <div slot="panel">Overdue info</div>
  <!-- tab 3: -->
  <mc-tab slot="tab" label="Overview"></mc-tab>
  <div slot="panel">Overview Info</div>
</mc-tab-bar>`,
    language: 'javascript',
    copy: true,
  },
];
