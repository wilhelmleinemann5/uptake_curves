import { getSlot, ISlot, getModalActionSlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot = [
  getSlot('default', 'default', 'mc-dialog', 'body as HTML', 'when you want to pass body as HTML to the dialog'),
  getSlot('heading', 'named', 'mc-dialog', 'heading as HTML', 'when you want to pass heading as HTML to the dialog'),
  getModalActionSlot(
    'primaryAction',
    'named',
    'mc-dialog',
    `<mc-button 
    slot="primaryAction" 
    dialogaction="ok">
      OK
  </mc-button>`,
    'when you want to pass confirm action button'
  ),
  getModalActionSlot(
    'secondaryAction',
    'named',
    'mc-dialog',
    `<mc-button 
    slot="secondaryAction" 
    dialogaction="cancel">
      Cancel
  </mc-button>`,
    'when you want to pass cancel action button'
  ),
];
