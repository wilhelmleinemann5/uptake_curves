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
.size48::part(icon) {
  transform: scale(2);
}

// HTML
<div class="wrapper">
  <div class="box">
    <span>small - 16px</span>
    <mc-icon size="16" icon="heart"></mc-icon>
  </div>
  <div class="box">
    <span>small - 20px</span>
    <mc-icon icon="heart"></mc-icon>
  </div>
  <div class="box">
    <span>large - 24px</span>
    <mc-icon size="24" icon="heart"></mc-icon>
  </div>
  <div class="box">
    <span>custom width of 48px</span>
    <mc-icon size="24" icon="heart"></mc-icon>
  </div>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
