import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'Components/Tree Navigation/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
};

export const WithIcons = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}${unsafeHTML(template)} ${renderCodePreview(preview(), context)}`;
};
