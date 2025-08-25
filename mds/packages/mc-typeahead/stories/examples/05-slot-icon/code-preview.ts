export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-input>
  <span slot="label">
    Label as HTML, i.e. 
    <mc-tooltip>
      <mc-icon slot="trigger" class="icon" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </span>
</mc-input>`,
    language: 'javascript',
    copy: true,
  },
];
