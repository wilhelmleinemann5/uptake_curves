export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tab';
    
// CSS
.prefix:before {
  content: '\\2713';
  display: inline-block;
  color: green;
  padding: 0 6px 0 0;
}

// HTML
<mc-tab label="Prices">
  <span class="prefix" slot="prefix">prefix</span>
  <span slot="suffix">$</span>
</mc-tab>
`,
    language: 'javascript',
    copy: true,
  },
];
