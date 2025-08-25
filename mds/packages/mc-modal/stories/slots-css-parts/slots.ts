import { getSlot, ISlot, getModalActionSlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot('default', 'default', 'mc-modal', 'body as HTML', 'when you want to pass body as HTML to the modal'),
  getSlot('heading', 'named', 'mc-modal', 'heading as HTML', 'when you want to pass heading as HTML to the modal'),
  getModalActionSlot(
    'footer',
    'named',
    'mc-modal',
    `<div slot="footer">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>`,
    'when you want to pass disclaimer or other content in the footer',
  ),
  getModalActionSlot(
    'primaryAction',
    'named',
    'mc-modal',
    `<mc-button 
    slot="primaryAction" 
    dialogaction="ok">
      OK
  </mc-button>`,
    'when you want to pass confirm action button',
  ),
  getModalActionSlot(
    'secondaryAction',
    'named',
    'mc-modal',
    `<mc-button 
    slot="secondaryAction" 
    dialogaction="cancel">
      Cancel
  </mc-button>`,
    'when you want to pass cancel action button',
  ),
];
