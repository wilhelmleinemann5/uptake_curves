export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-list";
import "@maersk-global/mds-components-core/mc-list-item";

const getSelectedOnListChange = (event) => {
  const outputSelectedEvent = document.getElementById('selected-item-onlistchange');
  outputSelectedEvent.innerHTML = \`Selected list item: \${event.detail.item.value}\`;
}

// HTML
<div class="story">
  <mc-list onlistchange="getSelectedOnListChange">
    <mc-list-item value="1">
      Apple
      <span slot="sublabel">Fruit</span>
    </mc-list-item>
    <mc-list-item value="2">
      Apricot
      <span slot="sublabel">Fruit</span>
    </mc-list-item>
    <mc-list-item value="3">
      Artichoke
      <span slot="sublabel">Vegetable</span>
    </mc-list-item>
  </mc-list>
</div>
<p id="selected-item-onlistchange"></p>`,
    language: 'javascript',
    copy: true,
  },
];
