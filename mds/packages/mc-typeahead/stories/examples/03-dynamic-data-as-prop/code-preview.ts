import { apiServiceCode } from '../api-service-code.ts';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';

import { apiService } from 'my-api-service';

const mcTypeahead = document.querySelector('mc-typeahead');
mcTypeahead.addEventListener('optionselected', logOptionSelected);
mcTypeahead.addEventListener('search', setData);

const setData = async () => {
  mcTypeahead.loading = true;
  await apiService.search(event.target.value); 
  mcTypeahead.data = apiService.options ? [...apiService.options] : [];
  mcTypeahead.loading = false;
}

const logOptionSelected = (event) => {
  const optionSelectedOutput = document.querySelector('#selectedOption');
  if (optionSelectedOutput) {
    optionSelectedOutput.textContent = \`Selected option: \${JSON.stringify(event.detail)}\`;
  }
};

// HTML
<mc-typeahead 
  name="typeahead"
  label="City"
  clearbutton
  placeholder="Type min 3 characters"
  minchars="3"
  disablefilter
></mc-typeahead>
<p id="selectedOption"></p>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'apiService',
    template: `${apiServiceCode}`,
    language: 'js',
    copy: true,
  },
];
