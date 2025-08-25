import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-button label="Test">
    <mc-badge slot="badge" label="9"></mc-badge>
</mc-button>
`;
