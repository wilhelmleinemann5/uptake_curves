import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { McSwitch } from '@maersk-global/mds-components-core-switch';

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
    let mcSwitch, mcModal, question, confirm;
    const initElements = () => {
      mcSwitch = document.body.querySelector('mc-switch');
      mcModal = document.body.querySelector('mc-modal');
      question = document.body.querySelector('#question');
      confirm = document.body.querySelector('#confirm');
    };
    const toggleModal = (open) => {
      mcModal.open = open;
    };
    McSwitch.prototype.handleClick = () => {
      toggleModal(true);
    };
    const modalSubmitActionClick = () => {
      toggleModal(false);
      mcSwitch.checked = !mcSwitch.checked;
      const state = mcSwitch.checked ? 'off' : 'on';
      confirm.label = `Turn ${state}`;
      question.innerHTML = `Are you sure you want to turn ${state} the airplane mode?`;
    };
    setTimeout(() => {
      initElements();
    }, 1000);
    return html`${unsafeHTML(generateThemeSelector())}
      <div style="width: 200px">
        <mc-switch name="airplane-mode" value="1" label="Airplane mode" checked></mc-switch>
      </div>
      <mc-modal dimension="small">
        <p id="question">Are you sure you want to turn off the airplane mode?</p>
        <mc-button
          slot="secondaryAction"
          appearance="neutral"
          variant="outlined"
          dialogaction="cancel"
          label="Cancel"
        ></mc-button>
        <mc-button
          id="confirm"
          slot="primaryAction"
          appearance="primary"
          @click=${modalSubmitActionClick}
          label="Turn off"
        ></mc-button>
      </mc-modal>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SwitchWithModalConfirmation: StoryObj = {};
