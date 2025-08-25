import { label, fit, icon, hiddenlabel, sublabel } from '@maersk-global/mds-dev-utils';

export default {
  label: label('text-and-icon'),
  sublabel,
  hiddenlabel: hiddenlabel(),
  fit,
  icon: icon('icon', '', '', 'string | slot'),
  trailingicon: icon('trailingicon', '', '', 'string | slot'),
};
