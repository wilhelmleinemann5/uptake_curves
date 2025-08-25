export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-checkbox";
import '@maersk-global/mds-components-core/mc-checkbox-group';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';

// HTML
<mc-checkbox-group>
  <div slot="legend">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
  <mc-checkbox name="fruits" value="Apple" label="Apple" checked></mc-checkbox>
  <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
  <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
  <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox> 
</mc-checkbox-group>
<mc-checkbox-group disabled>
  <div slot="legend">
    Label as HTML, i.e.
    <mc-tooltip>
      <mc-icon slot="trigger" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </div>
  <mc-checkbox name="fruits" value="Apple" checked>
    <div slot="label">
      Apple
      <mc-tooltip>
        <mc-icon slot="trigger" icon="info-circle"></mc-icon>
        <span>The HTML content of the tooltip</span>
      </mc-tooltip>
    </div>
  </mc-checkbox>
  <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
  <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
  <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
</mc-checkbox-group>`,
    language: 'javascript',
    copy: true,
  },
];
