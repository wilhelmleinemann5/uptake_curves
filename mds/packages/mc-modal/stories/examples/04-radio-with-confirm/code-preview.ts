export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-button';
import { McRadioGroup } from '@maersk-global/mds-components-core-radio-group';
import { McRadio } from '@maersk-global/mds-components-core-radio';

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

initElements();
 
// HTML
<mc-radio-group legend="Choose profile mode">
  <mc-radio name="profile-mode" value="1" label="Private"></mc-radio>
  <mc-radio name="profile-mode" value="0" label="Public"></mc-radio>
</mc-radio-group>
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
    onclick="modalSubmitActionClick()"
    label="Yes, change it"
  ></mc-button>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
