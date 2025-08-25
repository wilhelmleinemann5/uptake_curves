import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot('default', 'default', 'mc-card', 'body as HTML', 'when you want to pass body as HTML'),
  getSlot('image', 'named', 'mc-card', '<svg>...</svg>', 'when you want to pass image as HTML'),
  getSlot('footer', 'named', 'mc-card', 'footer text as HTML', 'when you want to render footer content as HTML'),
  getSlot(
    'actions',
    'named',
    'mc-card',
    'action buttons',
    'when you want to render action buttons or links at the bottom of the card',
  ),
];
