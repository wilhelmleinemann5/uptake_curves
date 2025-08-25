/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Progress Indicator/Documentation',
  component: 'mc-progress-indicator',
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
  const urlParams = new URLSearchParams(window.location.search);
  const isMDSDocs = urlParams.has('mdsdocs');
  if (isMDSDocs) {
    args.label = args.label + '%';
  }
  const wrapperStyles = styleMap({
    backgroundColor:
      args.appearance == 'neutral-inverse' ? 'var(--mds_brand_appearance_neutral_inverse_background-color)' : null,
    padding: '24px',
    minWidth: args.variant == 'bar' ? '300px' : 'auto',
  });
  const code = generateCode('mc-progress-indicator', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${wrapperStyles}">
      <mc-progress-indicator
        .variant="${args.variant}"
        .value="${args.value}"
        .max="${args.max}"
        .label="${args.label}"
        .orientation="${args.orientation}"
        .appearance="${args.appearance}"
        .fit="${args.fit}"
        ?hiddenlabel="${args.hiddenlabel}"
      ></mc-progress-indicator>
    </div>
    ${renderCodePreview(code, context)} `;
};
