import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-input';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Popover/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
    viewport: { defaultViewport: 'x-small' },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        .content {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          gap: 0.5em;
          justify-content: center;
          width: 100%;
        }
      </style>
      <mc-popover trigger="focus" modalmode="x-small-screen">
        <h3 slot="heading">Vessel capacity</h3>
        <mc-input slot="trigger" trigger="click" label="Vessel capacity"></mc-input>
        <div class="content">
          <span>This vessel has 50% capacity left.</span>
          <mc-button label="Book"></mc-button>
        </div>
        <mc-button slot="footer">Ok</mc-button> </mc-popover
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const ModalInSmallViewport: StoryObj = {};
