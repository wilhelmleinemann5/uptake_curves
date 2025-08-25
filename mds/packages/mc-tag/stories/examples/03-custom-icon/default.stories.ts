import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import githubImageFile from '../github.svg';

const meta: Meta = {
  title: 'Components/Tag/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}<mc-tag withaction>
        <span slot="icon"><img src="${githubImageFile}" width="20" height="20" /></span>
        GitHub </mc-tag
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomLeadingIcon: StoryObj = {};
