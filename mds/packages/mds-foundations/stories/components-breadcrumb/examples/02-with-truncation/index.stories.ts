import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'Components/Breadcrumb/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
};

export const TruncatedLabel = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}${unsafeHTML(template)} ${renderCodePreview(preview, context)}`;
};
