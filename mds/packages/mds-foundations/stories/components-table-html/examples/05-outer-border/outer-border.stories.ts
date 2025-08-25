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

export const outer_border = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
  ${renderComponentBanner(
    'Outer border',
    html`<p>
      The table supports 4 additional outer border style classes from the default solid / rounded style:
      <code>mds-table--outer-border-none</code>, <code>mds-table--outer-border-dashed</code>,
      <code>mds-table--outer-border-dotted</code> and <code>mds-table--outer-border-corners-square</code>
    </p>`,
  )}
  ${unsafeHTML(template)} ${renderCodePreview(preview, context)}`;
};
