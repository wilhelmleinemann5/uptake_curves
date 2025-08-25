export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-text-and-icon";

// CSS
mc-text-and-icon::part(text-and-icon) {
  gap: 24px;
}
mc-text-and-icon::part(icon) {
  fill: #767676;
}
mc-text-and-icon::part(text-and-icon-label) {
  width: 100%;
}
mc-text-and-icon::part(text-and-icon-label):after {
  content: ' ...';
}

// HTML
<mc-text-and-icon
  icon="apple"
  trailingicon="banana"
>
  <b>Fruits</b>
  <span slot="sublabel" class="mds-neutral--weak__text-color">Most common ones</span>
</mc-text-and-icon>
  `,
    language: 'javascript',
    copy: true,
  },
];
