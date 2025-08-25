export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input-time';

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-input-time::part(label) {
  width: 160px;
}
mc-input-time.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-input-time.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-input-time class="text-align-right" label="Departure" labelposition="left"></mc-input-time>
  <mc-input-time class="text-align-right" label="Long label text that goes over 1 line" labelposition="left"></mc-input-time>
  <hr />
  <mc-input-time label="Departure" labelposition="left"></mc-input-time>
  <mc-input-time label="Long label text that goes over 1 line" labelposition="left"></mc-input-time>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
