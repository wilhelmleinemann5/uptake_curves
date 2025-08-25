export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input-date";

// CSS
.input-container {
  width: 150px;
}
mc-input-date::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-input-date::part(label) {
  color: #000000;
}
mc-input-date::part(input) {
  color: #000000;
}
mc-input-date::part(icon) {
  fill: #000000;
}

// HTML
<div class="input-container">
  <mc-input-date label="Label text"></mc-input-date>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
