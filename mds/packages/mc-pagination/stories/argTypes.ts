import { fit, eventtype } from '@maersk-global/mds-dev-utils';

export default {
  totalpages: {
    name: 'totalpages',
    type: { required: true },
    defaultValue: 20,
    description: 'Number of total pages',
    table: {
      category: 'Content',
      type: { summary: 'number' },
    },
    control: {
      type: 'number',
    },
  },
  currentpage: {
    name: 'currentpage',
    type: { required: false },
    defaultValue: 1,
    description: 'Number of the selected page.',
    table: {
      category: 'Content',
      type: { summary: 'number' },
      defaultValue: { summary: '1' },
    },
    control: {
      type: 'number',
    },
  },
  visiblepages: {
    name: 'visiblepages',
    type: { required: false },
    defaultValue: 10,
    description:
      'Maximum number of visible pages to be displayed. If the `disabledtruncation` is set to `false` the dots used to truncate the pages will also be counted. When set to `0` only navigation buttons will be displayed',
    table: {
      category: 'Content',
      type: { summary: 'number' },
      defaultValue: { summary: '10' },
    },
    control: {
      type: 'number',
    },
  },
  fit,
  disabledtruncation: {
    name: 'disabledtruncation',
    type: { required: false },
    defaultValue: false,
    description:
      'If set to `true` or the attribute is just presented without any value, then three dots will not be used to truncate the pages and first and last page navigation will not be visible.',
    table: {
      category: 'Content',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  hiddenlabels: {
    name: 'hiddenlabels',
    type: { required: false },
    defaultValue: false,
    description:
      'If set to `true` or the attribute is just presented without any value, then the `previous` and `next` label will not appear, but will be used as `aria-label` only',
    table: {
      category: 'Content',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  previouslabel: {
    name: 'previouslabel',
    type: { required: false },
    defaultValue: 'Previous',
    description: 'Label for the `previous` button. The value will also we used as `aria-label` on the button',
    table: {
      category: 'Label Text',
      type: { summary: 'string' },
      defaultValue: { summary: 'Previous' },
    },
    control: {
      type: 'text',
    },
  },
  nextlabel: {
    name: 'nextlabel',
    type: { required: false },
    defaultValue: 'Next',
    description: 'Label for the `next` button. The value will also we used as `aria-label` on the button',
    table: {
      category: 'Label Text',
      type: { summary: 'string' },
      defaultValue: { summary: 'Next' },
    },
    control: {
      type: 'text',
    },
  },
  arialabel: {
    name: 'arialabel',
    type: { required: false },
    defaultValue: 'Navigate pages',
    description: 'The `aria-label` for the pagination wrapper',
    table: {
      category: 'Label Text',
      type: { summary: 'string' },
      defaultValue: { summary: 'Navigate pages' },
    },
    control: {
      type: 'text',
    },
  },
  event: eventtype(
    'pagechange',
    `\nThe \`detail\` property of the event argument in your pagechange event handler would give you the selected page.
  \n`
  ),
};
