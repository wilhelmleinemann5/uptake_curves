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
      <div style="width: 400px">
        <mc-step-indicator orientation="horizontal"
          ><mc-step-indicator-item state="completed" icon="clock">
            <span>
              <span class="mds-text--small-normal">ETD</span>
              <span class="mds-text--x-small-normal">30-08-2022<br />Rotterdam</span>
            </span>
          </mc-step-indicator-item>
          <mc-step-indicator-item state="completed" icon="envelope">
            <span>
              <span class="mds-text--small-normal">Release Sent</span>
              <span class="mds-text--x-small-normal">02-03-2022<br />San Diego</span>
            </span>
          </mc-step-indicator-item>
          <mc-step-indicator-item state="current" icon="vessel-front">
            <span>
              <span class="mds-text--small-bold">Carrier Released</span>
              <span class="mds-text--x-small-normal">10-03-2022<br />San Diego</span>
            </span>
          </mc-step-indicator-item>
          <mc-step-indicator-item state="pending" icon="clock">
            <span>
              <span class="mds-text--small-normal">ETA</span>
              <span class="mds-text--x-small-normal">28-07-2022<br />San Diego</span>
            </span>
          </mc-step-indicator-item></mc-step-indicator
        >
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomLabelsHorizontal: StoryObj = {};
