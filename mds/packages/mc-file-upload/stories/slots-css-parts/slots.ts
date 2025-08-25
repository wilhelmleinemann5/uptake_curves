import {
  hintSlot,
  errorMessageSlot,
  fileStatusHint,
  fileStatusErrorMessage,
  ISlot,
  iconSlot,
  trailingIconSlot,
  getSlot,
} from '@maersk-global/mds-dev-utils';

export const slots: ISlot[] = [
  hintSlot('mc-file-upload'),
  errorMessageSlot('mc-file-upload'),
  fileStatusHint('mc-file-upload'),
  fileStatusErrorMessage('mc-file-upload'),
  iconSlot('mc-file-upload'),
  trailingIconSlot('mc-file-upload'),
  getSlot(
    'intermediate',
    'named',
    'mc-file-upload',
    'Custom intermediate content',
    'for content that gives a summary or status e.g. loading or a notification etc.',
  ),
  getSlot(
    'file-url-${index}',
    'named',
    'mc-file-upload',
    'Custom file URL slot',
    'for providing a hyperlink to the uploaded file, used for creating a preview',
  ),
];
