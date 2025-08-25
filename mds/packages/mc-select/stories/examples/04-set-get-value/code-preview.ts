export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-select";
import '@maersk-global/mds-components-core/mc-option';

const getValueOnSelected = (event) => {
  const outputInputEvent = document.getElementById('selected-value');
  outputInputEvent.innerHTML = \`Selected value is: <b>\${event.target.value}</b>\`;
};
const getOptionOnSelected = (event) => {
  const outputSelectedEvent = document.getElementById('selected-item');
  outputSelectedEvent.innerHTML = \`Selected item label is: <b>\${event.detail.label}</b> with value: <b>\${event.detail.value}</b>\`;
  const mcSelect = document.querySelectorAll('mc-select');
  mcSelect[1].innerHTML = \`
    <mc-option value="\${event.detail.label}-1">\${event.detail.label}-1</mc-option>
    <mc-option value="\${event.detail.label}-2">\${event.detail.label}-2</mc-option>
    <mc-option value="\${event.detail.label}-3">\${event.detail.label}-3</mc-option>\`;
};
const changeSelectedValue = (event) => {
  const mcSelect = document.querySelectorAll('mc-select');
  mcSelect[0].value = "1";
  const outputInputEvent = document.getElementById('selected-value');
  outputInputEvent.innerHTML = \`Selected value is:  <b>1</b>\`;
  const outputSelectedEvent = document.getElementById('selected-item');
  outputSelectedEvent.innerHTML = \`Selected item label is: <b>One</b> with value: <b>1</b>\`;
};
const resetValue = (event) => {
  const mcSelect = document.querySelectorAll('mc-select');
  mcSelect[0].value = "";
  mcSelect[1].value = "";
};

// HTML
<mc-button onclick="changeSelectedValue">Change value</mc-button>
<mc-button onclick="resetValue" appearance="neutral">Reset</mc-button>
<mc-select name="select" label="Select item" placeholder="Pick a number" value="3" oninput="getValueOnSelected" onoptionselected="getOptionOnSelected">
  <mc-option value="1">One</mc-option>
  <mc-option value="2">Two</mc-option>
  <mc-option value="3">Three</mc-option>
  <mc-option value="4">Four</mc-option>
  <mc-option value="5">Five</mc-option>
</mc-select>
<mc-select name="select" label="Select subitem" placeholder="Dynamic items"></mc-select>
<p id="selected-value"></p>
<p id="selected-item"></p>`,
    language: 'javascript',
    copy: true,
  },
];
