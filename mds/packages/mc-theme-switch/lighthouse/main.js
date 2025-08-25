import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-theme-switch>
</mc-theme-switch>
<p>If the icon fails to load, this is here so the test does not fail</p>
`;
