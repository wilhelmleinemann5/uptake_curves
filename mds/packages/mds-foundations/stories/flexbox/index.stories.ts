import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';

export default {
  title: 'Layout & navigation/Flexbox',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
};

export const Documentation = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())} <style></style>
    ${renderComponentBanner(
      'MDS Flexbox',
      html`<p>The MDS offers a set of light-weight utility classes to help with common flexbox layout patterns.</p>
        <p>See the examples below and associated code for more details.</p>`,
    )}
    <div style="width: 100%">${unsafeHTML(template)}</div>
    ${renderCodePreview(preview, context)}`;
};
