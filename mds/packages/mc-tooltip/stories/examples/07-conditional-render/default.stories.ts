import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
const hasTooltip = false;

const meta: Meta = {
  title: 'Components/Tooltip/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <div id="tooltip__container" class="story">
        <mc-tooltip>
          <span slot="trigger"> Tooltip content </span>
          ${hasTooltip ? html`<span>Tooltip body text</span>` : html``}
        </mc-tooltip>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const ConditionalRender: StoryObj = {};
