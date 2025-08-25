import type { Args, StoryContext } from '@storybook/types';
import { action } from 'storybook/actions';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';
const positions = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right'];

export default {
  title: 'Components/Toast/Documentation',
  component: 'mc-toast',
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
  <mc-button 
    label="Click to show toast ${args.position}"
    icon="mouse"
    appearance="neutral"
    variant="plain"
    slot="trigger"></mc-button>
  <mc-notification body="Toast body text"></mc-notification>`;
  const code = generateCode('mc-toast', argTypes, args, slot);

  return html`${unsafeHTML(generateThemeSelector())}
    <mc-toast
      .duration="${args.duration}"
      .fit="${args.fit}"
      .appearance="${args.appearance}"
      .position="${args.position}"
      .width="${args.width !== 'auto' ? args.width : null}"
      .open="${args.open}"
      @close="${(event) => action('close')(event.detail)}"
    >
      ${unsafeHTML(slot)}
    </mc-toast>
    ${renderCodePreview(code, context)}`;
};
