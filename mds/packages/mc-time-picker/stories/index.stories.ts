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
  title: 'Components/Time Picker/Documentation',
  component: 'mc-time-picker',
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
  const code = generateCode('mc-time-picker', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-time-picker
      .fit="${args.fit}"
      .hourstep="${args.hourstep}"
      .minutestep="${args.minutestep}"
      ?preselectcurrenttime="${args.preselectcurrenttime}"
      @timeselected="${(event) => action('timeselected')(event.detail)}"
    ></mc-time-picker>
    ${renderCodePreview(code, context)}`;
};
