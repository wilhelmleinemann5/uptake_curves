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
  <!-- tab 1: -->
  <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
  <!-- tab 2: -->
  <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
  <!-- tab 3: -->
  <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
  <!-- tab 4: -->
  <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
</mc-tab-bar>`,
    language: 'javascript',
    copy: true,
  },
];
