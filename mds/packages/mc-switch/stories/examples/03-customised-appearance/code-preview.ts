export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-switch";

// CSS
mc-switch::part(label-container) {
  align-items: center;
  flex-direction: column;
}
mc-switch::part(label) {
  color: #328529;
}
mc-switch[checked]::part(checkmark) {
  background-color: #328529;
}

// HTML
<mc-switch label="Label text"></mc-switch>
`,
    language: 'javascript',
    copy: true,
  },
];
