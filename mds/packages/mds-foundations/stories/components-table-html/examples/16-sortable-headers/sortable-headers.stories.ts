import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { preview, template } from './code-preview';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Components/Table HTML/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const sortable_headers = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
  ${renderComponentBanner(
    'Sortable headers',
    html`<p>
      It is recommended to use the table web component for sortable tables. However, it is possible to wire sorting up
      manually and sorting styles are provided when using mc-button.
    </p>`,
  )}
  ${unsafeHTML(template)} ${renderCodePreview(preview, context)}`;
};
