export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-radio";
import '@maersk-global/mds-components-core/mc-radio-group';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-radio-group>
  <div slot="legend">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
  <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
  <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
  <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
  <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
</mc-radio-group>
<mc-radio-group disabled>
  <div slot="legend">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
  <mc-radio name="fruits" value="Apple" checked>
    <div slot="label">
      Apple
      <mc-tooltip>
        <mc-icon slot="trigger" icon="info-circle"></mc-icon>
        <span>The HTML content of the tooltip</span>
      </mc-tooltip>
    </div>
  </mc-radio>
  <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
  <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
  <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
</mc-radio-group>`,
    language: 'javascript',
    copy: true,
  },
];
