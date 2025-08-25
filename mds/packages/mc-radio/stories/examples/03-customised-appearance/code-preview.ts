export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-radio";

// CSS
mc-radio::part(label-container) {
  align-items: center;
  flex-direction: column;
}
mc-radio::part(label) {
  color: #328529;
}
mc-radio[checked]::part(checkmark) {
  background-color: #328529;
}

// HTML
<mc-radio label="Label text"></mc-radio>
`,
    language: 'javascript',
    copy: true,
  },
];
