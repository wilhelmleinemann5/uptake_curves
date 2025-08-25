import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-checkbox-group';
import '@maersk-global/mds-components-core-switch-group';
import '@maersk-global/mds-components-core-radio-group';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Popover/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const checkboxGroupChange = (e) => {
      const selectedValues = document.querySelector('#selected-checkbox-group-values');
      if (selectedValues) selectedValues.innerHTML = e.detail.join(', ');
    };
    const radioGroupChange = (e) => {
      const selectedValues = document.querySelector('#selected-radio-group-values');
      if (selectedValues) selectedValues.innerHTML = e.detail;
    };
    const switchGroupChange = (e) => {
      const selectedValues = document.querySelector('#selected-switch-group-values');
      if (selectedValues) selectedValues.innerHTML = e.detail.join(', ');
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-checkbox-group,
        mc-radio-group,
        mc-switch-group {
          padding: 16px;
          display: block;
          width: 200px;
        }
        .wrapper {
          display: flex;
          gap: 16px;
          flex-direction: column;
        }
        .group-wrapper {
          display: flex;
          gap: 16px;
          align-items: center;
        }
      </style>
      <div class="wrapper">
        <div class="group-wrapper">
          <mc-popover position="bottom-left">
            <mc-button slot="trigger" label="Select fruit"></mc-button>
            <mc-checkbox-group legend="Please select options" hiddenlegend="true" @change="${checkboxGroupChange}">
              <mc-checkbox name="fruit" value="Apple" label="Apple"></mc-checkbox>
              <mc-checkbox name="fruit" value="Orange" label="Orange"></mc-checkbox>
              <mc-checkbox name="fruit" value="Banana" label="Banana"></mc-checkbox>
              <mc-checkbox name="fruit" value="Lemon" label="Lemon"></mc-checkbox>
            </mc-checkbox-group>
          </mc-popover>
          <div id="selected-checkbox-group-values"></div>
        </div>
        <div class="group-wrapper">
          <mc-popover position="bottom-left">
            <mc-button slot="trigger" label="Select fruit"></mc-button>
            <mc-radio-group legend="Please select options" hiddenlegend="true" @change="${radioGroupChange}">
              <mc-radio name="fruit" value="Apple" label="Apple"></mc-radio>
              <mc-radio name="fruit" value="Orange" label="Orange"></mc-radio>
              <mc-radio name="fruit" value="Banana" label="Banana"></mc-radio>
              <mc-radio name="fruit" value="Lemon" label="Lemon"></mc-radio>
            </mc-radio-group>
          </mc-popover>
          <div id="selected-radio-group-values"></div>
        </div>
        <div class="group-wrapper">
          <mc-popover position="bottom-left">
            <mc-button slot="trigger" label="Select fruit"></mc-button>
            <mc-switch-group legend="Please select options" hiddenlegend="true" @change="${switchGroupChange}">
              <mc-switch name="fruit" value="Apple" label="Apple"></mc-switch>
              <mc-switch name="fruit" value="Orange" label="Orange"></mc-switch>
              <mc-switch name="fruit" value="Banana" label="Banana"></mc-switch>
              <mc-switch name="fruit" value="Lemon" label="Lemon"></mc-switch>
            </mc-switch-group>
          </mc-popover>
          <div id="selected-switch-group-values"></div>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithMultiChoiceGroups: StoryObj = {};
