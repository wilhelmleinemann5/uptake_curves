import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const sentFormData = (form) => {
      const data = new FormData(form);
      let formValuesData = '';
      for (const [key, value] of data.entries()) {
        formValuesData += `${key}: ${value}<br />`;
      }
      const formValues = document.getElementById('fromValues');
      formValues.innerHTML = `<br /><br /><b>Submitted values are:</b><br />${formValuesData}`;
    };
    const submitForm = (event) => {
      event.preventDefault();
      sentFormData(event.target);
    };
    const submitFormOnEnter = (event) => {
      if (event.code === 'Enter') {
        sentFormData(document.getElementById('form'));
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        form {
          width: 250px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      </style>
      <form id="form" @keydown="${submitFormOnEnter}" @submit="${submitForm}">
        <mc-input name="name" label="Name"></mc-input>
        <mc-input name="address" label="Address"></mc-input>
        <div>
          <mc-button name="submit" type="submit" label="Submit"></mc-button>
          <mc-button appearance="neutral" label="Not a submit"></mc-button>
        </div>
      </form>
      <p id="fromValues"></p>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const Form: StoryObj = {};
