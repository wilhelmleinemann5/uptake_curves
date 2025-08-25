import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-segmented-control selectiontype="single">
  <mc-segmented-control-item value="Apple">
    Apple
  </mc-segmented-control-item>
  <mc-segmented-control-item value="Apricot">
    Apricot
  </mc-segmented-control-item>
  <mc-segmented-control-item value="Artichoke">
    Artichoke
  </mc-segmented-control-item>
</mc-segmented-control>
`;
