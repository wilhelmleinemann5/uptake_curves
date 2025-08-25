import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { previewTrailing, previewLeading } from './code-preview';
import githubImageFile from '../github.svg';
import '../../../src/index';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Button/Examples',
  parameters: {
    // previewLeading,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export default meta;
export const CustomLeadingIcon: StoryObj = {
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        .wrapper {
          display: flex;
          gap: 8px;
        }
        mc-button span {
          display: flex;
        }
      </style>
      <div class="wrapper">
        <mc-button appearance="neutral"
          ><span slot="icon"><img src="${githubImageFile}" width="20" height="20" /></span>GitHub</mc-button
        >
        <mc-button appearance="neutral" hiddenlabel label="Github"
          ><span slot="icon"><img src="${githubImageFile}" width="20" height="20" /></span
        ></mc-button>
      </div>
      ${renderCodePreview(previewLeading, context)} `,
};

export const CustomTrailingIcon: StoryObj = {
  render: (args: Args, context: StoryContext) =>
    html` ${unsafeHTML(generateThemeSelector())}<style>
        .wrapper {
          display: flex;
          gap: 8px;
        }
        mc-button span {
          display: flex;
        }
      </style>
      <div class="wrapper">
        <mc-button appearance="neutral"
          ><span slot="trailingicon"><img src="${githubImageFile}" width="20" height="20" /></span>GitHub</mc-button
        >
        <mc-button appearance="neutral" hiddenlabel label="Github"
          ><span slot="trailingicon"><img src="${githubImageFile}" width="20" height="20" /></span
        ></mc-button>
      </div>
      ${renderCodePreview(previewTrailing, context)}`,
};
