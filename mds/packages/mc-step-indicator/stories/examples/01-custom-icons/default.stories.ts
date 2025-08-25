import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Step Indicator/Group/Examples',
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
      <div style="height:200px; width: 400px">
        <mc-step-indicator>
          <mc-step-indicator-item state="completed" icon="clock" label="ETD"> </mc-step-indicator-item>
          <mc-step-indicator-item state="completed" icon="envelope" label="Release Sent"> </mc-step-indicator-item>
          <mc-step-indicator-item state="current" icon="vessel-front" label="Carrier Released">
          </mc-step-indicator-item>
          <mc-step-indicator-item label="ETA" state="pending" icon="clock"> </mc-step-indicator-item>
        </mc-step-indicator>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomIcons: StoryObj = {};
