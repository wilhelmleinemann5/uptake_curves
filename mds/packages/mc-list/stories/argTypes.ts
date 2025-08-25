import {
  eventtype,
  fit,
  orientation,
  listsearch,
  listsearchplaceholder,
  filtertype,
  customfilter,
  matchlabelonly,
} from '@maersk-global/mds-dev-utils';

export const argTypes = {
  fit,
  noborder: {
    name: 'noborder',
    type: { required: false },
    defaultValue: false,
    description: 'If exists, the border will be removed.',
    table: {
      category: 'Style',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  orientation: orientation('vertical', 'vertical'),
  arialabel: {
    name: 'aria-label',
    type: { required: true },
    defaultValue: 'Label',
    description: 'Should be used to give a proper description to the list from accessibility point of view.',
    table: {
      category: 'Accessibility',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  listsearch,
  listsearchplaceholder: listsearchplaceholder(),
  filtertype: filtertype(),
  customfilter: customfilter('Search'),
  matchlabelonly: matchlabelonly('Search'),
  listchange: eventtype('listchange'),
  listitemsloaded: eventtype('listitemsloaded'),
  focuschange: eventtype('focuschange'),
  scroll: eventtype(
    'scroll',
    'Dispatched if the list has limited height with overflow scroll and users scroll the list.',
  ),
};
