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

export default {
  title: 'Components/Pagination/Documentation',
  component: 'mc-pagination',
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
  const code = generateCode('mc-pagination', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-pagination
      .totalpages="${args.totalpages}"
      .currentpage="${args.currentpage}"
      .hiddenlabels="${args.hiddenlabels}"
      .visiblepages="${args.visiblepages}"
      .previouslabel="${args.previouslabel}"
      .nextlabel="${args.nextlabel}"
      .arialabel="${args.arialabel}"
      .fit="${args.fit}"
      .disabledtruncation="${args.disabledtruncation}"
      @pagechange="${(event) => action('pagechange')(event.detail)}"
    ></mc-pagination>
    ${renderCodePreview(code, context)}`;
};
