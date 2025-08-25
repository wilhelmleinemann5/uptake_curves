export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

// CSS
mc-list::part(list) {
  max-width: 44px;
  min-width: auto;
}

// HTML
<mc-list>
  <mc-list-item hiddenlabel label="Apples" icon="apple"></mc-list-item>
  <mc-list-item hiddenlabel label="Bananas" icon="banana"></mc-list-item>
  <mc-list-item hiddenlabel label="Carrots" icon="carrot"></mc-list-item>
  <mc-list-item hiddenlabel label="Lemons" icon="lemon"></mc-list-item>
</mc-list>`,
    language: 'javascript',
    copy: true,
  },
];
