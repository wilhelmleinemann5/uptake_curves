export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-tab";
import "@maersk-global/mds-components-core/mc-tab-bar";

// CSS
mc-tab-bar::part(tabs) {
  max-width: 300px;
}

mc-tab-bar::part(panels) {
  max-width: 300px;
}

// HTML
<div class="story">
  <mc-tab-bar>
    <!-- tab 0: -->
    <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
    <div slot="panel">Info page with lots of information about us.</div>
    <!-- tab 1: -->
    <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
    <div slot="panel">Work page that showcases our work.</div>
  </mc-tab-bar>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
