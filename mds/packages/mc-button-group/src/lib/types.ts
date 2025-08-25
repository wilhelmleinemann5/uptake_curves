import { IMcList, ListTypes } from '@maersk-global/mds-components-core-list/types';

export interface IMcButtonGroup extends Omit<IMcList, 'type'> {
  /**
   * The selection type, can be set to none, single, multiple.
   */
  selectiontype?: Omit<ListTypes, 'typeahead'>;
}
