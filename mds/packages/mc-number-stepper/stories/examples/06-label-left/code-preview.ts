export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-number-stepper';

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-number-stepper::part(label) {
  width: 160px;
}
mc-number-stepper.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-number-stepper.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-number-stepper class="text-align-right" label="Name" labelposition="left"></mc-number-stepper>
  <mc-number-stepper class="text-align-right" label="Long label text that goes over 1 line" labelposition="left"></mc-number-stepper>
  <hr />
  <mc-number-stepper label="Name" labelposition="left"></mc-number-stepper>
  <mc-number-stepper label="Long label text that goes over 1 line" labelposition="left"></mc-number-stepper>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
