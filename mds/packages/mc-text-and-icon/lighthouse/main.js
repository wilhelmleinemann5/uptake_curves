import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-text-and-icon
  icon="apple"
  trailingicon="airplane"
>Text and icon
</mc-text-and-icon>
`;
