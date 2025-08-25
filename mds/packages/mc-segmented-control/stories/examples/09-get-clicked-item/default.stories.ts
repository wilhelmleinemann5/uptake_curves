import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Segmented Control/Group/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const getSelectedOnListChange = (event) => {
      const outputSelectedEvent = document.getElementById('selected-item-onlistchange');
      if (outputSelectedEvent) {
        outputSelectedEvent.innerHTML = `Selected segmented control item: ${event.detail.item.value}`;
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story">
        <mc-segmented-control @listchange="${getSelectedOnListChange}" type="single">
          <mc-segmented-control-item selected value="Apple"> Apple </mc-segmented-control-item>
          <mc-segmented-control-item value="Apricot"> Apricot </mc-segmented-control-item>
          <mc-segmented-control-item value="Artichoke"> Artichoke </mc-segmented-control-item>
        </mc-segmented-control>
      </div>
      <p id="selected-item-onlistchange"></p>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const GetClickedItem: StoryObj = {};
