export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';
import icons from '@maersk-global/icons/metadata/metadata.json';

const mcTypeahead = document.querySelector('mc-typeahead');
mcTypeahead.data = icons.map((icon) => ({label: icon.name, value: icon.name, icon: icon.name, sublabel: icon.tags.join(', ')}));
mcTypeahead.addEventListener('optionselected', logOptionSelected);

const logOptionSelected = (event) => {
  const optionSelectedOutput = document.querySelector('#selectedOption');
  if (optionSelectedOutput) {
    optionSelectedOutput.textContent = \`Selected option: \${JSON.stringify(event.detail)}\`;
  }
};

// HTML
<mc-typeahead 
  name="typeahead"
  label="Icon"
  clearbutton
  placeholder="Start typing icon name or category"
></mc-typeahead>
<p id="selectedOption"></p>`,
    language: 'javascript',
    copy: true,
  },
];
