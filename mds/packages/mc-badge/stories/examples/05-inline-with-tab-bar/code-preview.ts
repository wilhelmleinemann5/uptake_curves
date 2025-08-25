export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-components-core-tab-bar";
import "@maersk-global/mds-components-core-tab";

<mc-tab-bar>
  <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
  <div slot="panel">Info page with lots of information about us.</div>
  <!-- tab 1: -->
  <mc-tab slot="tab" label="Work" icon="globe"
    ><mc-badge slot="badge" position="left" display="inline" label="8"></mc-badge
  ></mc-tab>
  <div slot="panel">Work page that showcases our work.</div>
</mc-tab-bar>`,
    language: 'html',
    copy: true,
  },
];
