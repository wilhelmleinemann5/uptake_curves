export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-checkbox";

// CSS
mc-checkbox::part(label-container) {
  align-items: center;
  flex-direction: column;
}
mc-checkbox::part(label) {
  color: #328529;
}
mc-checkbox[checked]::part(checkmark) {
  background-color: #328529;
}

// HTML
<mc-checkbox label="Label text"></mc-checkbox>
`,
    language: 'javascript',
    copy: true,
  },
];
