export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input';
const mcSelectNative = document.querySelector('mc-select-native');
mcSelectNative.options = [1,2,3,4,5,6];

// HTML
<mc-input invalid>
  <span slot="errormessage">Error message as HTML with custom <a class="mds-error__text-color" href="https://designsystem.maersk.com/components/button/index.html">link</a></span>
</mc-input>`,
    language: 'javascript',
    copy: true,
  },
];
