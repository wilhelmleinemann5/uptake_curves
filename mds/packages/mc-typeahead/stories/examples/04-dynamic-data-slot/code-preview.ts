import { apiServiceCode } from '../api-service-code.ts';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';
import '@maersk-global/mds-components-core/mc-option';

import { apiService } from 'my-api-service';

const renderData = () => {
  return apiService.options ? [...apiService.options].map(item => {
      const option = document.createElement('mc-option');
      option.value = item.value;
      option.sublabel = item.sublabel;
      option.innerHTML = \`<i>\${item.label}</i>\`;
      return option;
  }) : null;
}

const setData = async (event) => {
  const mcTypeahead = document.querySelector('mc-typeahead');
  mcTypeahead.innerHTML = '';
  mcTypeahead.loading = true;
  await apiService.search(event.target.value); 
  const results = renderData();
  results.map(item => mcTypeahead.appendChild(item));
  mcTypeahead.loading = false;
}

// HTML
<mc-typeahead 
  name="typeahead"
  label="City"
  placeholder="Type min 3 characters"
  minchars="3"
  disablefilter
  clearbutton
  onsearch="setData(event)"
></mc-typeahead>`,
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
