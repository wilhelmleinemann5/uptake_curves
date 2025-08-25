import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { preview } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';

export default {
  title: 'Themes & tokens/Text Content Elements',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const mds = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}${renderComponentBanner(
    'Text Content Elements (mds)',
    html`<p>
      Default styling for body text, headings, lists, paragraphs, strong, em tag and horizontal rule when using the
      <strong>mds</strong> css class. By placing this class on a parent element, you will get Maersk styled text without
      any paddings or margins.
    </p>`,
  )}
  ${unsafeHTML(preview(false, false)[0].template)} ${renderCodePreview(preview(true, false), context)}`;
};

export const mds_content = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}${renderComponentBanner(
      'Text Content Elements (mds-content)',
      html`<p>
        Default styling for body text, headings, lists, paragraphs, strong, em tag and horizontal rule when using the
        <strong>mds-content</strong> css class. By placing this class on a parent element, you will get Maersk styled
        text with paddings and margins.
      </p>`,
    )}
    <div style="width: 100%">${unsafeHTML(preview(false, true)[0].template)}</div>
    ${renderCodePreview(preview(true, true), context)} `;
};
