export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input-time";

// CSS
.input-container {
  width: 150px;
}
mc-input-time::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-input-time::part(label) {
  color: #000000;
}
mc-input-time::part(input) {
  color: #000000;
}
mc-input-time::part(icon) {
  fill: #000000;
}

// HTML
<div class="input-container">
  <mc-input-time label="Label text"></mc-input-time>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
