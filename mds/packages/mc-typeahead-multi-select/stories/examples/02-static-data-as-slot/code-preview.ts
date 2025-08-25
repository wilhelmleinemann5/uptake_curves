export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-typeahead-multi-select';
import '@maersk-global/mds-components-core/mc-option';

import icons from '@maersk-global/icons/metadata/metadata.json';

const renderData = () => {
  return icons ? [...icons].map(icon => {
      const option = document.createElement('mc-option');
      option.value = icon.value;
      option.innerHTML = \`
        <mc-icon icon="\${icon.name}"></mc-icon>&nbsp;<b>\${icon.name}</b>
        <span slot="sublabel"><i>\${icon.tags.join(', ')}</i></span>\`;
      return option;
  }) : null;
}

const mcTypeahead = document.querySelector('mc-typeahead-multi-select');
const results = renderData();
results.map(item => mcTypeahead.appendChild(item));

<mc-typeahead-multi-select 
  name="typeahead"
  label="Icon"
  clearbutton
  placeholder="Start typing icon name or category"
></mc-typeahead-multi-select>`,
    language: 'javascript',
    copy: true,
  },
];
