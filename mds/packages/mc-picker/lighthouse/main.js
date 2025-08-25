import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-picker
  aria-label="Label"
>
  <mc-picker-item value="1">Apple</mc-picker-item>
  <mc-picker-item value="2">Orange</mc-picker-item>
  <mc-picker-item value="3">Banana</mc-picker-item>
  <mc-picker-item value="4">Apricot</mc-picker-item>
  <mc-picker-item value="5">Kiwi</mc-picker-item>
  <mc-picker-item value="6">Passion fruit</mc-picker-item>
  <mc-picker-item value="7">Dragon fruit</mc-picker-item>
  <mc-picker-item value="8">Plum</mc-picker-item>
  <mc-picker-item value="9">Avocado</mc-picker-item>
</mc-picker>
`;
