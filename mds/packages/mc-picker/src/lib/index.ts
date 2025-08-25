// lit-elements
import { html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';

// utils
import { debounce } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { McList } from '@maersk-global/mds-components-core-list';
import { McPickerItem } from '@maersk-global/mds-components-core-picker-item';
import { IMcListItem } from '@maersk-global/mds-components-core-list-item/src/lib/types';
import { IMcPicker, IMcPickerSelectedDetail } from './types';

export type { IMcPickerSelectedDetail } from './types';

/**
 * @element `mc-picker`
 * @summary Picker displays a list that rolls and always shows the item that is currently selected in the middle.
 * @since 2.0.0-beta.3
 *
 * @slot - The default slot where the picker items go.
 *
 * @csspart `container` - for changing visuals of the selection area.
 *
 * @event {CustomEvent<IMcPickerSelectedDetail>} pickerselected - Emitted upon an item scrolls to the middle.
 */
export class McPicker extends McList implements IMcPicker {
  private debouncedSetValue = debounce(this, this.setValue, 400);
  private dispatchedItem?: IMcListItem;
  private intersectionObserver?: IntersectionController;
  private itemHeight = 0;

  @state()
  private selectedItem?: IMcListItem;

  @query('.selection-window')
  private selectionWindow?: HTMLDivElement;

  @query('.mc-picker')
  private viewport?: HTMLDivElement;

  @state()
  public focused = false;

  @property({ type: Boolean })
  public preventinitialeventdispatch = false;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public constructor() {
    super();
    this.noborder = true;
    this.disablehandlemousemove = true;
    this.type = 'single';
    this.disablecircularkeynav = true;
    this.scrolltofocused = true;
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.enableSelectionOnScroll();
    this.show();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('fit')) {
      this.setItemHeight();
    }
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      focus: this.focused,
    };

    return html`<div
      class="mc-picker ${classMap(classes)}"
      @onfocus="${this.onPickerItemFocus}"
      @onblur="${this.onPickerItemBlur}"
      @mousedown="${this.enableSmoothScroll}"
      @click="${this.onPickerItemClick}"
    >
      <div part="container" class="selection-window" data-cy="selection-window">${this.selectedItem?.label}</div>
      ${super.render()}
    </div>`;
  }

  private enableSmoothScroll(): void {
    if (!this.smoothScroll) {
      this.smoothScroll = true;
    }
  }

  public onPickerItemClick(event: { target: IMcListItem | McList }): void {
    // When the item was disabled, the click will occur on the list instead,
    // and that should be prevented.
    if (event.target !== this.list) {
      const item = this.allItems?.find((item) => item.value === event.target.value);
      if (item) {
        this.setValue(item, true);
        this.scrollToView(item);
      }
    }
  }

  private onPickerItemFocus(): void {
    this.focused = true;
  }

  private onPickerItemBlur(): void {
    this.focused = false;
  }

  public override handleKeyDown(event: KeyboardEvent): void {
    this.smoothScroll = false;
    super.handleKeyDown(event);

    if (this.focusedItem) {
      this.scrollToView(this.focusedItem);
    }
  }

  public focusWith(preventEventDispatch = false): void {
    if (preventEventDispatch) {
      this.preventinitialeventdispatch = true;
    }
    this.setFocusedItem(
      this.allItems?.find((item) => item.value === this.value),
      true,
    );
  }

  public show(): void {
    this.setItemHeight();

    // unavoidable due to the scrolling latency
    setTimeout(() => {
      if (this.allItems) {
        const selectedItem = this.value
          ? this.allItems.find((item) => item.value === this.value || `${item.value}` === `${this.value}`)
          : this.allItems[0];
        if (selectedItem) {
          this.scrollToView(selectedItem);
        }
      }
    }, 0);
  }

  public hide(): void {
    this.smoothScroll = false;
    // this.preventinitialeventdispatch = true;
  }

  private enableSelectionOnScroll(): void {
    this.intersectionObserver = new IntersectionController(this, {
      callback: this.onIntersection,
      config: {
        root: this.viewport,
        rootMargin: '-40% 0% -40% 0%',
        threshold: 0.9,
      },
      skipInitial: true,
    });
    this.allItems?.forEach((element: Element) => this.intersectionObserver?.observe(element as Element));
  }

  private onIntersection = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const pickerItemInTheMiddle: McPickerItem | null = entry.target.closest('mc-picker-item');

      if (pickerItemInTheMiddle && !pickerItemInTheMiddle.disabled) {
        this.setSelectedItem(pickerItemInTheMiddle);
        this.debouncedSetValue(pickerItemInTheMiddle);
      }
    });
  };

  private setItemHeight(): void {
    if (this.selectionWindow) {
      this.itemHeight = this.selectionWindow.clientHeight;
    }
  }

  private setValue(selectedItem: IMcListItem, force = false): void {
    this.value = selectedItem.value;
    this.dispatch(selectedItem, force);
  }

  private scrollToView(selectedItem: IMcListItem): void {
    this.setSelectedItem(selectedItem);

    if (this.list) {
      this.list.scrollTop = (selectedItem as HTMLElement).offsetTop - this.itemHeight * 2;
    }
  }

  private dispatch(selectedItem: IMcListItem, force = false): void {
    if (!this.preventinitialeventdispatch && this.dispatchedItem !== selectedItem) {
      this.dispatchEvent(
        new CustomEvent<IMcPickerSelectedDetail>('pickerselected', { detail: { item: selectedItem, force } }),
      );
      this.dispatchedItem = selectedItem;
    }
    this.preventinitialeventdispatch = false;
  }

  private setSelectedItem(element: IMcListItem): void {
    // unavoidable due to the scrolling latency, the issue
    // show itself in VR tests, have a look there.
    setTimeout(() => {
      this.selectedItem = element;
    }, 0);
  }
}
customElements.get('mc-picker') || customElements.define('mc-picker', McPicker);
