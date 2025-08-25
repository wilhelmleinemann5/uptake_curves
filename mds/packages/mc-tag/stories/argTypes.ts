import { eventtype, appearance, widthbutton } from '@maersk-global/mds-dev-utils';
import textAndIconArgTypes from '@maersk-global/mds-components-core-text-and-icon/stories/argTypes';

const textAndIconArgs = { ...textAndIconArgTypes };

const tagArgs = {
  appearance: appearance(
    ['neutral-default', 'neutral-weak', 'neutral-inverse', 'info', 'success', 'warning', 'error'],
    'neutral-weak',
  ),
  width: widthbutton(),
  withaction: {
    name: 'withaction',
    type: { required: false },
    description:
      '`true` if it should be removable and in that case the clear button appears on the tag. Clicking on clear button will dispatch `dismiss` event.',
    defaultValue: false,
    table: {
      category: 'State',
      type: { summary: 'false | true' },
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  event: eventtype('dismiss'),
};

export default {
  label: textAndIconArgs.label,
  hiddenlabel: textAndIconArgs.hiddenlabel,
  fit: textAndIconArgs.fit,
  icon: textAndIconArgs.icon,
  ...tagArgs,
};
