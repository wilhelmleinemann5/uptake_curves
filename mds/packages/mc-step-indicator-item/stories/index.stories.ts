import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Step Indicator/Item/Documentation',
  component: 'mc-step-indicator-item',
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
  const code = generateCode('mc-step-indicator-item', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-step-indicator-item
      ?autolayoutdisabled="${args.autolayoutdisabled}"
      ?alignitemsdisabled="${args.alignitemsdisabled}"
      .fit="${args.fit}"
      .state="${args.state}"
      .orientation="${args.orientation}"
      .label="${args.label}"
      .icon="${args.icon}"
      .appearance="${args.appearance}"
    ></mc-step-indicator-item>
    ${renderCodePreview(code, context)}`;
};
