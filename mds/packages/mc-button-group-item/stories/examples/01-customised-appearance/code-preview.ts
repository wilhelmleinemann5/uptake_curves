export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-button-group-item";

// CSS
mc-button-group-item::part(button) {
  color: #40AB35;
}
mc-button-group-item::part(text-and-icon) {
  flex-direction: column;
}
mc-button-group-item::part(icon) {
  fill: #40AB35;
}

// HTML
<mc-button-group-item
  icon="apple">
    Apple
</mc-button-group-item>
  `,
    language: 'javascript',
    copy: true,
  },
];
