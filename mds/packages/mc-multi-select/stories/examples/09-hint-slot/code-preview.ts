export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-multi-select";
import '@maersk-global/mds-components-core/mc-option';

// HTML
<mc-multi-select label="Name">
  <span slot="hint">Hint as HTML with custom <a class="mds-neutral--weak__text-color" href="https://designsystem.maersk.com/components/button/index.html">link</a></span>
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
