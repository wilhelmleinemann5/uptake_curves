export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-avatar";

// CSS
mc-avatar::part(avatar) {
  background-color: #00897A;
  color: #AAEAE0;
}
mc-avatar::part(tooltip-container) {
  background-color: #00897A;
  color: #AAEAE0;
  border-color: #00897A;
}
mc-avatar::part(tooltip-arrow) {
  background: #00897A;
  border-color: #00897A;
}

// HTML
<mc-avatar
  info="Jane Doe"
  initials="JAD"
>
</mc-avatar>
  `,
    language: 'javascript',
    copy: true,
  },
];
