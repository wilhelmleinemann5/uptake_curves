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
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        fieldset div {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        legend {
          margin-bottom: 4px;
        }
        fieldset mc-select {
          width: 85px;
        }
        fieldset mc-input {
          width: 250px;
        }
      </style>
      <fieldset>
        <legend>Phone number</legend>
        <div>
          <mc-select hiddenlabel label="country code">
            <mc-option value="+40">+40</mc-option>
            <mc-option value="+41">+41</mc-option>
            <mc-option value="+42">+42</mc-option>
            <mc-option value="+43">+43</mc-option>
            <mc-option value="+44">+44</mc-option>
            <mc-option value="+45">+45</mc-option>
            <mc-option value="+46">+46</mc-option>
          </mc-select>
          <mc-input hiddenlabel label="phone"></mc-input>
        </div>
      </fieldset>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SelectAndInput: StoryObj = {};
