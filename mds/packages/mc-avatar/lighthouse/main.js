import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-avatar
  info="info"
  appearance="color-1"
>
</mc-avatar>
`;
