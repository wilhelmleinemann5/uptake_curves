export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-select-native';
import '@maersk-global/mds-components-core/mc-icon';
import '@maersk-global/mds-components-core/mc-tooltip';
const mcSelectNative = document.querySelector('mc-select-native');
mcSelectNative.options = [1,2,3,4,5,6];

// HTML
<mc-select-native>
  <span slot="label">
    Label as HTML, i.e. 
    <mc-tooltip>
      <mc-icon slot="trigger" class="icon" icon="info-circle"></mc-icon>
      <span>The HTML content of the tooltip</span>
    </mc-tooltip>
  </span>
</mc-select-native>`,
    language: 'javascript',
    copy: true,
  },
];
