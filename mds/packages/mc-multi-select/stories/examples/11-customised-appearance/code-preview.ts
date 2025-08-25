export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-multi-select";
import '@maersk-global/mds-components-core/mc-option';

// CSS
.input-container {
  width: 150px;
}
mc-multi-select::part(label-container) {
  display: flex;
  justify-content: flex-end;
}
mc-multi-select::part(label) {
  color: #000000;
}
mc-multi-select::part(selected-option) {
  color: #000000;
}
mc-multi-select::part(popover-content) {
  box-shadow: none;
  z-index: 1000;
}

// HTML
<div class="input-container">
  <mc-multi-select label="Name">
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-multi-select>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
