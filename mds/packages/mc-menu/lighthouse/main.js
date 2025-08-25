import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-menu
>
  <mc-button 
    slot="trigger" 
    icon="bars-horizontal" 
    variant="outlined" 
    appearance="neutral" 
    >Menu
  </mc-button>
  <mc-list>
    <mc-list-item label="One"></mc-list-item>
    <mc-list-item label="Two"></mc-list-item>
    <mc-list-item label="Three"></mc-list-item>
    <mc-list-item label="Four"></mc-list-item>
    <mc-list-item label="Five"></mc-list-item>
  </mc-list>
</mc-menu>
`;
