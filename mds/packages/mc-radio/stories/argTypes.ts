import { name, value, label, fit, checked, disabled, hiddenlabel, eventtype } from '@maersk-global/mds-dev-utils';
export default {
  label: label('mc-radio'),
  hiddenlabel: hiddenlabel('Content'),
  fit,
  checked,
  disabled,
  name: name('fruit'),
  value: value(),
  eventClick: eventtype('click'),
  eventChange: eventtype('change'),
  eventFocus: eventtype('focus'),
  eventBlur: eventtype('blur'),
};
