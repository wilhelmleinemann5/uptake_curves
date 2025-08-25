import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
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

export const tabular_figures = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    ${renderComponentBanner(
      'Tabular figures (monospaced numbers)',
      html`<p>These are supported by the Maersk Text and Headline fonts using the CSS classes or the SASS mixin.</p>`,
    )}
    <div style="width: 100%">${unsafeHTML(preview(false, true)[0].template)}</div>
    ${renderCodePreview(preview(true), context)}`;
};
