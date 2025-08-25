export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-notification';

// CSS
mc-notification::part(notification) {
  background-color: #00897A;
  color: white;
}
mc-notification::part(icon) {
  fill: white;
}

// HTML
<mc-notification icon="star" heading="Heading">
  <div>Body text</div>
</mc-notification>`,
    language: 'javascript',
    copy: true,
  },
];
