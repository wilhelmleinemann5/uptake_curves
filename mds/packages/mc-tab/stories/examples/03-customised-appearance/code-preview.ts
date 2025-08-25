export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-tab";

// CSS
mc-tab::part(button) {
  color: #40AB35;
}
mc-tab::part(text-and-icon) {
  flex-direction: column;
}
mc-tab::part(icon) {
  fill: #40AB35;
}

// HTML
<mc-tab icon="apple">
    Apple
</mc-tab>
  `,
    language: 'javascript',
    copy: true,
  },
];
