import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-input-date
    name="checkin-date"
    label="Input Date"
    startofweek="1"
    format="YYYY-MM-DD"
    nextlabel="Next month"
    previouslabel="Previous month"
    placeholder="YYYY-MM-DD"
    width="auto"
>
</mc-input-date>
`;
