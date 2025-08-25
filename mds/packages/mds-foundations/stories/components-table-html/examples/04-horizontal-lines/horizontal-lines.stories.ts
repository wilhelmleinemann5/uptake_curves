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

export const horizontal_lines = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
  ${renderComponentBanner(
    'Horizontal lines',
    html`<p>
      The table supports 3 additional horizontal line style classes from the default solid style:
      <code>mds-table--horizontal-lines-none</code>, <code>mds-table--horizontal-lines-dashed</code> and
      <code>mds-table--horizontal-lines-dotted</code>
    </p>`,
  )}
  ${unsafeHTML(template)} ${renderCodePreview(preview, context)}`;
};
