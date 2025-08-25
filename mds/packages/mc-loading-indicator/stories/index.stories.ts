import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index';

export default {
  title: 'Components/Loading Indicator/Documentation',
  component: 'mc-loading-indicator',
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
  const wrapperStyles = styleMap({
    backgroundColor:
      args.appearance == 'neutral-inverse' ? 'var(--mds_brand_appearance_neutral_inverse_background-color)' : null,
    padding: '24px',
    minWidth: args.variant == 'bar' ? '300px' : 'auto',
  });
  const code = generateCode('mc-loading-indicator', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${wrapperStyles}">
      <mc-loading-indicator
        .label="${args.label}"
        ?hiddenlabel="${args.hiddenlabel}"
        .variant="${args.variant}"
        .appearance="${args.appearance}"
        .orientation="${args.orientation}"
        .fit="${args.fit}"
      ></mc-loading-indicator>
    </div>
    ${renderCodePreview(code, context)}`;
};
