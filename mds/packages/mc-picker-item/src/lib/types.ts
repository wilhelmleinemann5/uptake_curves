import type { IMcListItem } from '@maersk-global/mds-components-core-list-item/types';

export type PickerItemWidth = 'fixed' | '';

export interface IMcPickerItem extends IMcListItem {
  /**
   * The width.
   */
  width?: PickerItemWidth;
}
