import type { IMcInput } from '@maersk-global/mds-components-core-input/types';
export type { IMcInput } from '@maersk-global/mds-components-core-input/types';
import type { IMcListFilterType } from '@maersk-global/mds-shared-types';

import { IMcSelectedOption } from './base';

export type IMcSelectOptionSelectedDetail = IMcSelectedOption;

export interface IMcSelect extends IMcInput {
  optionswidth?: string;
  /**
   * Sets the max height od the popup list with options.
   * Default value is trigger
   */
  optionsheight?: string;
  /**
   * Sets the popover open on initial render.
   */
  open?: boolean;
  /**
   * Enables filtering of the list items, with build-in search input in the drop-down.
   * If set to true, the list will be filtered by the input value.
   * @default false
   */
  listsearch?: boolean;
  /**
   * When listsearch is true, this property sets the filter type.
   * - 'contains' - the list will be filtered by the input value, and the list items that contain the input value will be shown.
   * - 'startsWith' - the list will be filtered by the input value, and the list items that start with the input value will be shown.
   * @default 'contains'
   */
  filtertype?: IMcListFilterType;
  /**
   * Custom filter function for list search. When provided, this function will be used instead of the built-in filter types.
   * The function receives the text to search in and the search value, and should return an array of matching substrings.
   * @example
   * // Fuzzy filter - matches characters in order
   * (text, searchValue) => {
   *   const regex = new RegExp(searchValue.split('').join('.*'), 'i');
   *   return regex.test(text) ? [text] : [];
   * }
   */
  customfilter?: ((text: string, value: string) => string[]) | undefined;
  /**
   * When true, only searches in the label attribute of list items. When false (default), searches in the full text including sublabels.
   * @default false
   */
  matchlabelonly?: boolean;
  /**
   * Input in the mc-select.
   */
  input?: (event?: InputEvent) => void;
  /**
   * Custom event emitted on option changed (sends the whole option item as detail).
   */
  optionselected?: () => void;
}
