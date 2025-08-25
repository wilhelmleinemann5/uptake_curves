export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-select-native';
const mcSelectNative = document.querySelector('mc-select-native');
mcSelectNative.options = [1,2,3,4,5,6];

// HTML
<mc-select-native>
  <span slot="label">Label as HTML with custom <a class="mds-neutral__text-color" href="https://designsystem.maersk.com/components/button/index.html">link</a></span>
</mc-select-native>`,
    language: 'javascript',
    copy: true,
  },
];
