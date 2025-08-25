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
  title: 'Utility components/Text And Icon/Documentation',
  component: 'mc-text-and-icon',
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
  const code = generateCode('mc-text-and-icon', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}<mc-text-and-icon
      .label="${args.label}"
      .sublabel="${args.sublabel}"
      .appearance="${args.appearance}"
      .fit="${args.fit}"
      ?hiddenlabel="${args.hiddenlabel}"
      .icon="${args.icon}"
      .trailingicon="${args.trailingicon}"
    ></mc-text-and-icon>
    ${renderCodePreview(code, context)}`;
};
