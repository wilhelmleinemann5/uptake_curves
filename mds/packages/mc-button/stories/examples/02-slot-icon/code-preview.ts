export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-icon';

// CSS
.my-icon::part(icon) {
  fill: white;
}

// HTML
<mc-button appearance="neutral" label="Label"><span slot="icon"><mc-icon icon="star"></mc-icon></span></mc-button>
<mc-button appearance="primary" label="Label"><span slot="trailingicon"><mc-icon class="my-icon" icon="star"></mc-icon></span></mc-button>`,
    language: 'javascript',
    copy: true,
  },
];
