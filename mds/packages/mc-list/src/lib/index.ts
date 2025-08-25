import { CSSResultArray, html, LitElement, TemplateResult, PropertyValues } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
// utils
import { matchText } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';

// types@
import type { McListValueType, Fit, Orientation, IMcListFilterType } from '@maersk-global/mds-shared-types';
import type {
  IMcList,
  IMcListItem,
  ListTypes,
  McListRole,
  MouseMoveVisibleArea,
  IMcListChangeDetail,
  IMcListItemsLoadedDetail,
  IMcListFocusChangeDetail,
  McListKeyNavigationType,
} from './types';
import type { Width } from '@maersk-global/mds-components-core-button/src/lib/types';
import type { IMcInput } from '@maersk-global/mds-components-core-input/src/lib/types';

// mds-components used with mc-list
import '@maersk-global/mds-components-core-option';
import '@maersk-global/mds-components-core-list-item';
import '@maersk-global/mds-components-core-input';

export type { IMcList } from './types';

const ALLOWED_TAGS = [
  'mc-picker-item',
  'mc-option',
  'mc-input',
  'mc-list-item',
  'mc-button-group-item',
  'mc-segmented-control-item',
];

/**
 * @element `mc-list`
 * @summary List provide a list of options for the user to choose from.
 *
 * @event {CustomEvent<IMcListChangeDetail>} listchange - Emitted when a list item is interacted.
 * @event {CustomEvent<IMcListItemsLoadedDetail>} listitemsloaded - Emitted when the list items are loaded.
 * @event {CustomEvent<IMcListFocusChangeDetail>} focuschange - Emitted when a list item receives focus.
 * @event {Event} scroll - Dispatched when the list is scrolled.
 *
 * @slot - The default slot where the content of the list goes, including list items or dividers.
 *
 * @csspart `list` - for changing visuals of list container
 */
export class McList extends LitElement implements IMcList {
  protected scrollToSelectedValue = false;

  protected labelSelector = '.labels';

  @state()
  protected smoothScroll = false;

  @state()
  protected listSearchValue?: string = '';

  public items?: Array<IMcListItem | IMcInput> = [];
  protected allItems?: IMcListItem[];

  @state()
  protected currentItem?: IMcListItem;

  public focusedItem?: IMcListItem | null;

  protected hoveredItem?: IMcListItem | null;

  @state()
  protected keyboardNavigationActive = false;

  @property({ type: Object })
  public mousemovevisiblearea: MouseMoveVisibleArea | null = null;

  @queryAssignedElements({ slot: '', flatten: true })
  protected slottedListItems?: Array<IMcListItem>;

  @query('.mc-list')
  public list?: HTMLElement;

  @query('.list-search')
  public listSearchInput!: HTMLInputElement;

  @property({ type: Boolean })
  public listsearch = false;

  @property({ type: String })
  public listsearchplaceholder = 'Search in the list';

  @property({ type: String })
  public filtertype: IMcListFilterType = 'contains';

  @property({ attribute: false })
  public customfilter: ((text: string, value: string) => string[]) | undefined;

  @property({ type: Boolean })
  public matchlabelonly = false;

  @property({ type: Boolean })
  public disablehandlemousemove = false;

  @property({ type: Boolean })
  public disablecircularkeynav = false;

  @property({ type: Boolean })
  public disablesetfocus = false;

  @property({ type: Boolean })
  public scrolltofocused = false;

  @property({ type: Object })
  public scrollablecontainer?: HTMLElement;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public keynavigationtype: McListKeyNavigationType = 'arrow';

  @property({ type: Boolean, reflect: true })
  public noborder = false;

  @property({ type: String, attribute: true, reflect: true })
  public orientation: Orientation = 'vertical';

  @property({ type: String, reflect: true })
  public role: McListRole = 'list';

  @property({ type: String, reflect: true })
  public type: ListTypes = 'none';

  @property({ type: Array, reflect: true })
  public value?: McListValueType | McListValueType[];

  @property({ type: String, reflect: true })
  public width: Width = 'full-width';

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render */
  protected render(): TemplateResult {
    return html`${this.renderList()}`;
  }

  private renderList(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      'no-border': this.noborder,
      'smooth-scroll': this.smoothScroll,
    };
    return html`<div
      part="list"
      class="mc-list ${classMap(classes)}"
      data-cy="mc-list"
      @click=${this.handleClick}
      @keydown=${this.handleKeyDown}
      @mouseout=${this.handleMouseOut}
      @mousemove=${this.handleMouseMove}
      @slotchange=${this.handleSlotChange}
      @scroll="${(): void => {
        this.dispatchEvent(new Event('scroll'));
      }}"
    >
      ${this.renderOptionSearch()}
      <slot></slot>
    </div>`;
  }

  protected renderOptionSearch(): TemplateResult | null {
    return this.listsearch
      ? html`<mc-input
          placeholder="${this.listsearchplaceholder}"
          class="list-search"
          label="Search"
          part="list-search"
          .fit=${this.fit}
          hiddenlabel
          .visible=${true}
          .value=${this.listSearchValue}
          @input=${(e: Event) => this.handleListSearch(e)}
        ></mc-input>`
      : null;
  }
  /* lifecycle hooks */
  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.setItems();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    this.setAriaAttributes();
    if (
      changedProperties.has('role') ||
      changedProperties.has('type') ||
      changedProperties.has('fit') ||
      changedProperties.has('orientation')
    ) {
      this.passOnListCommonPropsToListItems();
    }
    if (changedProperties.has('type')) {
      this.focusedItem = null;
      this.setAriaAttributes();
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('value') && changedProperties.get('value') !== this.value) {
      const getItemsOfSuppliedValue = this.getItemsOfSuppliedValue();
      if (this.type !== 'multiple' && this.type !== 'typeahead') {
        if (this.items && this.value) {
          requestAnimationFrame(() => {
            this.setFocusedItem(getItemsOfSuppliedValue, this.scrollToSelectedValue);
          });
        }
      }
    }

    if (changedProperties.has('listsearch')) {
      // Re-initialize items when search input is toggled
      requestAnimationFrame(() => {
        this.setItems();
      });
    }
  }

  private shouldKeyCauseKeyboardNav(key: string): boolean {
    if (this.keynavigationtype === 'tab') {
      return key === 'Tab';
    }

    if (this.orientation === 'vertical') {
      return ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key);
    }

    return ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(key);
  }

  /* event handlers */
  protected handleListChange(item: IMcListItem | null | undefined): void {
    if (!item || item.disabled) {
      return;
    }
    this.currentItem = item;
    this.setFocusedItem(item);

    if (this.type === 'multiple') {
      item.selected = !item.selected;
    }

    if (this.type === 'single' && (this.role === 'listbox' || this.role === 'list')) {
      this.markAsSelected(item);
    }

    this.value = this.getSelectedValues();
    this.dispatchEvent(new CustomEvent<IMcListChangeDetail>('listchange', { detail: { item } }));
  }

  private getItemFromEventTarget(event: MouseEvent | KeyboardEvent): IMcListItem | null | undefined {
    const target = event.target as HTMLElement;
    return (
      target.closest<IMcListItem>('mc-button-group-item') ||
      target.closest<IMcListItem>('mc-segmented-control-item') ||
      target.closest<IMcListItem>('mc-list-item') ||
      target.closest<IMcListItem>('mc-option') ||
      target.closest<IMcListItem>('mc-picker-item') ||
      this.focusedItem
    );
  }

  private handleClick(event: MouseEvent): void {
    // Check if the click is within the list search input - if so, don't process it as a list item selection
    const target = event.target as HTMLElement;
    const isSearchInputClick = target.closest('.list-search') || target.classList.contains('list-search');

    if (isSearchInputClick) {
      return;
    }

    const item = this.getItemFromEventTarget(event);
    const hasLinkSlot = item?.querySelector('a');
    if (hasLinkSlot) {
      return;
    }

    if (item && !(item as IMcListItem).href) {
      event.preventDefault();
    }

    this.handleListChange(item);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && (event.target as HTMLElement).nodeName.toLowerCase() !== 'a') {
      // Check if the Enter key is pressed within the list search input - if so, don't process it as a list item selection
      const target = event.target as HTMLElement;
      const isSearchInputEnter = target.closest('.list-search') || target.classList.contains('list-search');

      if (isSearchInputEnter) {
        return;
      }

      event.preventDefault();
      this.handleListChange(this.getItemFromEventTarget(event));
    }

    if (event.key === 'Space') {
      // Check if the Space key is pressed within the list search input - if so, don't prevent default
      const target = event.target as HTMLElement;
      const isSearchInputSpace = target.closest('.list-search') || target.classList.contains('list-search');

      if (!isSearchInputSpace) {
        // Avoid scrolling due to the 'Space' only when not in search input
        event.preventDefault();
      }
    }

    if (event.key === 'Tab' && (this.type === 'none' || !this.value) && this.items) {
      this.setFocusedItem(this.items[0]);
    }

    if (this.items && this.items.length > 0 && this.shouldKeyCauseKeyboardNav(event.key)) {
      if (this.keynavigationtype === 'arrow') {
        event.preventDefault();
      }

      // Enable keyboard navigation mode to disable CSS hover effects
      this.keyboardNavigationActive = true;
      this.passOnListCommonPropsToListItems();

      const items = this.items.filter((item: IMcListItem) => {
        return item.visible;
      });

      // If an item is hovered, it becomes the starting point for navigation,
      // overriding any previous keyboard focus.
      if (this.hoveredItem) {
        this.focusedItem = this.hoveredItem;
        this.hoveredItem = undefined;
      }

      let index = this.focusedItem ? items.indexOf(this.focusedItem) : 0;

      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowRight' ||
        (this.keynavigationtype === 'tab' && event.key === 'Tab' && !event.shiftKey)
      ) {
        // If starting from hover with arrow down, we want to go to the next item
        // If starting from hover with arrow up, we want to go to the previous item
        index++;
      } else if (
        event.key === 'ArrowUp' ||
        event.key === 'ArrowLeft' ||
        (this.keynavigationtype === 'tab' && event.key === 'Tab' && event.shiftKey)
      ) {
        // When starting from hover and pressing arrow up, go to the item above the hovered one
        index--;
      } else if (event.key === 'Home') {
        index = 0;
      } else if (event.key === 'End') {
        index = items.length - 1;
      }

      if (this.keynavigationtype === 'arrow') {
        if (index < 0) {
          if (this.disablecircularkeynav) {
            index = 0;
          } else {
            index = items.length - 1;
          }
        }

        if (index > items.length - 1) {
          if (this.disablecircularkeynav) {
            index = items.length - 1;
          } else {
            index = 0;
          }
        }
      }

      const itemToFocus =
        this.keynavigationtype === 'tab' && index < 0 && index > items.length - 1 ? undefined : items[index];
      if (this.disablesetfocus && itemToFocus && this.list) {
        this.scrollListIntoView(itemToFocus as HTMLElement, index);
      }

      // Note: hoveredItem was already cleared at the beginning of keyboard navigation

      this.setFocusedItem(itemToFocus, true);
    }
  }

  private handleMouseOut(event: MouseEvent): void {
    if (!this.disablehandlemousemove) {
      const relatedTarget = event.relatedTarget as Element;
      if (!ALLOWED_TAGS.includes(relatedTarget?.nodeName.toLocaleLowerCase()) && this.items) {
        this.hoveredItem = undefined;

        // Also clear the keyboard focus when the mouse leaves the list component.
        if (this.focusedItem) {
          this.setFocusedItem(undefined);
        }
      }
    }
  }

  private handleMouseMove(event: {
    target: IMcListItem & { getBoundingClientRect: () => { y: number; height: number } };
  }): void {
    if (!this.disablehandlemousemove) {
      const target = event.target;
      const targetMcListItem = this.closestMcListItem(target);

      if (targetMcListItem !== this.hoveredItem && this.isListItem(targetMcListItem)) {
        // Enable mouse interaction mode to re-enable CSS hover effects
        this.keyboardNavigationActive = false;
        this.passOnListCommonPropsToListItems();

        // Clear keyboard focus when transitioning to mouse interaction
        // This ensures clean transition from keyboard to mouse navigation
        if (this.focusedItem && this.focusedItem !== targetMcListItem) {
          this.setFocusedItem(undefined);
        }

        if (this.mousemovevisiblearea) {
          const { y, height } = targetMcListItem.getBoundingClientRect();
          if (y > this.mousemovevisiblearea.min - 8 && y < this.mousemovevisiblearea.max - height / 2) {
            this.hoveredItem = targetMcListItem as IMcListItem;
          }
        } else {
          this.hoveredItem = targetMcListItem as IMcListItem;
        }
      }
    }
  }

  private handleSlotChange(): void {
    if (this.slottedListItems) {
      this.setItems();
      if (this.items && this.items.length > 0) {
        this.getItemsOfSuppliedValue();
        this.passOnListCommonPropsToListItems();
      }
    }
  }

  /* utils */
  private setItems(): void {
    this.allItems = this.getAllItems();
    this.items = this.allItems.filter((el: IMcListItem) => !el.disabled);
    if (this.listSearchInput) {
      this.items = [this.listSearchInput as unknown as IMcInput, ...this.items];
    }
    this.dispatchEvent(
      new CustomEvent<IMcListItemsLoadedDetail>('listitemsloaded', { detail: { items: this.items as IMcListItem[] } }),
    );
  }

  private getSelectedValues(): McListValueType | McListValueType[] | undefined {
    const values = this.items.reduce(
      (selectedItems, item: IMcListItem) => [...(item.selected ? [item.value] : []), ...selectedItems],
      [] as McListValueType[],
    );

    if (this.type === 'single' && values && values.length > 0) {
      return values[0];
    }
    if (this.type === 'multiple') {
      return values;
    }

    return undefined;
  }

  private markAsSelected(currentItem: IMcListItem): void {
    this.items.forEach((item: IMcListItem) => {
      if (this.role === 'listbox') {
        if (item === currentItem && item.value !== undefined && item.value !== 'null') {
          item.selected = true;
        } else {
          item.selected = false;
        }
      } else {
        if (item === currentItem) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      }
    });
  }

  private passOnListCommonPropsToListItems(): void {
    if (this.allItems) {
      this.allItems.forEach((item: IMcListItem) => {
        item.fit = this.fit;
        item.orientation = this.orientation;

        // Pass keyboard navigation state to disable hover effects
        if (this.keyboardNavigationActive) {
          item.setAttribute('data-keyboard-nav', 'true');
        } else {
          item.removeAttribute('data-keyboard-nav');
        }

        if (!this.role || this.role === 'list') {
          this.role = 'list';
          item.ariarole = 'listitem';
        } else if (this.role === 'menu') {
          item.ariarole = 'menuitem';
        } else if (this.role === 'listbox') {
          item.ariarole = 'option';
          if (this.type === 'multiple' && item.type !== 'select-clear' && item.tagName?.toLowerCase() !== 'mc-input') {
            item.type = 'checkbox';
          }
        }
      });
    }
  }

  private setAriaAttributes(): void {
    if (!this.type || this.type === 'none' || this.type === 'typeahead') {
      this.removeAttribute('aria-multiselectable');
    } else if (this.type && this.type === 'single') {
      this.role = 'listbox';
      this.removeAttribute('aria-multiselectable');
    } else {
      this.role = 'listbox';
      this.setAttribute('aria-multiselectable', 'true');
    }
  }

  private getAllItems(): IMcListItem[] {
    return this.slottedListItems?.filter((el, index) => {
      if (!this.isListItem(el)) {
        return false;
      }

      if (this.type !== 'none' && el.value === undefined) {
        el.value = index;
      }

      return true;
    }) as IMcListItem[];
  }

  private isListItem(item: { tagName?: string } & Element): boolean {
    return (
      ALLOWED_TAGS.includes(item?.tagName?.toLowerCase()) ||
      ['listitem', 'menuitem', 'menuitemcheckbox', 'menuitemradio'].includes(item?.getAttribute('role') ?? '')
    );
  }

  private closestMcListItem(target: HTMLElement): Element {
    const closestTagName = ALLOWED_TAGS.find((item) => target.closest(item));
    return target.closest(closestTagName);
  }

  /**
   * Sets the focusedItem and adjusts tabindex on all items accordingly.
   */
  public setFocusedItem(focusedItem?: IMcListItem | IMcInput, focus?: boolean): void {
    this.items?.forEach((item, index) => {
      if (focusedItem && item === focusedItem) {
        this.focusedItem = focusedItem as IMcListItem;
        item.focused = true;

        if (this.keynavigationtype === 'arrow') {
          item.tabindex = 0;
          if (focus && !this.disablesetfocus) {
            (focusedItem as IMcListItem).focus({ preventScroll: !this.scrolltofocused });
          }
        }
      } else {
        item.focused = false;

        if (this.keynavigationtype === 'arrow') {
          item.tabindex = index === 0 && !focusedItem ? 0 : -1;
        }
      }
    });
    if (focus) {
      const index = this.items?.indexOf(focusedItem as IMcListItem);
      this.dispatchEvent(
        new CustomEvent<IMcListFocusChangeDetail>('focuschange', {
          detail: { item: focusedItem as IMcListItem, index: index },
        }),
      );
    }
  }

  private getItemsOfSuppliedValue(): IMcListItem | undefined {
    if (!this.allItems) {
      return undefined;
    }

    if (!this.value && this.value !== '') {
      return this.allItems[0];
    }

    if (this.type === 'single') {
      const stringifiedValue = JSON.stringify(this.value);
      const items = this.allItems?.filter((item) => {
        if (item.value !== 'null' && stringifiedValue === JSON.stringify(item.value)) {
          item.selected = true;
          return true;
        }

        item.selected = false;
        return false;
      });

      return items.length !== 0 ? items[0] : this.allItems[0];
    }

    if (this.type === 'multiple') {
      const values: Array<unknown> = this.normalizeMultipleValue();
      const selectedItems = this.allItems?.filter((item) => {
        if (values.find((value) => JSON.stringify(value) === JSON.stringify(item.value)) !== undefined) {
          item.selected = true;
          return true;
        }

        item.selected = false;
        return false;
      });
      const currentIndex = this.currentItem ? selectedItems?.indexOf(this.currentItem) : 0;
      return selectedItems && currentIndex ? selectedItems[currentIndex] : this.allItems[0];
    }

    return this.allItems[0];
  }

  private normalizeMultipleValue(): string[] {
    if (Array.isArray(this.value)) {
      // If value is already an array, return it directly
      return this.value;
    } else if (typeof this.value === 'string') {
      // If value is a string, split by comma
      return this.value.split(',');
    } else if (typeof this.value === 'number') {
      // If value is a single number, return it in an string array
      return [`${this.value}`];
    }
  }

  private scrollListIntoView(itemToFocus: HTMLElement, index: number): void {
    const listRect = this.list.getBoundingClientRect();
    const itemRect = itemToFocus.getBoundingClientRect();
    const container = this.scrollablecontainer as HTMLElement;

    if (!container) return;

    const containerScrollTop = container.scrollTop;
    const visibleHeight = container.clientHeight || 360;
    const itemHeight = itemRect.height;

    // Calculate relative positions
    const itemTop = itemRect.top - listRect.top;
    const itemBottom = itemRect.bottom - listRect.top;

    // Calculate viewport boundaries
    const viewportTop = containerScrollTop;
    const viewportBottom = containerScrollTop + visibleHeight;

    // Check if item is fully visible in current viewport
    const isOutOfView = itemTop < viewportTop || itemBottom > viewportBottom || itemBottom - itemTop > visibleHeight;

    // Reset scroll for first item or when cycling back
    if (index === 0 || (index === this.items?.length - 1 && !this.disablecircularkeynav)) {
      container.scrollTo({
        top: index === 0 ? 0 : container.scrollHeight - visibleHeight,
        behavior: 'smooth',
      });
    } else if (isOutOfView) {
      let newScrollTop;

      if (itemTop < viewportTop) {
        newScrollTop = Math.max(0, itemTop - itemHeight / 2);
      } else {
        const visiblePrevious = itemHeight;
        newScrollTop = Math.max(0, itemTop - visiblePrevious);
      }

      const maxScroll = container.scrollHeight - visibleHeight;
      container.scrollTo({
        top: Math.min(newScrollTop, maxScroll),
        behavior: 'smooth',
      });
    }
  }

  /**
   * Clears the list search input and resets all items to visible
   */
  public clearListSearch(): void {
    if (this.listSearchInput) {
      this.listSearchInput.value = '';
      this.listSearchValue = '';
      // Reset all items to visible
      const searchableItems = this.items?.filter((item: HTMLElement) => item.tagName.toLowerCase() !== 'mc-input');
      searchableItems?.forEach((item: IMcListItem) => {
        item.visible = true;
      });
    }
  }

  /**
   * Clears the currently focused item to reset navigation state
   */
  public clearFocusedItem(): void {
    this.focusedItem = null;
    this.setFocusedItem(undefined);
  }

  private handleListSearch(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.listSearchValue = input.value;
    const searchValue = input.value.toLowerCase().trim();

    const searchableItems = this.items?.filter((item: HTMLElement) => item.tagName.toLowerCase() !== 'mc-input');

    // Reset all options to visible first if search is empty
    if (searchValue === '') {
      searchableItems.forEach((item: IMcListItem) => {
        item.visible = true;
      });
      return;
    }

    searchableItems.forEach((item: HTMLElement) => {
      let textToSearch: string;

      if (this.matchlabelonly) {
        // Only search in the label attribute
        textToSearch = item.getAttribute('label') || '';
      } else {
        // Search in full text including sublabel (default behavior)
        let labelText: string | undefined;

        // First try to get innerText (includes label + sublabel)
        labelText = item.innerText;

        // If no innerText, try getting from shadowRoot
        if (!labelText || labelText.trim() === '') {
          labelText = (item.shadowRoot?.querySelector(this.labelSelector) as HTMLElement)?.innerText;
        }

        // If still no text, try the label attribute
        if (!labelText || labelText.trim() === '') {
          labelText = item.getAttribute('label') || '';
        }

        // Cache the label text on the option if we found it
        if (labelText && labelText.trim() !== '') {
          (item as unknown as IMcListItem)._cachedLabel = labelText;
        }

        textToSearch = (item as unknown as IMcListItem)._cachedLabel || labelText || '';
      }

      const match = matchText(textToSearch, searchValue, this.filtertype, this.customfilter);
      (item as unknown as IMcListItem).visible = match.length > 0;
    });
  }
}

customElements.get('mc-list') || customElements.define('mc-list', McList);
declare global {
  interface HTMLElementTagNameMap {
    'mc-list': McList;
  }
}
