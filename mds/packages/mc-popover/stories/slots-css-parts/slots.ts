import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-popover',
    '<div>popover content</div>',
    'when you want to content to be shown in popover'
  ),
  getSlot(
    'trigger',
    'named',
    'mc-popover',
    `<mc-button slot="trigger" label="Popover"></mc-button>`,
    'when you want to pass element that will trigger popover.',
    'Examples',
    true
  ),
  getSlot(
    'heading',
    'named',
    'mc-popover',
    `<span slot="heading">Checkout date</span>`,
    'to provide heading in cases where the popover is set to be shown as a modal (using modalmode prop) for specific screen sizes',
    'Examples',
    true
  ),
  getSlot(
    'footer',
    'named',
    'mc-popover',
    `<mc-button slot="footer">Ok</mc-button>`,
    'to provide footer in cases where the popover is set to be shown as a modal (using modalmode prop) for specific screen sizes',
    'Examples',
    true
  ),
];

// sets the modal heading when the popover is set to be shown as a modal for specific screen sizes, using the "modalmode" prop.
