import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-tooltip
>
<mc-button slot="trigger">Your target element, in this example a button, it can be any element</mc-button>
<span>The HTML content of the tooltip</span>
</mc-tooltip>
`;
