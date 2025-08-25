import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { McRadioGroup } from '@maersk-global/mds-components-core-radio-group';
import { McRadio } from '@maersk-global/mds-components-core-radio';

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
    let mcRadios, mcModal;
    let isPrivateChecked = false;
    let isPublicChecked = true;
    const initElements = () => {
      mcRadios = document.body.querySelectorAll('mc-radio');
      mcRadios[1].checked = isPublicChecked;
      mcModal = document.body.querySelector('mc-modal');
    };
    const toggleModal = (open) => {
      mcModal.open = open;
    };
    McRadioGroup.prototype.handleClick = (event) => {
      if (event.target.checked) return;
      toggleModal(true);
    };
    McRadio.prototype.changeHandler = () => {
      mcRadios[0].checked = isPrivateChecked;
      mcRadios[1].checked = isPublicChecked;
    };
    const modalSubmitActionClick = () => {
      toggleModal(false);
      isPrivateChecked = !isPrivateChecked;
      isPublicChecked = !isPublicChecked;
      mcRadios[0].checked = isPrivateChecked;
      mcRadios[1].checked = isPublicChecked;
    };
    setTimeout(() => {
      initElements();
    }, 500);
    return html`${unsafeHTML(generateThemeSelector())}
      <div style="width: 200px">
        <mc-radio-group legend="Choose profile mode">
          <mc-radio name="profile-mode" value="1" label="Private"></mc-radio>
          <mc-radio name="profile-mode" value="0" label="Public"></mc-radio>
        </mc-radio-group>
      </div>
      <mc-modal dimension="small">
        <p>Are you sure you want to change your profile mode?</p>
        <mc-button
          slot="secondaryAction"
          appearance="neutral"
          variant="outlined"
          dialogaction="cancel"
          label="Cancel"
        ></mc-button>
        <mc-button
          slot="primaryAction"
          appearance="primary"
          @click=${modalSubmitActionClick}
          label="Yes, change it"
        ></mc-button>
      </mc-modal>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const RadioWithModalConfirmation: StoryObj = {};
