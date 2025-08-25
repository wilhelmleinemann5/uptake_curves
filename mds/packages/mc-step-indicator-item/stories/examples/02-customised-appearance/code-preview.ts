export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-step-indicator-item";

// CSS
mc-step-indicator-item::part(marker) {
  background-color: #40AB35;
  border-color: #40AB35;
}
mc-step-indicator-item::part(step):after {
  background-color: #40AB35;
}
mc-step-indicator-item::part(icon) {
  fill: #FFFFFF;
}

// HTML
<mc-step-indicator-item
  state="completed"
  icon="clock"
  label="ETD">
</mc-step-indicator-item>
  `,
    language: 'javascript',
    copy: true,
  },
];
