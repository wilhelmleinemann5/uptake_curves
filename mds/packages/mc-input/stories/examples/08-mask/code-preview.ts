export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input";

const handleInputChange = (e) => {
  document.querySelector('#creditCardNumberUnmasked').innerHTML = \`Unmasked value:  $\{e.target.value}\`;
  document.querySelector('#creditCardNumberMasked').innerHTML = \`Masked value: $\{e.target.maskController.maskedValue}\`;
};

// HTML
<mc-input name="creditCardNumber" label="Credit card number" input=handleInputChange mask="0000 0000 0000 0000" placeholder="1234 1234 1234 1234"></mc-input>
<div id="creditCardNumberUnmasked"></div>
<div id="creditCardNumberMasked"></div>`,
    language: 'javascript',
    copy: true,
  },
];
