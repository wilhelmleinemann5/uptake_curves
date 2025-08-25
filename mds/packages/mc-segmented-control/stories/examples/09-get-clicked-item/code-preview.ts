export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// Javascript
import "@maersk-global/mds-components-core/mc-segmented-control";

const getSelectedOnListChange = (event) => {
  const outputSelectedEvent = document.getElementById('selected-item-onlistchange');
  outputSelectedEvent.innerHTML = \`Selected list item: \${event.detail.item.value}\`;
}

// HTML
<div class="story">
  <mc-segmented-control onlistchange="getSelectedOnListChange" type="single">
    <mc-segmented-control-item selected value="Apple">
      Apple
    </mc-segmented-control-item>
    <mc-segmented-control-item value="Apricot">
      Apricot
    </mc-segmented-control-item>
    <mc-segmented-control-item value="Artichoke">
      Artichoke
    </mc-segmented-control-item>
  </mc-segmented-control>
</div>
<p id="selected-item-onlistchange"></p>`,
    language: 'javascript',
    copy: true,
  },
];
