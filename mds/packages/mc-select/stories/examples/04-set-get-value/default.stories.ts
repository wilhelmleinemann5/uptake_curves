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
  render: (args: Args, context: StoryContext) => {
    const getValueOnSelected = (event) => {
      const outputInputEvent = document.getElementById('selected-value');
      if (outputInputEvent) outputInputEvent.innerHTML = `Selected value is: <b>${event.target.value}</b>`;
    };
    const getOptionOnSelected = (event) => {
      const outputSelectedEvent = document.getElementById('selected-item');
      if (outputSelectedEvent)
        outputSelectedEvent.innerHTML = `Selected item label is: <b>${event.detail.label}</b> with value: <b>${event.detail.value}</b>`;
      const mcSelect = document.querySelectorAll('mc-select');
      mcSelect[1].innerHTML = `
        <mc-option value="${event.detail.label}-1">${event.detail.label}-1</mc-option>
        <mc-option value="${event.detail.label}-2">${event.detail.label}-2</mc-option>
        <mc-option value="${event.detail.label}-3">${event.detail.label}-3</mc-option>`;
    };
    const changeSelectedValue = () => {
      const mcSelect = document.querySelectorAll('mc-select');
      mcSelect[0].value = '1';
      const outputInputEvent = document.getElementById('selected-value');
      if (outputInputEvent) outputInputEvent.innerHTML = `Selected value is:  <b>1</b>`;
      const outputSelectedEvent = document.getElementById('selected-item');
      if (outputSelectedEvent)
        outputSelectedEvent.innerHTML = `Selected item label is: <b>One</b> with value: <b>1</b>`;
    };
    const resetValue = () => {
      const mcSelect = document.querySelectorAll('mc-select');
      if (mcSelect && mcSelect.length > 0) {
        mcSelect[0].value = '';
        mcSelect[1].value = '';
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="max-width: 900px">
        <div style="display: flex; gap: 8px; align-items: flex-end;">
          <mc-select
            name="select"
            label="Select item"
            placeholder="Pick a number"
            value="3"
            @input=${getValueOnSelected}
            @optionselected=${getOptionOnSelected}
          >
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
            <mc-option value="4">Four</mc-option>
            <mc-option value="5">Five</mc-option>
          </mc-select>
          <mc-select name="select" label="Select subitem" placeholder="Dynamic items"></mc-select>
          <mc-button @click=${changeSelectedValue}>Change value</mc-button>
          <mc-button @click=${resetValue} appearance="neutral">Reset</mc-button>
        </div>
        <p id="selected-value"></p>
        <p id="selected-item"></p>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SetGetValue: StoryObj = {};
