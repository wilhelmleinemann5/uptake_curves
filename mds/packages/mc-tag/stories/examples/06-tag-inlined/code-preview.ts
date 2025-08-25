export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tag';

// CSS
.col {
  display: flex;
  gap: 0.5em;
}

// HTML
<div class="col">
  <mc-tag withaction>Default</mc-tag>
  <mc-tag appearance="info" icon="star" withaction>Info</mc-tag>
  <mc-tag appearance="success" trailingicon="heart">Success</mc-tag>
  <mc-tag appearance="warning" withaction>Warning</mc-tag>
  <mc-tag label="Error" appearance="error" withaction></mc-tag>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
