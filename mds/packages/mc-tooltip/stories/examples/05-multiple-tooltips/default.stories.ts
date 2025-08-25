import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

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
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        .tooltip-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 8px;
        }
        .tooltip-container-content {
          background-color: #328529;
          color: white;
          padding: 4px;
        }
      </style>
      <div id="tooltip__container" class="story">
        ${[1, 2, 3, 4, 5].map(
          (i) =>
            html`<mc-tooltip id="${i}">
              <mc-button slot="trigger" label="Tooltip with content ${i}"></mc-button>
              <span>Lots of content ${i}</span>
            </mc-tooltip>`,
        )}
      </div>
      <div class="tooltip-container">
        <mc-tooltip appearance="neutral-default" fit="small" position="top-center">
          <div slot="trigger" class="tooltip-container-content">Full width 33%</div>
          tooltip
        </mc-tooltip>
        <mc-tooltip appearance="neutral-default" fit="small" position="top-center">
          <div slot="trigger" class="tooltip-container-content">Full width 33%</div>
          tooltip
        </mc-tooltip>
        <mc-tooltip appearance="neutral-default" fit="small" position="top-center">
          <div slot="trigger" class="tooltip-container-content">Full width 33%</div>
          tooltip
        </mc-tooltip>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const MultipleTooltips: StoryObj = {};
