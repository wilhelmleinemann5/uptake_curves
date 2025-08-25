export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-radio';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-radio>
  <span slot="label">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </span>
</mc-radio>
<mc-radio disabled>
  <span slot="label">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </span>
</mc-radio>`,
    language: 'javascript',
    copy: true,
  },
];
