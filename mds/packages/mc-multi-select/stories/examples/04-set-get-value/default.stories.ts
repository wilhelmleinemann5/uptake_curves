import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcMultiSelect } from '../../../src/lib/types';

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
    const initValue = ['1', '3'];
    const getSelectedOnInput = (event) => {
      const outputInputEvent = document.getElementById('selected-item-oninput');
      if (outputInputEvent) {
        outputInputEvent.innerHTML = `Selected options oninput event are: <br/ >${JSON.stringify(event.target.value)}`;
      }
    };
    const getSelectedOnOptionsSelected = (event) => {
      const outputSelectedEvent = document.getElementById('selected-item-onoptionselected');
      if (outputSelectedEvent) {
        outputSelectedEvent.innerHTML = `Selected options onoptionselected event are: <br />{${event.detail.map(
          (item) => `[value: '${item.value}', label: '${item.label}']`,
        )}}`;
      }
      const mcMultiSelect = document.querySelectorAll('mc-multi-select');
      const dynamicOptions = event.detail.map((item, index) => {
        return `<mc-option value="${item.label}-${index}">${item.label}-${index}</mc-option>`;
      });
      mcMultiSelect[1].innerHTML = dynamicOptions.join('');
    };
    const changeSelectedValues = () => {
      const mcMultiSelect = document.querySelectorAll('mc-multi-select');
      (mcMultiSelect[0] as unknown as IMcMultiSelect).value = ['2', '4', '5'];
    };
    const resetValue = () => {
      const mcMultiSelect = document.querySelectorAll('mc-multi-select');
      (mcMultiSelect[0] as unknown as IMcMultiSelect).value = '';
      (mcMultiSelect[1] as unknown as IMcMultiSelect).value = '';
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="max-width: 900px">
        <div style="display: flex; gap: 8px; align-items: flex-end;">
          <mc-multi-select
            id="mc-multi-select"
            label="Select item"
            .value="${initValue}"
            placeholder="Pick a number"
            @input=${getSelectedOnInput}
            @optionselected=${getSelectedOnOptionsSelected}
          >
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
            <mc-option value="4">Four</mc-option>
            <mc-option value="5">Five</mc-option>
          </mc-multi-select>
          <mc-multi-select name="select" label="Select subitem" placeholder="Dynamic items"></mc-multi-select>
          <mc-button @click=${changeSelectedValues}>Change value</mc-button>
          <mc-button @click=${resetValue} appearance="neutral">Reset</mc-button>
        </div>
        <p id="selected-item-oninput"></p>
        <p id="selected-item-onoptionselected"></p>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SetAndGetValue: StoryObj = {};
