import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-radio-group
  legend="Please select options"
>
  <mc-radio name="fruit" value="Apple" label="Apple" checked></mc-radio>
  <mc-radio name="fruit" value="Orange" label="Orange"></mc-radio>
  <mc-radio name="fruit" value="Banana" label="Banana"></mc-radio>
  <mc-radio name="fruit" value="Lemon" label="Lemon"></mc-radio>
</mc-radio-group>
`;
