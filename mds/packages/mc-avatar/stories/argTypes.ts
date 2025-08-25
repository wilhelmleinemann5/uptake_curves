import { appearance, fitextended } from '@maersk-global/mds-dev-utils';

import imageFile from './images/avatar-01.svg';

export default {
  info: {
    name: 'info',
    type: { required: true },
    defaultValue: 'MDS',
    description:
      'The detail info to be shown in a tooltip together with avatar. Can be passed as simple argument or as a named slot. Use argument style for passing short info text, use named slot when you want to pass body with HTML text. Please check **CSS parts & slots tab** in the panel and **Examples stories**.',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
    },
    control: {
      type: 'text',
    },
  },
  imagesrc: {
    name: 'imagesrc',
    type: { required: false },
    defaultValue: imageFile,
    description: 'Image source URL, if not passed the default person image will be shown.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  initials: {
    name: 'initials',
    type: { required: false },
    defaultValue: '',
    description: 'Initials will be shown if no `imagesrc` provided. Max value is 3 characters.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  hiddentooltip: {
    name: 'hiddentooltip',
    type: { required: false },
    defaultValue: false,
    table: {
      category: 'Content',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  fit: fitextended(['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large']),
  appearance: appearance(['color-1', 'color-2', 'color-3', 'color-4'], 'color-1'),
};
