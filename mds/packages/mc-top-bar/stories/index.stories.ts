import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Layout & navigation/Top Bar/Documentation',
  component: 'mc-top-bar',
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
  const code = generateCode('mc-top-bar', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-top-bar
      .product=${args.product}
      .productshort=${args.productshort}
      .href="${args.href}"
      .rel="${args.rel}"
      .target="${args.target}"
    ></mc-top-bar>
    ${renderCodePreview(code, context)} `;
};
