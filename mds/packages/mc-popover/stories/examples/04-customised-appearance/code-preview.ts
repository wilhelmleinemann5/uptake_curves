export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-popover';
import '@maersk-global/mds-components-core/mc-button';

// CSS
mc-popover::part(container){
  background-color: #F7F7F7;
  padding: 8px;
}
mc-popover::part(arrow){
  background-color: #F7F7F7;
}

// HTML
<mc-popover arrow="true">
  <mc-button slot="trigger" label="Click me"></mc-button>
  <div class="content">
    <span>This vessel has 50% capacity left</span>
  </div>
</mc-popover>`,
    language: 'javascript',
    copy: true,
  },
];
