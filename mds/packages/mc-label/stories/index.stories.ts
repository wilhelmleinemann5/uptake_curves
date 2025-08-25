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
  title: 'Utility components/Label/Documentation',
  component: 'mc-label',
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
  const code = generateCode('mc-label', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}<mc-label
      .label="${args.label}"
      .fit="${args.fit}"
      ?hiddenlabel="${args.hiddenlabel}"
    ></mc-label>
    ${renderCodePreview(code, context)}`;
};
