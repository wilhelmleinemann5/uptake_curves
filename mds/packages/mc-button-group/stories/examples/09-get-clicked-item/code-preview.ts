export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-button-group";

const getSelectedOnListChange = (event) => {
  const outputSelectedEvent = document.getElementById('selected-item-onlistchange');
  outputSelectedEvent.innerHTML = \`Selected list item: \${event.detail.item.value}\`;
}

// HTML
<div class="story">
  <mc-button-group onlistchange="getSelectedOnListChange" selectiontype="single">
    <mc-button-group-item value="Apple">
      Apple
    </mc-button-group-item>
    <mc-button-group-item value="Apricot">
      Apricot
    </mc-button-group-item>
    <mc-button-group-item value="Artichoke">
      Artichoke
    </mc-button-group-item>
  </mc-button-group>
</div>
<p id="selected-item-onlistchange"></p>`,
    language: 'javascript',
    copy: true,
  },
];
