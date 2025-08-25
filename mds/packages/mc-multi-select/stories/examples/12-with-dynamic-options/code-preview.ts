export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-select";
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-button';

const removeLastOption = () => {
  const mcMultiSelect = document.querySelector('mc-multi-select');
  mcMultiSelect.lastElementChild.remove();
};
const addLastOption = () => {
  const mcMultiSelect = document.querySelector('mc-multi-select');
  const option = document.createElement("mc-option");
  const item = Math.random().toString(36).slice(2);
  option.value = item;
  option.label = item;
  mcMultiSelect.append(option);
};

// HTML
<mc-multi-select label="Select item">
  <mc-option value="1">One</mc-option>
  <mc-option value="2">Two</mc-option>
  <mc-option value="3">Three</mc-option>
  <mc-option value="a">A</mc-option>
  <mc-option value="b">B</mc-option>
  <mc-option value="c">C</mc-option>
</mc-multi-select>
<mc-button onclick="removeLastOption">Remove last option</mc-button>
<mc-button onclick="addLastOption">Add last option</mc-button>`,
    language: 'javascript',
    copy: true,
  },
];
