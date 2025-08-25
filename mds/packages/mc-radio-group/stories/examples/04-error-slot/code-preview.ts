export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-radio";
import '@maersk-global/mds-components-core/mc-radio-group';

// HTML
<mc-radio-group legend="Legend" invalid>
  <span slot="errormessage">Error message as HTML with custom <a class="mds-error__text-color" href="https://designsystem.maersk.com/components/button/index.html">link</a></span>
  <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
  <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
  <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
  <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
</mc-radio-group>`,
    language: 'javascript',
    copy: true,
  },
];
