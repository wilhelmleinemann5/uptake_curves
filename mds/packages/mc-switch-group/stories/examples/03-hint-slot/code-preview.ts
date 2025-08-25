export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-switch";
import '@maersk-global/mds-components-core/mc-switch-group';

// HTML
<mc-switch-group legend="Legend">
  <span slot="hint">Hint as HTML with custom <a class="mds-neutral--weak__text-color" href="https://designsystem.maersk.com/components/button/index.html">link</a></span>
  <mc-switch name="fruits" value="Apple" label="Apple" checked></mc-switch>
  <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
  <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
  <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
</mc-switch-group>`,
    language: 'javascript',
    copy: true,
  },
];
