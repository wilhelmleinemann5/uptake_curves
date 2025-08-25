export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tooltip';
import '@maersk-global/mds-components-core/mc-button';

// CSS
.tooltip-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 8px;
}
.tooltip-container-content {
  background-color: #328529; 
  color: white; 
  padding: 4px;
}

// HTML
${[1, 2, 3, 4, 5]
  .map((i) => {
    return `<mc-tooltip id="${i}">
  <mc-button slot="trigger" label="Tooltip ${i} with content"></mc-button>
  <span>Lots of content ${i}</span>
</mc-tooltip>
`;
  })
  .join('')}
<div class="tooltip-container">
  <mc-tooltip appearance="neutral-default" fit="small" position="top-center">
    <div slot="trigger" class="tooltip-container-content">Full width 33%</div>
    tooltip
  </mc-tooltip>
  <mc-tooltip appearance="neutral-default" fit="small" position="top-center">
    <div slot="trigger" class="tooltip-container-content">Full width 33%</div>
    tooltip
  </mc-tooltip>
  <mc-tooltip appearance="neutral-default" fit="small" position="top-center">
    <div slot="trigger" class="tooltip-container-content">Full width 33%</div>
    tooltip
  </mc-tooltip>
</div>
  `,
    language: 'javascript',
    copy: true,
  },
];
