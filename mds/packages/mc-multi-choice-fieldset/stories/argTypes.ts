import {
  autolayoutdisabled,
  eventtype,
  fit,
  hiddenlegend,
  invalid,
  disabled,
  legend,
  name,
  orientation,
  value,
} from '@maersk-global/mds-dev-utils';
export const argTypes = {
  legend,
  hiddenlegend,
  orientation: orientation(),
  fit,
  autolayoutdisabled,
  disabled,
  invalid,
  name: name('containers', 'Name is required for the group component', true),
  event: eventtype('change'),
  value: value(
    'The initial value of the component. It can be passed as a string (i.e. "2"), comma-separated string (i.e. "1,2") or as an array (i.e. ["1", "2"])',
    'string | array | array of objects',
    '',
    {
      type: 'text',
    },
  ),
};
