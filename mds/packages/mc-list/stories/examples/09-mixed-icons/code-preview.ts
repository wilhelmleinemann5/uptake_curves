export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";
    
// HTML
<mc-list>  
  <mc-list-item label="Apples" sublabel="Fruit" icon="apple"></mc-list-item>
  <mc-list-item label="Apricots" sublabel="Fruit" icon="empty"></mc-list-item>
  <mc-list-item label="Oranges" sublabel="Fruit" icon="lemon-slice"></mc-list-item>
  <hr />
  <mc-list-item label="Broccoli" sublabel="Vegetables"><span slot="icon">🥦</span></mc-list-item>
  <mc-list-item label="Carrots" sublabel="Vegetables" icon="carrot"></mc-list-item>
</mc-list>`,
    language: 'javascript',
    copy: true,
  },
];
