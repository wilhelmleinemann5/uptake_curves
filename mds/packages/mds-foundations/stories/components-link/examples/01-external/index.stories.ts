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

export const external_link = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
  ${renderComponentBanner(
    'External link opening in a new window',
    html` <p>
      Icons can be used to indicate that a link opens in a new window etc. The icon should announce the behaviour for
      people experiencing low vision conditions, navigating with the aid of screen reading technology etc.
    </p>`,
  )}
  ${unsafeHTML(preview(false)[0].template)} ${renderCodePreview(preview(true), context)}`;
};
