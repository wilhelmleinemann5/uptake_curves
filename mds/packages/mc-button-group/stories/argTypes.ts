import { orientation, widthbutton, value } from '@maersk-global/mds-dev-utils';
import { argTypes as listArgTypes } from '@maersk-global/mds-components-core-list/stories/argTypes';

const listArgs = { ...listArgTypes };
delete listArgs.noborder;
delete listArgs.arialabel;
delete listArgs.listsearch;
delete listArgs.listsearchplaceholder;
delete listArgs.filtertype;
delete listArgs.customfilter;
delete listArgs.matchlabelonly;

export const argTypes = {
  ...listArgs,
  orientation: orientation('horizontal', 'horizontal'),
  selectiontype: {
    name: 'selectiontype',
    type: { required: false },
    defaultValue: 'none',
    description: 'The selection type of the button group.',
    table: {
      category: 'Style',
      type: { summary: 'none | single | multiple' },
      defaultValue: { summary: 'none' },
    },
    options: ['none', 'single', 'multiple'],
    control: {
      type: 'select',
    },
  },
  value: value(
    'The initial value of the button group. It can be passed as a string (i.e. "2"), comma-separated string (i.e. "1,2") or as an array (i.e. ["1", "2"])',
    'string | array | array of objects',
    'new',
    {
      type: 'text',
    },
  ),
  width: widthbutton(),
};
