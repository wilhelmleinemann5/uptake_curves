import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { getIconList } from '@maersk-global/mds-dev-utils';

const meta: Meta = {
  title: 'Components/Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const options = getIconList(true);
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="max-width: 600px">
        <mc-multi-select name="select" label="Select item" hiddenlabel placeholder="Pick an icon">
          ${options.map((icon) => html`<mc-option value="${icon}" label="${icon}"></mc-option>`)}
        </mc-multi-select>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithManyOptions: StoryObj = {};
