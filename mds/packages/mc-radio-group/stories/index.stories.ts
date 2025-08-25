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
  title: 'Components/Radio Group/Documentation',
  component: 'mc-radio-group',
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
  <mc-radio name="containers" value="Dry storage" label="Dry storage" checked></mc-radio>
  <mc-radio name="containers" value="Flat rack" label="Flat rack"></mc-radio>
  <mc-radio name="containers" value="High cube" label="High cube"></mc-radio>
  <mc-radio name="containers" value="Reefer" label="Reefer"></mc-radio>`;
  const code = generateCode('mc-radio-group', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-radio-group
      .legend="${args.legend}"
      ?invalid="${args.invalid}"
      ?disabled="${args.disabled}"
      .orientation="${args.orientation}"
      .fit="${args.fit}"
      .hint="${args.hint}"
      .errormessage="${args.errormessage}"
      .value="${args.value}"
      ?autolayoutdisabled="${args.autolayoutdisabled}"
      ?hiddenlegend="${args.hiddenlegend}"
      @change="${(event) => action('change')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-radio-group>
    ${renderCodePreview(code, context)}`;
};
