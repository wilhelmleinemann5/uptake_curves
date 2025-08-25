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
  title: 'Components/Tag/Documentation',
  component: 'mc-tag',
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
  const code = generateCode('mc-tag', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="${
      args.appearance === 'neutral-default' && !isMDSDocs
        ? 'background-color: var(--mds_brand_appearance_primary_default_background-color); padding: 24px;'
        : ''
    }"width: 200px;">
        <mc-tag
        .label="${args.label}"
        .appearance="${args.appearance}"
        .width="${args.width}"
        .fit="${args.fit}"
        .icon="${args.icon}"
        .trailingicon="${args.trailingicon}"
        ?hiddenlabel="${args.hiddenlabel}"
        ?withaction="${args.withaction}"
        @dismiss="${(event) => action('dismiss')(event.detail)}"
      ></mc-tag>
</div>
    ${renderCodePreview(code, context)}`;
};
