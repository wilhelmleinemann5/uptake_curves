import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Components/Link/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const Colours = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
  ${renderComponentBanner(
    'Colours',
    html`<p>Apply a colour "text-color" or "on-background-color" class directly to the link.</p>`,
  )}
  ${unsafeHTML(preview(false)[0].template)} ${renderCodePreview(preview(true), context)} `;
};
