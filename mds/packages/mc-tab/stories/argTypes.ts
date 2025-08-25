import { icon, affix, fit, disabled, eventtype } from '@maersk-global/mds-dev-utils';
import { widthbutton } from '@maersk-global/mds-dev-utils';

export const argTypes = {
  label: {
    name: 'label',
    type: { required: true },
    defaultValue: 'Tab text',
    description: 'Label has to be passed as a property. It is required attribute as it will be used as aria-label',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
      defaultValue: { summary: 'Tab text' },
    },
    control: {
      type: 'text',
    },
  },
  prefix: affix(
    'prefix',
    'The prefix can be passed as named slot and can be any HTML element, i.e. `<div slot="prefix"><span class="my-element">prefix</span></div>` You can apply any custom styling to the HTML element that is being passed to the slot.',
    'slot',
  ),
  suffix: affix(
    'suffix',
    'The suffix can be passed as named slot and can be any HTML element, i.e. `<div slot="suffix"><span class="my-element">suffix</span></div>` You can apply any custom styling to the HTML element that is being passed to the slot.',
    'slot',
  ),
  fit,
  icon: icon(),
  trailingicon: icon('trailingicon'),
  disabled,
  active: {
    name: 'active',
    type: { required: false },
    defaultValue: false,
    description: 'Sets tab to active state',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },

  width: widthbutton(),
  disabledchange: eventtype('disabledchange', 'Fired when disabled status of a tab changes.'),
};
