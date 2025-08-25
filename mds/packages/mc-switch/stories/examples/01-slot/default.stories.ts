import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Switch/Examples',
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
      <mc-switch>
        <span slot="label"
          >Label as HTML with custom
          <a class="mds-neutral__text-color" href="https://designsystem.maersk.com/components/button/index.html"
            >link</a
          ></span
        > </mc-switch
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const LabelAsSlot: StoryObj = {};
