import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Picker/Group/Documentation',
  component: 'mc-picker',
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
  <mc-picker-item value="1" label="Apple"></mc-picker-item>
  <mc-picker-item value="2" label="Orange"></mc-picker-item>
  <mc-picker-item value="3" label="Banana"></mc-picker-item>
  <mc-picker-item value="4" label="Apricot"></mc-picker-item>
  <mc-picker-item value="5" label="Kiwi"></mc-picker-item>
  <mc-picker-item value="6" label="Passion fruit"></mc-picker-item>
  <mc-picker-item value="7" label="Dragon fruit"></mc-picker-item>
  <mc-picker-item value="8" label="Plum"></mc-picker-item>
  <mc-picker-item value="9" label="Avocado"></mc-picker-item>`;
  const code = generateCode('mc-picker', argTypes, args, slot);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-picker
      aria-label="${args.arialabel}"
      .fit="${args.fit}"
      @pickerselected="${(event) => action('pickerselected')(event.detail)}"
    >
      <mc-picker-item value="1" label="Apple"></mc-picker-item>
      <mc-picker-item value="2" label="Orange"></mc-picker-item>
      <mc-picker-item value="3" label="Banana"></mc-picker-item>
      <mc-picker-item value="4" label="Apricot"></mc-picker-item>
      <mc-picker-item value="5" label="Kiwi"></mc-picker-item>
      <mc-picker-item value="6" label="Passion fruit"></mc-picker-item>
      <mc-picker-item value="7" label="Dragon fruit"></mc-picker-item>
      <mc-picker-item value="8" label="Plum"></mc-picker-item>
      <mc-picker-item value="9" label="Avocado"></mc-picker-item>
    </mc-picker>
    ${renderCodePreview(code, context)}`;
};
