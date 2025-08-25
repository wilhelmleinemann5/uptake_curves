import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-button appearance="primary">Modal</mc-button>
<mc-modal
  heading="Heading"
>
  <span class="mds-text--medium-normal">
    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
  </span>
  <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">OK</mc-button>
  <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
</mc-modal>
`;
