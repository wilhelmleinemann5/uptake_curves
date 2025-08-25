export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-switch';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-switch>
  <div slot="label">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
</mc-switch>
<mc-switch disabled>
  <div slot="label">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
</mc-switch>`,
    language: 'javascript',
    copy: true,
  },
];
