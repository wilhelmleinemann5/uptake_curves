export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-button';
import { McSwitch } from '@maersk-global/mds-components-core-switch';

let mcSwitch, mcModal;

McSwitch.prototype.handleClick = () => {
  toggleModal(true);
};

const initElements = () => {
  mcSwitch = document.body.querySelector('mc-switch');
  mcModal = document.body.querySelector('mc-modal');
};

const toggleModal = (open) => {
  mcModal.open = open;
};

const modalSubmitActionClick = () => {
  toggleModal(false);
  mcSwitch.checked = !mcSwitch.checked;
};

initElements();

// HTML
<mc-switch name="airplane-mode" value="1" label="Airplane mode" checked></mc-switch>
<mc-modal dimension="small">
  <p id="question">Are you sure you want to turn off the airplane mode?</p>
  <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel" label="Cancel"></mc-button>
  <mc-button id="confirm" slot="primaryAction" appearance="primary" onclick="modalSubmitActionClick()" label="Turn off"></mc-button>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
