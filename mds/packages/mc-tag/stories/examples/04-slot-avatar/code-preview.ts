export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tag';
import '@maersk-global/mds-components-core/mc-avatar';

// CSS
mc-tag::part(tag) {
  padding-left: 0;
}

// HTML
<mc-tag withaction fit="medium">
  <span slot="icon">
    <mc-avatar fit="x-small" info="info" initials="JD" appearance="color-1"></mc-avatar>
  </span>
  Jane Doe
</mc-tag>`,
    language: 'javascript',
    copy: true,
  },
];
