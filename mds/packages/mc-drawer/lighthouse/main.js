import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-button appearance="primary">Drawer</mc-button>
<mc-drawer>
<span>Drawer content</span>
<mc-button slot="footer" appearance="neutral" dialogaction="cancel">Close</mc-button>
</mc-drawer>
`;
