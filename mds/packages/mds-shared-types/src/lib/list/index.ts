import { Fit, JustifyItems, Orientation, Target } from '../common';
import { IMcTextAndIcon } from '../text-and-icon';
import { Width } from '../button';

export type McListItemType = 'button' | 'checkbox' | 'select-clear';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type McListValueType = any | null;
export type ListTypes = 'none' | 'single' | 'multiple' | 'typeahead';
export type McListKeyNavigationType = 'arrow' | 'tab';
export type McListRole = 'list' | 'menu' | 'listbox';
export type MouseMoveVisibleArea = { min: number; max: number };
export interface IMcList {
  /**
   * True if the circular key navigation should be disabled,
   * meaning that when the key nav reaches the very top or bottom
   * it stops there and wll no longer continue to the other end.
   */
  disablecircularkeynav?: boolean;
  /**
   * True if the focus should not be handled internally in the list.
   * This is useful when the list is used in a typeahead.
   * In this case the focus is handled by the typeahead.
   * The list will still fire the onfocus and onblur events.
   * @attr
   * @type {boolean}
   * @default false
   */
  disablesetfocus?: boolean;

  /**
   * True if the list scrolls to the focused item on .focus() invocation.
   */
  scrolltofocused?: boolean;

  /**
   * The inner list element.
   */
  list?: HTMLElement;

  /**
   * If list is scrollable, get bounding box of dropdown
   */
  mousemovevisiblearea?: MouseMoveVisibleArea | null;
  /**
   * The fit.
   */
  fit?: Fit;

  /**
   * The key navigation type.
   */
  keynavigationtype?: McListKeyNavigationType;

  /**
   * If true, removes the border.
   */
  noborder?: boolean;

  /**
   * Aria role.
   */
  role?: McListRole;

  /**
   * The value.
   */
  value?: McListValueType | McListValueType[];

  /**
   * The width.
   */
  width?: Width;

  /**
   * The type.
   */
  type?: ListTypes;

  /**
   * Used internally to set focus on the list when in popovers, or scrollable containers.
   */
  scrollablecontainer?: HTMLElement;
  /**
   * Sets the focus on the supplied item.
   * @param focusedItem The item which should be focused.
   * @param focus True if the tabindex should be zero.
   * @returns
   */
  setFocusedItem?: (focusedItem?: IMcListItem, focus?: boolean) => void;
  handleKeyDown?: (event: KeyboardEvent) => void;
  listSearchInput?: HTMLInputElement;
  /**
   * Clears the list search input and resets all items to visible
   * @returns
   */
  clearListSearch?: () => void;
  /**
   * Clears the currently focused item to reset navigation state
   * @returns
   */
  clearFocusedItem?: () => void;
  /**
   * Custom filter function to be used to filter the list items instead of using the build-in filter function.
   * The internal filter function matches any text at any position in the item's text content.
   * It will be called with the item text and the search value and should return an array of strings.
   * @type function
   */
  customfilter?: ((text: string, value: string) => string[]) | undefined;
  /**
   * Specifies if internal or custom filter function should match and filter the results in the label text only based on the typed text.
   * Match will not apply to sublabel or value of the data item.
   * @default false
   * @type boolean
   */
  matchlabelonly?: boolean;
  /**
   * The placeholder text for the list search input when listsearch is enabled.
   * @default 'Search in the list'
   * @type string
   */
  listsearchplaceholder?: string;
}

export interface IMcListItem extends IMcTextAndIcon, HTMLElement {
  /**
   * True if selected.
   */
  selected?: boolean;
  /**
   * True if focused.
   */
  focused?: boolean;
  /**
   * True if disabled.
   */
  disabled?: boolean;
  /**
   * Whether the list item is visible.
   * @default true
   * @attr
   * @type boolean
   */
  visible?: boolean;
  /**
   * Allows to position items inside the button like label text & icon.
   * Specially useful when using width="full-width".
   */
  justifyitems?: JustifyItems;
  /**
   * True if the checkmark should be hidden when selected.
   */
  hiddencheckmark?: boolean;
  /**
   * Passing a href value will render the list item as a HTML anchor element.
   */
  href?: string;
  /**
   * Where to display the linked URL, as the name for a browsing context (a tab, window, or <iframe>).
   */
  target?: Target;
  /**
   * The value.
   */
  value?: McListValueType;
  type?: McListItemType;
  name?: string;
  _cachedLabel?: string;
  orientation?: Orientation;
  ariarole?: string;
  tabindex?: number;
}
