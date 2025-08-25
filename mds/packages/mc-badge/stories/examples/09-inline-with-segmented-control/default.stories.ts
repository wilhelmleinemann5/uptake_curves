import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Components/Badge/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-segmented-control>
        <mc-segmented-control-item value="Apple" selected>
          Apple <mc-badge slot="badge" position="right" display="inline" label="4"></mc-badge
        ></mc-segmented-control-item>
        <mc-segmented-control-item value="Apricot"> Apricot </mc-segmented-control-item>
        <mc-segmented-control-item value="Artichoke"> Artichoke </mc-segmented-control-item>
      </mc-segmented-control>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const InlineWithSegmentedControl: StoryObj = {};
