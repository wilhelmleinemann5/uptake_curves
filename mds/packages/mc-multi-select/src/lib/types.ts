import type { IMcSelect } from '@maersk-global/mds-components-core-select/types';
export type { IMcSelect } from '@maersk-global/mds-components-core-select/types';
import type { IMcSelectedOption } from '@maersk-global/mds-components-core-select/src/base';
import type { IMcListFilterType } from '@maersk-global/mds-shared-types';

export type IMcMultiSelectOptionsSelectedDetail = IMcSelectedOption[];

export interface IMcMultiSelect extends IMcSelect {
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
   * Sets the label for select all button.
   */
  selectalllabel?: string;
  /**
   * Sets the label for clear all button.
   */
  clearalllabel?: string;

  /**
   * Sets the summary label for selected options.
   */
  summarylabel?: string;
  /**
   * Hides select all / clear all label in the dropdown.
   */
  hiddenselectclearlabel: boolean;
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
   * Input in the mc-multi-select.
   */
  input?: (event?: InputEvent) => void;
  /**
   * Custom event emitted on option changed (sends the whole option item as detail).
   */
  optionselected?: () => void;
}
