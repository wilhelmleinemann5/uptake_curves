export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-switch-group';
import '@maersk-global/mds-components-core/mc-switch';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-switch-group>
  <div slot="legend">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
  <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
  <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
  <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
  <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
</mc-switch-group>
<mc-switch-group disabled>
  <div slot="legend">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
  <mc-switch name="fruits" value="Apple" checked>
    <div slot="label">
      Apple
      <mc-tooltip>
        <mc-icon slot="trigger" icon="info-circle"></mc-icon>
        <span>The HTML content of the tooltip</span>
      </mc-tooltip>
    </div>
  </mc-switch>
  <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
  <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
  <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
</mc-switch-group>`,
    language: 'javascript',
    copy: true,
  },
];
