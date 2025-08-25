export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input";

// CSS
.input-container {
  width: 150px;
}
mc-input::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-input::part(label) {
  color: #000000;
}
mc-input::part(field) {
  background-color: #f7f7f7;
}
mc-input::part(input) {
  color: #000000;
  background-color: #f7f7f7;
}
mc-input::part(icon) {
  fill: #000000;
}

// HTML
<div class="input-container">
  <mc-input label="Label text" icon="info-circle"></mc-input>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
