import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-calendar
  startofweek="1"
  locale="en-GB"
  nextlabel="Next month"
  previouslabel="Previous month"
  noshadow
>
</mc-calendar>
`;
