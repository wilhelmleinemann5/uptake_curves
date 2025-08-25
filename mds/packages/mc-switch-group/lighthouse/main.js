import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-switch-group
  legend="Please select options"
>
  <mc-switch name="fruit" value="Apple" label="Apple" checked></mc-switch>
  <mc-switch name="fruit" value="Orange" label="Orange"></mc-switch>
  <mc-switch name="fruit" value="Banana" label="Banana"></mc-switch>
  <mc-switch name="fruit" value="Lemon" label="Lemon"></mc-switch>
</mc-switch-group>
`;
