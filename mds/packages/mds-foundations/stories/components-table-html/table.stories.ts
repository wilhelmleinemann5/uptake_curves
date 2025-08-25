import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { preview } from './code-preview';
import { templateStory } from './table-story';
import { argTypes } from './argTypes';
import { getDefaultValues, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Components/Table HTML',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};

export const documentation = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}${templateStory(args)} ${renderCodePreview(preview(args), context)}`;
};
