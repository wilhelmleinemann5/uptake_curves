import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-step-indicator
>
<mc-step-indicator-item
  state="completed"
  label="ETD">
</mc-step-indicator-item>
<mc-step-indicator-item
  state="completed"
  label="Release Sent">
</mc-step-indicator-item>
<mc-step-indicator-item
  state="current"
  label="Carrier Released">
</mc-step-indicator-item>
<mc-step-indicator-item 
  label="ETA"
  state="pending">
</mc-step-indicator-item>
</mc-step-indicator>
`;
