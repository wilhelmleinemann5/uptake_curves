export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-multi-select";
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-button';

const initValue = ["1", "3"];
const getSelectedOnInput = (event) => {
  const outputInputEvent = document.getElementById('selected-item-oninput');
  outputInputEvent.innerHTML = \`Selected options oninput event are: <br/ >\${JSON.stringify(event.target.value)}\`;
};
const getSelectedOnOptionsSelected = (event) => {
  const outputSelectedEvent = document.getElementById('selected-item-onoptionselected');
  outputSelectedEvent.innerHTML = \`Selected options onoptionselected event are: <br />{\${event.detail.map(item => \`[value: '\${item.value}', label: '\${item.label}']\`)}}\`;
  const mcMultiSelect = document.querySelectorAll('mc-multi-select');
  const dynamicOptions = event.detail.map((item, index) => {
    return \`<mc-option value="\${item.label}-\${index}">\${item.label}-\${index}</mc-option>\`;
  });
  mcMultiSelect[1].innerHTML = dynamicOptions.join('');
};
const changeSelectedValues = (event) => {
  const mcMultiSelect = document.querySelectorAll('mc-multi-select');
  mcMultiSelect[0].value = ["2", "4", "5"];
};
const resetValue = (event) => {
  const mcMultiSelect = document.querySelectorAll('mc-multi-select');
  mcMultiSelect[0].value = "";
  mcMultiSelect[1].value = "";
};

// HTML
<mc-multi-select id="mc-multi-select" label="Select item" .value="\${initValue}" placeholder="Pick a number" @input=\${getSelectedOnInput} @optionselected=\${getSelectedOnOptionsSelected}>
  <mc-option value="1">One</mc-option>
  <mc-option value="2">Two</mc-option>
  <mc-option value="3">Three</mc-option>
  <mc-option value="4">Four</mc-option>
  <mc-option value="5">Five</mc-option>
</mc-multi-select>
<mc-multi-select name="select" label="Select subitem" placeholder="Dynamic items"></mc-multi-select>
<mc-button @click=\${changeSelectedValues}>Change value</mc-button>
<mc-button @click=\${resetValue} appearance="neutral">Reset</mc-button>
<p id="selected-item-oninput"></p>
<p id="selected-item-onoptionselected"></p>`,
    language: 'javascript',
    copy: true,
  },
];
