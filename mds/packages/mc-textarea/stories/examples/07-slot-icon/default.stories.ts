import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Textarea/Examples',
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
      <mc-textarea>
        <div slot="label">
          Label as HTML, i.e.
          <mc-tooltip>
            <mc-icon slot="trigger" icon="info-circle"></mc-icon>
            <span>The HTML content of the tooltip</span>
          </mc-tooltip>
        </div> </mc-textarea
      ><mc-textarea disabled>
        <div slot="label">
          Label as HTML, i.e.
          <mc-tooltip>
            <mc-icon slot="trigger" icon="info-circle"></mc-icon>
            <span>The HTML content of the tooltip</span>
          </mc-tooltip>
        </div> </mc-textarea
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const LabelWithTooltip: StoryObj = {};
