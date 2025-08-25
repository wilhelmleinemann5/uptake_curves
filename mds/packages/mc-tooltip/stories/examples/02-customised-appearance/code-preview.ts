export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-tooltip";

// CSS
mc-tooltip::part(popover-arrow) {
  background-color: #FFFBF5;
}

mc-tooltip::part(popover-container) {
  background-color: #FFFBF5;
}

// HTML
<mc-tooltip>
  <mc-button slot="trigger" icon="heart" hiddenlabel></mc-button>
  <span>The HTML content of the tooltip</span>
</mc-tooltip>
  `,
    language: 'javascript',
    copy: true,
  },
];
