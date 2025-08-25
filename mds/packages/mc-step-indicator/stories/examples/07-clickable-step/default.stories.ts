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
      <style>
        mc-step-indicator-item {
          cursor: pointer;
        }
      </style>
      <div style="width: 400px">
        <mc-step-indicator
          ><mc-step-indicator-item @click="${() => console.warn('step 1')}" state="completed" icon="clock">
            <span class="mds-text--small-normal">ETD</span>
          </mc-step-indicator-item>
          <mc-step-indicator-item @click="${() => console.warn('step 2')}" state="completed" icon="envelope">
            <span class="mds-text--small-normal">Release Sent</span>
          </mc-step-indicator-item>
          <mc-step-indicator-item @click="${() => console.warn('step 3')}" state="current" icon="vessel-front">
            <span class="mds-text--small-bold">Carrier Released</span>
          </mc-step-indicator-item>
          <mc-step-indicator-item @click="${() => console.warn('step 4')}" state="pending" icon="clock">
            <span class="mds-text--small-normal">ETA</span>
          </mc-step-indicator-item></mc-step-indicator
        >
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const ClickableSteps: StoryObj = {};
