import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { apiService } from '../api-service';
import { IMcListItem, IMcTypeahead } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Typeahead/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const renderData = () => {
      return apiService.options
        ? [...apiService.options].map((item: IMcListItem) => {
            const option: IMcListItem = document.createElement('mc-option');
            option.value = item.value;
            option.sublabel = item.sublabel;
            (option as unknown as Element).innerHTML = `<i>${item.label}</i>`;
            return option;
          })
        : null;
    };
    const setData = async (event) => {
      const mcTypeahead: IMcTypeahead = document.querySelector('mc-typeahead') as unknown as IMcTypeahead;
      (mcTypeahead as unknown as Element).innerHTML = '';
      mcTypeahead.loading = true;
      apiService.options = [];
      apiService.startRow = 0;
      await apiService.search(event.target.value);
      const results = renderData();
      if (results) {
        results.map((item) => (mcTypeahead as unknown as Element).appendChild(item as Node));
        mcTypeahead.loading = false;
      }
    };
    const setMoreData = async (event) => {
      const mcTypeahead = document.querySelector('mc-typeahead');
      await apiService.loadMore(event.target.value);
      const results = renderData();
      if (results) {
        results.map((item) => (mcTypeahead as unknown as Element).appendChild(item as Node));
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-typeahead
        name="typeahead"
        label="City"
        placeholder="Type min 2 characters"
        clearbutton
        disablefilter
        minchars="2"
        infinitescroll
        optionsheight="300px"
        @search="${(event) => {
          setData(event);
        }}"
        @listscroll="${(event) => {
          setMoreData(event);
        }}"
      ></mc-typeahead
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DynamicDataAsSlotAndInfiniteScroll: StoryObj = {};
