export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-typeahead";
import '@maersk-global/mds-components-core/mc-option';

// CSS
.input-container {
  width: 150px;
}
mc-typeahead::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-typeahead::part(label) {
  color: #000000;
}

// HTML
<div class="input-container">
  <mc-typeahead label="Name" clearbutton>
    <mc-option value="One">One</mc-option>
    <mc-option value="Two">Two</mc-option>
    <mc-option value="Three">Three</mc-option>
    <mc-option value="Four">Four</mc-option>
    <mc-option value="Five">Five</mc-option>
  </mc-typeahead>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
