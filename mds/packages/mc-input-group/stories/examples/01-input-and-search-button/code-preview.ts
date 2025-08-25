export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input-group";
import "@maersk-global/mds-components-core/mc-input";
import "@maersk-global/mds-components-core/mc-button";

// HTML
<style>
  mc-input {
    width: 400px;
  }
</style>

<mc-input-group legend="Search" hiddenlegend disableinnerborder>
  <mc-input label="Input Label" placeholder="Search vessel" hiddenlabel></mc-input>
  <mc-button appearance="neutral" label="Search" icon="vessel-front"></mc-button>
</mc-input-group>`,
    language: 'javascript',
    copy: true,
  },
];
