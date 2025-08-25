export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input';

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-input::part(label) {
  width: 160px;
}
mc-input.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-input.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-input class="text-align-right" label="Name" labelposition="left"></mc-input>
  <mc-input class="text-align-right" label="Long label text that goes over 1 line" labelposition="left"></mc-input>
  <hr />
  <mc-input label="Name" labelposition="left"></mc-input>
  <mc-input label="Long label text that goes over 1 line" labelposition="left"></mc-input>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
