export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tooltip';

const hasTooltip = false;

// HTML
<mc-tooltip width="150">
  <span slot="trigger">Tooltip content</span>
  \${hasTooltip ? \`<span>Tooltip body text</span>\` : null}
</mc-tooltip>`,
    language: 'javascript',
    copy: true,
  },
];
