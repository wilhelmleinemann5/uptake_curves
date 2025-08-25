export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-icon';

// CSS
.wrapper {
  display: flex; 
  gap: 1em;
}
.box {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 0.5em;
}

// HTML
<div class="wrapper">
  <div class="box">
    <span>not liked</span>
    <mc-icon color="#ff0000" icon="heart"></mc-icon>
  </div>
  <div class="box">
    <span>liked</span>
    <mc-icon color="#ff0000" icon="heart-solid"></mc-icon>
  </div>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
