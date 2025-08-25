import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Layout & navigation/Top Bar/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-avatar {
          margin-left: 8px;
        }
      </style>
      <mc-top-bar product="Maersk Design System" productshort="MDS"
        ><a slot="link" href="https://designsystem.maersk.com" target="_blank">Home</a>
        <div slot="actions" style="display: flex; gap: 16px;">
          <a
            class="mds-neutral--weak__text-color"
            href="https://designsystem.maersk.com/develop/index.html"
            target="_blank"
            >Getting started for developers</a
          >
          <a
            class="mds-neutral--weak__text-color"
            href="https://designsystem.maersk.com/design/index.html"
            target="_blank"
            >Getting started for designers</a
          >
        </div></mc-top-bar
      >
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const WithRouterLink: StoryObj = {};
