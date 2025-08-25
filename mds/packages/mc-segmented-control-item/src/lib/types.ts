import { IMcListItem } from '@maersk-global/mds-components-core-list-item/types';

export interface IMcSegmentedControlItem extends Omit<IMcListItem, 'type'> {
  /**
   * The selected state of the segmented control item.
   */
  selected: boolean;
}
