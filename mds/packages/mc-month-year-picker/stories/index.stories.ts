import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { action } from 'storybook/actions';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Components/Month Year Picker/Documentation',
  component: 'mc-month-year-picker',
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
  const code = generateCode('mc-month-year-picker', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <mc-month-year-picker
      fullwidth="${ifDefined(args.fullwidth === false ? undefined : 'fullwidth')}"
      nopadding="${ifDefined(args.nopadding === false ? undefined : 'nopadding')}"
      .fit="${args.fit}"
      .locale="${args.locale}"
      .yearcap="${args.yearcap}"
      .preventinitialeventdispatch="${args.preventinitialeventdispatch}"
      @monthyearselected="${(event) => action('monthyearselected')(event.detail)}"
    >
    </mc-month-year-picker>
    ${renderCodePreview(code, context)} `;
};
