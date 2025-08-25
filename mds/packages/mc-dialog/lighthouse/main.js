import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-button appearance="primary">Dialog</mc-button>
<mc-dialog
    heading="Dialog heading"
    body="Dialog body"
>
  <mc-button slot="secondaryAction" appearance="neutral" dialogaction="cancel">Close</mc-button>
  <mc-button slot="primaryAction" dialogaction="ok">Confirm</mc-button>
</mc-dialog>
`;
