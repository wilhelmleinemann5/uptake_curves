export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-segmented-control-item";

// CSS
mc-segmented-control-item::part(button) {
  color: #40AB35;
}
mc-segmented-control-item::part(text-and-icon) {
  flex-direction: column;
}
mc-segmented-control-item::part(icon) {
  fill: #40AB35;
}

// HTML
<mc-segmented-control-item
  icon="apple">
    Apple
</mc-segmented-control-item>
  `,
    language: 'javascript',
    copy: true,
  },
];
