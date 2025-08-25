export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-picker";
import "@maersk-global/mds-components-core/mc-picker-item";

// CSS
mc-picker::part(container) {
  background-color: #40AB35;
}

// HTML
<mc-picker>
  <mc-picker-item value="1" label="Apple"></mc-picker-item>
  <mc-picker-item value="2" label="Orange"></mc-picker-item>
  <mc-picker-item value="3" label="Banana"></mc-picker-item>
  <mc-picker-item value="4" label="Apricot"></mc-picker-item>
  <mc-picker-item value="5" label="Kiwi"></mc-picker-item>
  <mc-picker-item value="6" label="Passion fruit"></mc-picker-item>
  <mc-picker-item value="7" label="Dragon fruit"></mc-picker-item>
  <mc-picker-item value="8" label="Plum"></mc-picker-item>
  <mc-picker-item value="9" label="Avocado"></mc-picker-item>
</mc-picker>
  `,
    language: 'javascript',
    copy: true,
  },
];
