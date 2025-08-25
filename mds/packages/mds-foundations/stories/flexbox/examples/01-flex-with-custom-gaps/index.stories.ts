import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';

export default {
  title: 'Layout & navigation/Flexbox/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
};

export const FlexBoxWithCustomGaps = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="width: 100%">${unsafeHTML(template)}</div>
    ${renderCodePreview(preview, context)}`;
};
