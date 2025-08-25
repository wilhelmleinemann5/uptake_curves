export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input-group";
import "@maersk-global/mds-components-core/mc-input";
import "@maersk-global/mds-components-core/mc-button";

const swapInputs = () => {
  const inputGroup = document.querySelector('mc-input-group');
  if (inputGroup) {
    const inputs = inputGroup.querySelectorAll('mc-input');
    if (inputs.length === 2) {
      const [firstInput, secondInput] = inputs;

      // Swap placeholders
      const firstPlaceholder = firstInput.getAttribute('placeholder');
      const secondPlaceholder = secondInput.getAttribute('placeholder');
      firstInput.setAttribute('placeholder', secondPlaceholder || '');
      secondInput.setAttribute('placeholder', firstPlaceholder || '');

      // Swap values
      const firstValue = firstInput.value;
      const secondValue = secondInput.value;
      firstInput.value = secondValue;
      secondInput.value = firstValue;
    }
  }
};

// HTML
<style>
  mc-input {
    width: 200px;
  }
</style>

<mc-input-group legend="Search" hiddenlegend disableinnerborder>
  <mc-input label="name" placeholder="name" hiddenlabel></mc-input>
  <mc-button 
    appearance="neutral" 
    label="search" 
    hiddenlabel 
    icon="arrows-left-right" 
    onclick="swapInputs()"></mc-button>
  <mc-input label="surname" placeholder="surname" hiddenlabel></mc-input>
</mc-input-group>`,
    language: 'javascript',
    copy: true,
  },
];
