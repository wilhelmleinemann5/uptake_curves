import buttonArgTypes from '@maersk-global/mds-components-core-button/stories/argTypes';
import { label, href } from '@maersk-global/mds-dev-utils';

const buttonArgs = { ...buttonArgTypes };

const buttonLinkArgs = {
  href: href('button', 'https://designsystem.maersk.com/support/index.html'),
  label: label('mc-link-button', 'Link'),
};

delete buttonArgs.href;
delete buttonArgs.name;
delete buttonArgs.label;
delete buttonArgs.type;

export const argTypes = {
  ...buttonLinkArgs,
  ...buttonArgs,
};
