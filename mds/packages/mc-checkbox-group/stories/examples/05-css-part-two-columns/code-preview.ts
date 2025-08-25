import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-checkbox";
import '@maersk-global/mds-components-core/mc-checkbox-group';

// CSS
mc-checkbox-group::part(fieldset-container) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
}

// HTML
<mc-checkbox-group legend="Choose your favorite fruits" hint="Select one or more">
  <mc-checkbox name="fruits" value="Apple" label="Apple"></mc-checkbox>
  <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
  <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
  <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
  <mc-checkbox name="fruits" value="Strawberry" label="Strawberry"></mc-checkbox>
  <mc-checkbox name="fruits" value="Mango" label="Mango"></mc-checkbox>
</mc-checkbox-group>`,
    language: 'javascript',
    copy: true,
  } as IMcCCode,
];
