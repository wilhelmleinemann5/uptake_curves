import { getSlot, ISlot } from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  getSlot(
    'default',
    'default',
    'mc-side-bar',
    '<nav role="navigation" aria-label="side navigation"></nav>',
    'for passing the content to be rendered in the side bar',
  ),
];
