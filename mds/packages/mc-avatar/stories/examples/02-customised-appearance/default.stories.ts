import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { generateThemeSelector, renderCodePreview } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Avatar/Examples',
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
        mc-avatar::part(avatar) {
          background-color: #00897a;
          color: #aaeae0;
        }
        mc-avatar::part(tooltip-container) {
          background-color: #00897a;
          color: #aaeae0;
          border-color: #00897a;
        }
        mc-avatar::part(tooltip-arrow) {
          background: #00897a;
          border-color: #00897a;
        }
      </style>
      <mc-avatar info="Info" initials="JAD"> </mc-avatar>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
