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
const setData = async () => {
  const mcTypeahead = document.querySelector('mc-typeahead');
  mcTypeahead.innerHTML = '';
  mcTypeahead.loading = true;
  apiService.options = [];
  apiService.startRow = 0;
  await apiService.search(event.target.value); 
  const results = renderData();
  results.map(item => mcTypeahead.appendChild(item));
  mcTypeahead.loading = false;
}
const setMoreData = async () => {
  const mcTypeahead = document.querySelector('mc-typeahead');
  await apiService.loadMore(event.target.value); 
  const results = renderData();
  results.map(item => mcTypeahead.appendChild(item));
}

// HTML
<mc-typeahead 
  name="typeahead"
  label="City"
  placeholder="Type min 2 characters"
  clearbutton
  disablefilter
  minchars="2"
  infinitescroll
  optionsheight="300px"
  onsearch="setData()"
  onlistscroll="setMoreData()"
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
