import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-typeahead label="Name" clearbutton>
  <mc-option value="One">One</mc-option>
  <mc-option value="Two">Two</mc-option>
  <mc-option value="Three" disabled>Three</mc-option>
  <mc-option value="Four">Four</mc-option>
  <mc-option value="Five">Five</mc-option>
</mc-typeahead>
`;
