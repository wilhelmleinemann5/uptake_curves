export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tag';

// CSS
mc-tag::part(tag) {
  background-color: transparent;
  border: 1px grey solid;
}

mc-tag::part(action-button) {
  background-color: #DAF5FF;
  color: #AAEAE0;
  border-color: #DAF5FF;
}

// HTML
<mc-tag label="CSS part" withaction></mc-tag>`,
    language: 'javascript',
    copy: true,
  },
];
