import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-button-group selectiontype="single">
  <mc-button-group-item value="Apple">
    Apple
  </mc-button-group-item>
  <mc-button-group-item value="Apricot">
    Apricot
  </mc-button-group-item>
  <mc-button-group-item value="Artichoke">
    Artichoke
  </mc-button-group-item>
</mc-button-group>
`;
