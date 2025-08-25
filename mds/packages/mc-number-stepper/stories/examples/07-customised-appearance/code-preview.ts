export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-number-stepper";

// CSS
.input-container {
  width: 150px;
}
mc-number-stepper::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-number-stepper::part(label) {
  color: #000000;
}
mc-number-stepper::part(input) {
  color: #000000;
}

// HTML
<div class="input-container">
  <mc-number-stepper label="Label text"></mc-number-stepper>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
