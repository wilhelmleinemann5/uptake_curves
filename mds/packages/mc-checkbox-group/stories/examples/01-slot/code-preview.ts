export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-checkbox";
import '@maersk-global/mds-components-core/mc-checkbox-group';

// HTML
 <mc-checkbox-group>
  <span slot="legend">Legend as HTML with custom <a href="https://designsystem.maersk.com/components/button/index.html">link</a></span>
  <mc-checkbox name="fruits" value="Apple" label="Apple" checked></mc-checkbox>
  <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
  <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
  <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
</mc-checkbox-group>`,
    language: 'javascript',
    copy: true,
  },
];
