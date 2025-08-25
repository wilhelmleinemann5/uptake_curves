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
  title: 'Components/Icon/Documentation',
  component: 'mc-icon',
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
  const code = generateCode('mc-icon', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <mc-notification class="light story-notification" icon="">
        <span
          >To search all supported icons, please visit the
          <a href="https://designsystem.maersk.com/icons/" target="_blank">Maersk Design System website</a></span
        >
      </mc-notification>
      <mc-icon .icon="${args.icon}" .size="${args.size}" .color="${args.color}" .title="${args.title}"></mc-icon>
    </div>
    ${renderCodePreview(code, context)}`;
};
