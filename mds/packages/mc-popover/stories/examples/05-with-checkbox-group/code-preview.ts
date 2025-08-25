export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-popover';
import '@maersk-global/mds-components-core/mc-button';
import "@maersk-global/mds-components-core/mc-checkbox";
import "@maersk-global/mds-components-core/mc-checkbox-group";
import "@maersk-global/mds-components-core/mc-radio";
import "@maersk-global/mds-components-core/mc-radio-group";
import "@maersk-global/mds-components-core/mc-switch";
import "@maersk-global/mds-components-core/mc-switch-group";

const checkboxGroupChange = (e) => {
  const selectedValues = document.querySelector('#selected-checkbox-group-values');
  selectedValues.innerHTML = e.detail.join(', ');
}  
const radioGroupChange = (e) => {
  const selectedValues = document.querySelector('#selected-radio-group-values');
  selectedValues.innerHTML = e.detail;
}
const switchGroupChange = (e) => {
  const selectedValues = document.querySelector('#selected-switch-group-values');
  selectedValues.innerHTML = e.detail.join(', ');
}

// CSS
mc-checkbox-group, mc-radio-group, mc-switch-group {
  padding: 16px;
  display: block;
  width: 200px;
}

// HTML
<mc-popover position="bottom-left">
  <mc-button slot="trigger" label="Select fruit"></mc-button>
  <mc-checkbox-group
    legend="Please select options"
    hiddenlegend="true"
    onchange="\${checkboxGroupChange}"
  >
    <mc-checkbox name="fruit" value="Apple" label="Apple" checked></mc-checkbox>
    <mc-checkbox name="fruit" value="Orange" label="Orange"></mc-checkbox>
    <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
    <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
  </mc-checkbox-group>
</mc-popover>
<div id="selected-checkbox-group-values"></div>

<mc-popover position="bottom-left">
  <mc-button slot="trigger" label="Select fruit"></mc-button>
  <mc-radio-group
    legend="Please select options"
    hiddenlegend="true"
    onchange="\${radioGroupChange}"
  >
    <mc-radio name="fruit" value="Apple" label="Apple" checked></mc-radio>
    <mc-radio name="fruit" value="Orange" label="Orange"></mc-radio>
    <mc-radio name="fruit" value="Banana" label="Banana"></mc-radio>
    <mc-radio name="fruit" value="Lemon" label="Lemon"></mc-radio>
  </mc-radio-group>
</mc-popover>
<div id="selected-radio-group-values"></div>

<mc-popover position="bottom-left">
  <mc-button slot="trigger" label="Select fruit"></mc-button>
  <mc-switch-group
    legend="Please select options"
    hiddenlegend="true"
    orientation="horizontal"
    onchange="\${switchGroupChange}"
  >
    <mc-switch name="fruit" value="Apple" label="Apple" checked></mc-switch>
    <mc-switch name="fruit" value="Orange" label="Orange"></mc-switch>
    <mc-switch name="fruit" value="Banana" label="Banana"></mc-switch>
    <mc-switch name="fruit" value="Lemon" label="Lemon"></mc-switch>
  </mc-switch-group>
</mc-popover>
<div id="selected-switch-group-values"></div>`,
    language: 'javascript',
    copy: true,
  },
];
