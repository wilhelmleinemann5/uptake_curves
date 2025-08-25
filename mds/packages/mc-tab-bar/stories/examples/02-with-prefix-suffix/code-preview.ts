export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tab';
import '@maersk-global/mds-components-core/mc-tab-bar';

// CSS
.prefix:before {
  content: '\\2713';
  display: inline-block;
  color: green;
  padding: 0 6px 0 0;
}

// HTML
<mc-tab-bar>
  <!-- tab 0: -->
  <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
  <div slot="panel">Info page with lots of information about us.</div>
  <!-- tab 1: -->
  <mc-tab slot="tab" label="Prices">
    <span class="prefix" slot="prefix"></span>
    <span slot="suffix">$</span>
  </mc-tab>
  <div slot="panel">Prices info</div>
  <!-- tab 2: -->
  <mc-tab slot="tab" label="Overdue">
    <span slot="suffix"><mc-tag fit="small" label="3"></mc-tag></span>
  </mc-tab>
  <div slot="panel">Overdue info</div>
</mc-tab-bar>`,
    language: 'javascript',
    copy: true,
  },
];
