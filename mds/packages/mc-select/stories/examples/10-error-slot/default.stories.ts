import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Select/Examples',
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
      <mc-select label="Name" invalid>
        <span slot="errormessage"
          >Error message as HTML with custom
          <a class="mds-error__text-color" href="https://designsystem.maersk.com/components/button/index.html"
            >link</a
          ></span
        >
        <mc-option value="1">One</mc-option>
        <mc-option value="2">Two</mc-option>
        <mc-option value="3">Three</mc-option>
        <mc-option value="4">Four</mc-option>
        <mc-option value="5">Five</mc-option> </mc-select
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const ErrorSlot: StoryObj = {};
