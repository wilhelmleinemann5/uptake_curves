import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Checkbox Group/Documentation',
  component: 'mc-checkbox-group',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
  const slot = `
  <mc-checkbox name="containers" value="Dry storage" label="Dry storage" checked></mc-checkbox>
  <mc-checkbox name="containers" value="Flat rack" label="Flat rack"></mc-checkbox>
  <mc-checkbox name="containers" value="High cube" label="High cube"></mc-checkbox>
  <mc-checkbox name="containers" value="Reefer" label="Reefer"></mc-checkbox>`;
  const code = generateCode('mc-checkbox-group', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-checkbox-group
      .legend="${args.legend}"
      .hint="${args.hint}"
      ?disabled="${args.disabled}"
      ?invalid="${args.invalid}"
      .orientation="${args.orientation}"
      .fit="${args.fit}"
      .errormessage="${args.errormessage}"
      .value="${args.value}"
      ?autolayoutdisabled="${args.autolayoutdisabled}"
      ?hiddenlegend="${args.hiddenlegend}"
      @change="${(event) => action('change')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-checkbox-group>
    ${renderCodePreview(code, context)}`;
};
