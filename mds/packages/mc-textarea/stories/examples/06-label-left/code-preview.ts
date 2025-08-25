export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-textarea';

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-textarea::part(label) {
  width: 160px;
}
mc-textarea.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-textarea.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-textarea class="text-align-right" label="Description" labelposition="left"></mc-textarea>
  <mc-textarea class="text-align-right" label="Long label text that goes over 1 line" labelposition="left"></mc-textarea>
  <hr />
  <mc-textarea label="Description" labelposition="left"></mc-textarea>
  <mc-textarea label="Long label text that goes over 1 line" labelposition="left"></mc-textarea>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
