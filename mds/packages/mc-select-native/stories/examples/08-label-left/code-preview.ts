export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-select-native';
const mcSelectNatives = document.querySelectorAll('mc-select-native');
for (let index = 0; index < mcSelectNatives.length; index++) {
  mcSelectNatives[index].options = [1,2,3,4,5,6];
}

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-select-native::part(label) {
  width: 160px;
}
mc-select-native.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-select-native.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-select-native class="text-align-right" label="Name" labelposition="left"></mc-select-native>
  <mc-select-native class="text-align-right" label="Long label text that goes over 1 line" labelposition="left"></mc-select-native>
  <hr />
  <mc-select-native label="Name" labelposition="left"></mc-select-native>
  <mc-select-native label="Long label text that goes over 1 line" labelposition="left"></mc-select-native>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
