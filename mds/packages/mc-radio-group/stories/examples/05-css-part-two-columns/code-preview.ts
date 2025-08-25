import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-radio";
import '@maersk-global/mds-components-core/mc-radio-group';

// CSS
mc-radio-group::part(fieldset-container) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
}

// HTML
<mc-radio-group legend="Choose a shipping option" hint="Select one option">
  <mc-radio name="shipping" value="Standard" label="Standard (3-5 days)"></mc-radio>
  <mc-radio name="shipping" value="Express" label="Express (1-2 days)"></mc-radio>
  <mc-radio name="shipping" value="Overnight" label="Overnight"></mc-radio>
  <mc-radio name="shipping" value="PickUp" label="In-store pickup"></mc-radio>
  <mc-radio name="shipping" value="International" label="International"></mc-radio>
  <mc-radio name="shipping" value="Special" label="Special handling"></mc-radio>
</mc-radio-group>`,
    language: 'javascript',
    copy: true,
  } as IMcCCode,
];
