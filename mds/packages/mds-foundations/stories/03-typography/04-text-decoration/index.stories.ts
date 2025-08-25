import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Themes & tokens/Typography',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const text_decoration = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="width: 100%">${unsafeHTML(preview(false)[0].template)}</div>
    ${renderCodePreview(preview(true), context)}`;
};
