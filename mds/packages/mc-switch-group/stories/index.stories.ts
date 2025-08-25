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
  title: 'Components/Switch Group/Documentation',
  component: 'mc-switch-group',
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
  <mc-switch name="settings" value="airplanemode" label="Airplane mode"></mc-switch>
  <mc-switch name="settings" value="wifi" label="Wi-Fi" checked></mc-switch>
  <mc-switch name="settings" value="bluetooth" label="Bluetooth"></mc-switch>`;
  const code = generateCode('mc-switch-group', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="min-width: 300px;">
      <mc-switch-group
        .legend="${args.legend}"
        .hint="${args.hint}"
        ?invalid="${args.invalid}"
        ?disabled="${args.disabled}"
        .orientation="${args.orientation}"
        .fit="${args.fit}"
        .errormessage="${args.errormessage}"
        .value="${args.value}"
        ?autolayoutdisabled="${args.autolayoutdisabled}"
        ?hiddenlegend="${args.hiddenlegend}"
        @change="${(event) => action('change')(event.detail)}"
      >
        ${unsafeHTML(slot)}
      </mc-switch-group>
    </div>
    ${renderCodePreview(code, context)} `;
};
