import { widthbutton } from '@maersk-global/mds-dev-utils';
import { argTypes as listArgTypes } from '@maersk-global/mds-components-core-list/stories/argTypes';

const listArgs = { ...listArgTypes };
delete listArgs.noborder;
delete listArgs.arialabel;
delete listArgs.orientation;
delete listArgs.listsearch;
delete listArgs.listsearchplaceholder;
delete listArgs.filtertype;
delete listArgs.customfilter;
delete listArgs.matchlabelonly;

export const argTypes = {
  ...listArgs,
  width: widthbutton(),
};
