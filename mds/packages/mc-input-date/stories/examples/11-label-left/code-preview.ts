export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-date';

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-input-date::part(label) {
  width: 160px;
}
mc-input-date.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-input-date.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-input-date class="text-align-right" label="Birthday" labelposition="left"></mc-input-date>
  <mc-input-date class="text-align-right" label="Long label text that goes over 1 line" labelposition="left"></mc-input-date>
  <hr />
  <mc-input-date label="Birthday" labelposition="left"></mc-input-date>
  <mc-input-date label="Long label text that goes over 1 line" labelposition="left"></mc-input-date>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
