import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import argTypes from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import { getDefaultValues, generateCode, generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../src/index.ts';

export default {
  title: 'Components/Picker/Item',
  component: 'mc-picker-item',
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
  const code = generateCode('mc-picker-item', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div role="listbox" aria-label="fruits">
      <mc-picker-item .role="${'option'}" .fit="${args.fit}" .label="${args.label}"></mc-picker-item>
    </div>
    ${renderCodePreview(code, context)} `;
};
