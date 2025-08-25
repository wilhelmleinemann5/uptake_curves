import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

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
  render: (args: Args, context: StoryContext) => {
    function dismissTag() {
      const tag = document.querySelector('mc-tag');
      tag.remove();
    }
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-tag label="remove" @dismiss="${dismissTag}" withaction></mc-tag> ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const HandlingAction: StoryObj = {};
