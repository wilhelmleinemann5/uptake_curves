import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { action } from 'storybook/actions';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Tooltip/Documentation',
  component: 'mc-tooltip',
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
  <mc-button slot="trigger" label="Hover to see tooltip" icon="mouse" appearance="neutral" variant="plain"></mc-button>
  <span>Tooltip text</span>`;
  const code = generateCode('mc-tooltip', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <div id="tooltip__container">
      <mc-tooltip
        .position="${args.position}"
        .appearance="${args.appearance}"
        .fit="${args.fit}"
        .width="${args.width}"
        .opendelay="${args.opendelay}"
        .zindex="${args.zindex}"
        ?open="${args.open}"
        @show="${(event) => action('show')(event)}"
        @hide="${(event) => action('hide')(event)}"
      >
        ${unsafeHTML(slot)}
      </mc-tooltip>
    </div>
    ${renderCodePreview(code, context)}`;
};
