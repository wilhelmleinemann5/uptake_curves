import { IMcList } from '@maersk-global/mds-components-core-list/types';
import { IMcListItem } from '@maersk-global/mds-components-core-list-item/types';

export interface IMcPickerSelectedDetail {
  /**
   * The selected item.
   */
  readonly item: IMcListItem;

  /**
   * If it is true, the usage context should recognize the item as a new selection
   * even though it is similar to the one that was previously selected.
   */
  readonly force: boolean;
}

export type McPickerItemType = number | string;
export interface IMcPicker extends IMcList {
  /**
   * Gets whether the picker is focused.
   */
  focused?: boolean;

  /**
   * True if the pickerselected event shouldn't be
   * dispatched on initial load when used in a popover.
   */
  preventinitialeventdispatch?: boolean;

  /**
   * Emitted when an item is selected
   * @returns {number}
   */
  pickerselected?: () => number;

  /**
   * Show must be used, when the value was entered but the picker wasn't visible,
   * scroll the selected values to the center.
   */
  show?(): void;
}
