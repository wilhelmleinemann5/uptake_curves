export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-menu";
import "@maersk-global/mds-components-core/mc-list";
import '@maersk-global/mds-components-core/mc-list-item';
import "@maersk-global/mds-components-core/mc-button";

let currentElementIndex = null;
const mcList = document.querySelector('mc-list');

const menuItemClick = (event) => {
const output = document.getElementById('selected-item');
  if (output) {
    currentElementIndex = event.detail.item.value;
    output.innerHTML = \`\${event.detail.item.label} - \${currentElementIndex}\`;
    const items = document.querySelectorAll('mc-list-item');
    items.forEach((item) => {
      item.selected = item.value === currentElementIndex;
    });
  }
};

mcList.addEventListener('listchange', menuItemClick);

// HTML
<p id="selected-item"></p>
<mc-menu position="bottom-left">
  <mc-button slot="trigger" icon="bars-horizontal" hiddenlabel label="menu" variant="outlined" appearance="neutral" ></mc-button>
  <mc-list>
    <mc-list-item label="One"></mc-list-item>
    <mc-list-item label="Two"></mc-list-item>
    <mc-list-item label="Three"></mc-list-item>
    <mc-list-item label="Four"></mc-list-item>
    <mc-list-item label="Five"></mc-list-item>
  </mc-list>      
</mc-menu>`,
    language: 'javascript',
    copy: true,
  },
];
