import { apiServiceCode } from '../api-service-code.ts';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead';

import { apiService } from 'my-api-service';

const setData = async () => {
  const mcTypeahead = document.querySelector('mc-typeahead');
  mcTypeahead.loading = true;
  apiService.options = [];
  apiService.startRow = 0;
  await apiService.search(event.target.value); 
  mcTypeahead.data = apiService.options;
  mcTypeahead.loading = false;
}
const setMoreData = async () => {
  const mcTypeahead = document.querySelector('mc-typeahead');
  await apiService.loadMore(event.target.value); 
  mcTypeahead.data = [...mcTypeahead.data, ...apiService.options];
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
