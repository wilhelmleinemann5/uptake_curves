import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-multi-select
>
  <mc-option value="1">One</mc-option>
  <mc-option value="2">Two</mc-option>
  <mc-option value="3">Three</mc-option>
  <mc-option value="4">Four</mc-option>
  <mc-option value="5">Five</mc-option>
</mc-multi-select>
`;
