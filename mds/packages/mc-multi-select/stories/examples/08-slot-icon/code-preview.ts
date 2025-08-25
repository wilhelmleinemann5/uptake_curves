export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-multi-select";
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-multi-select>
  <span slot="label">
    Label as HTML, i.e. 
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </span>
  <mc-option value="1">One</mc-option>
  <mc-option value="2">Two</mc-option>
  <mc-option value="3">Three</mc-option>
  <mc-option value="4">Four</mc-option>
  <mc-option value="5">Five</mc-option>
</mc-multi-select>`,
    language: 'javascript',
    copy: true,
  },
];
