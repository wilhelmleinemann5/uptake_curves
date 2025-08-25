export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-select-native';
const options = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
const numberSelector = document.querySelector('mc-select-native');
numberSelector.options = options;

// HTML
<mc-select-native></mc-select-native>`,
    language: 'javascript',
    copy: true,
  },
];
