import { IMcListItem } from '@maersk-global/mds-components-core-list-item/types';

export interface IMcButtonGroupItem extends Omit<IMcListItem, 'type'> {
  /**
   * The selected state of the button group item.
   */
  selected: boolean;
}
