export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-list-item";

// CSS
mc-list-item::part(button) {
  color: #40AB35;
}
mc-list-item::part(text-and-icon) {
  flex-direction: column;
}
mc-list-item::part(icon) {
  fill: #40AB35;
}

// HTML
<mc-list-item
  icon="apple"
  sublabel="Apple is a fruit">
    Apple
</mc-list-item>
  `,
    language: 'javascript',
    copy: true,
  },
];
