export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-select-native";
const mcSelectNative = document.querySelector('mc-select-native');
mcSelectNative.options = [1,2,3,4,5,6];

// CSS
.input-container {
  width: 200px;
}
mc-select-native::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-select-native::part(label) {
  color: #000000;
}

// HTML
<div class="input-container">
  <mc-select-native label="Label text"></mc-select-native>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
