import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcModal } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Modal/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const toggleModal = () => {
      const mcModal: IMcModal = document.body.querySelector('mc-modal') as IMcModal;
      mcModal.open = true;
    };
    return html`${unsafeHTML(generateThemeSelector())} <style></style>
      <mc-button @click="${toggleModal}">Manage user permissions</mc-button>
      <mc-modal height="300px" width="50%" heading="Manage user permissions">
        <p>Please select the desired permission level for user <strong>RH001234</strong></p>
        <mc-select autofocus label="User role">
          <mc-option value="1">User with read access</mc-option>
          <mc-option value="2">User with write access</mc-option>
          <mc-option value="3">User with edit access</mc-option>
          <mc-option value="4">User with delete access</mc-option>
          <mc-option value="5">Editor</mc-option>
          <mc-option value="6">Privileged editor</mc-option>
          <mc-option value="7">Administrator</mc-option>
          <mc-option value="8">Manager</mc-option>
          <mc-option value="9">Privileged manager</mc-option>
          <mc-option value="10">Tester</mc-option>
          <mc-option value="11">Privileged tester</mc-option>
          <mc-option value="10">Supervisor</mc-option>
          <mc-option value="11">Privileged supervisor</mc-option>
        </mc-select>
        <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel"
          >Cancel</mc-button
        >
        <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">Save</mc-button>
      </mc-modal>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const FormElements: StoryObj = {};
