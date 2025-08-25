import { label, name, value, fit, checked, disabled, hiddenlabel, eventtype } from '@maersk-global/mds-dev-utils';

export default {
  label: label('mc-switch', 'I am transporting vegetables'),
  hiddenlabel: hiddenlabel('Content'),
  name: name('agreement'),
  value: value(),
  fit,
  checked,
  disabled,
  change: eventtype('change'),
  click: eventtype('click'),
  focus: eventtype('focus'),
  blur: eventtype('blur'),
};
