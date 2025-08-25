import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { customstyles } from './dates';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Calendar/Examples',
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
        mc-calendar::part(calendar) {
          padding: 16px;
        }
      </style>
      <mc-calendar customstyles="${customstyles}{color: green; font-weight: 700}"></mc-calendar>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};
