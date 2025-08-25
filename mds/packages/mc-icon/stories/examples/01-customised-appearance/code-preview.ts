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
.part mc-icon::part(icon) {
  fill: green;
}

// HTML
<div class="wrapper">
  <div class="box">
    <span>Custom color by using a color property</span>
    <mc-icon color="#42b0d5" icon="heart-solid"></mc-icon>
  </div>
  <div class="box part">
    <span>Custom color by using a CSS part</span>
    <mc-icon icon="heart-solid"></mc-icon>
  </div>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
