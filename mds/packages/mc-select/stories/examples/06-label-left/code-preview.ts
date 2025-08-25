export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-select";
import '@maersk-global/mds-components-core/mc-option';

// CSS
.container {
  display:flex;
  flex-direction: column;
  gap: 12px;
}
mc-select::part(label) {
  width: 160px;
}
mc-select.text-align-right::part(label) {
  text-align: right;
}
@media screen and (max-width: 700px) {
  mc-select.text-align-right::part(label) {
    text-align: left;
  }
}

// HTML
<div class="container">
  <mc-select class="text-align-right" label="Name" labelposition="left">
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-select>
  <mc-select class="text-align-right" label="Long label text that goes over 1 line" labelposition="left">
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-select>
  <hr />
  <mc-select label="Name" labelposition="left">
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-select>
  <mc-select label="Long label text that goes over 1 line" labelposition="left">
    <mc-option value="1">One</mc-option>
    <mc-option value="2">Two</mc-option>
    <mc-option value="3">Three</mc-option>
    <mc-option value="4">Four</mc-option>
    <mc-option value="5">Five</mc-option>
  </mc-select>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
