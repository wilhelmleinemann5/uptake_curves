import type { IMcInput } from '@maersk-global/mds-components-core-input/types';
export type { IMcInput } from '@maersk-global/mds-components-core-input/types';
import type { IMcListItem } from '@maersk-global/mds-components-core-list-item/types';
import type { IMcListFilterType } from '@maersk-global/mds-shared-types';
export type { IMcListItem } from '@maersk-global/mds-components-core-list-item/types';

export type IMcSelectOption = IMcListItem & HTMLElement;
export interface IMcTypeaheadData extends Partial<HTMLElement> {
  label: string;
  value: string | number;
  icon?: string;
  sublabel?: string;
  disabled?: boolean;
  group?: string;
  visible?: boolean;
  selected?: boolean;
  mcOption?: IMcSelectOption;
  maerskRkstCode?: string;
}

export type IMcTypeaheadOptionSelectedDetail = IMcTypeaheadData | IMcTypeaheadData[] | null;

export interface IMcTypeahead extends IMcInput {
  /**
   * Array of objects with label and value properties, to be used as options for the typeahead.
   * @type IMcTypeaheadData[]
   * @default []
   * @property
   * @example
   * ```html
   * <mc-typeahead .data='[{"label": "Option 1", "value": "Option 1"}, {"label": "Option 2", "value": "Option 2"}]'></mc-typeahead>
   * ```
   * ```javascript
   * const typeahead = document.querySelector('mc-typeahead');
   * typeahead.data = [{"label": "Option 1", "value": "Option 1"}, {"label": "Option 2", "value": "Option 2"}];
   * ```
   */
  data?: IMcTypeaheadData[] | null;
  /**
   * Sets the max number of options to be displayed.
   * @default 10
   * @type number
   */
  maxoptions?: number;
  /**
   * For displaying no suggestions label where no match was found.
   * @default 'No suggestions found'
   * @type string
   */
  nosuggestions?: string;
  /**
   * Show initial list with items on user input focused. It could be a list pf "previous searches" or "most popular items".
   * @default false
   * @type boolean
   */
  showlistonfocus?: boolean;
  /**
   * Show label for the initial list with items on user input focused. If empty, the label will not be shown.
   * @default ''
   * @type string
   */
  listlabel?: string;
  /**
   * Sets the max width od the popup list with options.
   * @default trigger
   * @type string
   */
  optionswidth?: string;
  /**
   * Sets the max height of the popup list with options.
   * @default auto
   * @type string
   */
  optionsheight?: string;
  /**
   * Sets the popover open on initial render.
   * @default false
   * @type boolean
   */
  open?: boolean;
  /**
   * If set to true, the typeahead will dispatch `scroll` event when the user scrolls to the bottom of the list.
   * @default false
   * @type boolean
   */
  infinitescroll?: boolean;
  /**
   * When using internal, build-in filter function for filtering static data set, you can use:
   * - 'contains' - the list will be filtered by the input value, and the list items that contain the input value will be shown.
   * - 'startsWith' - the list will be filtered by the input value, and the list items that start with the input value will be shown.
   * @default 'contains'
   */
  filtertype?: IMcListFilterType;
  /**
   * If set to true, the typeahead will not use the build-in internal search filter function to match results.
   * It will relay on the app to provide the filtered data from i.e. Rest API.
   * @default false
   * @type boolean
   */
  dsisablefilter?: boolean;
  /**
   * Custom filter function to be used to filter the options instead of using the build-in filter function.
   * The internal filter function matches any text at any position in label, sublabel and value.
   * It will be called with the input value and the option value and should return an array of strings.
   * @type function
   */
  customfilter?: ((text: string, value: string) => string[]) | undefined;
  /**
   * If set to true, the typeahead will match the label only (not the sublabel or value).
   * @default false
   * @type boolean
   */
  matchlabelonly?: boolean;
  /**
   * Custom event emitted on user starts typing in the input (sends the whole option item as detail).
   * @type CustomEvent
   * @property {string} detail - the text value typed in the input
   * @example
   * ```html
   * <mc-typeahead onsearch=${(e) => console.log(e.detail)}></mc-typeahead>
   * ```
   * ```javascript
   * const typeahead = document.querySelector('mc-typeahead');
   * typeahead.addEventListener('search', (e) => console.log(e.detail));
   *
   */
  search?: (e: CustomEvent) => void;
  /**
   * Custom event emitted on option selected (sends the whole option item as detail).
   * In multiselect mode, sends an array of selected options.
   * @event optionselected
   * @type CustomEvent
   * @property {IMcTypeaheadData | IMcTypeaheadData[]} detail - the selected option(s) from the drop-down by the user
   * @example
   * ```html
   * <mc-typeahead onoptionselected=${(e) => console.log(e.detail)}></mc-typeahead>
   * ```
   * ```javascript
   * const typeahead = document.querySelector('mc-typeahead');
   * typeahead.addEventListener('optionselected', (e) => console.log(e.detail));
   * ```
   */
  optionselected?: (e: CustomEvent<string>) => void;
  /**
   * Custom event emitted on when the user scrolls to the bottom of the list
   * @event listscroll
   * @type CustomEvent
   * @property {CustomEvent} detail - the scroll event
   * @example
   * ```html
   * <mc-typeahead onlistscroll=${(e) => console.log(e.detail)}></mc-typeahead>
   * ```
   * ```javascript
   * const typeahead = document.querySelector('mc-typeahead');
   * typeahead.addEventListener('listscroll', (e) => console.log(e.detail));
   * ```
   */
  listscroll?: (e: CustomEvent) => void;
}
