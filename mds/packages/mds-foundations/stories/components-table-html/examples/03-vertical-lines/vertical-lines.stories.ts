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

export const Vertical_lines = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}${renderComponentBanner(
    'Basic / minimal setup',
    html`<p>
      The table supports 3 vertical line style classes: <code>mds-table--vertical-lines-solid</code>,
      <code>mds-table--vertical-lines-dashed</code> and <code>mds-table--vertical-lines-dotted</code>
    </p>`,
  )}
  ${unsafeHTML(template)} ${renderCodePreview(preview, context)}`;
};
