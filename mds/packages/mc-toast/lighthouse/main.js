import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-toast>
    <mc-button slot="trigger">Toast</mc-button>
    <mc-notification body="Body text"></mc-notification>
</mc-toast>
`;
