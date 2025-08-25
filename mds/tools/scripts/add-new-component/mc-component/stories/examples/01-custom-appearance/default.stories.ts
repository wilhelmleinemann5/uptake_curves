import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderExperimentalBanner } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Experiments/%%STORY_NAME%%/Examples',
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
        mc-component::part(hypothetical-csspart-name) {
          font-weight: bold;
          padding-left: 16px;
        }
      </style>
      ${renderExperimentalBanner()}
      <mc-component></mc-component>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const TitleAsSlot: StoryObj = {};
