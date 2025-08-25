// lit-elements
import { html, TemplateResult, PropertyValues, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// types
import type { IMcPopover } from '@maersk-global/mds-components-core-popover/src/lib/types';
import type { ListTypes, IMcList, IMcListItem, IMcListFilterType } from '@maersk-global/mds-shared-types';
export type { ListTypes } from '@maersk-global/mds-shared-types';

// mds-components
import { McInput } from '@maersk-global/mds-components-core-input';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-popover';

/**
 * Represents a selected option.
 */
export interface IMcSelectedOption {
  label: string;
  // TDOD: Fix any type, i.e. use generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export type IMcSelectOption = IMcListItem & HTMLElement;

export abstract class McSelectBase<T = IMcSelectOption> extends McInput {
  private preventInputBlurEvent = false;
  private closureDueToItemSelection = false;

  @state()
  protected placeholderOption = true;
  protected selectedOption?: T;
  protected options?: IMcSelectOption[];

  protected abstract labelSelector: string;
  protected pressedAlphanumeric = '';
  protected pressedAlphanumericTimeout?: number;

  @state()
  protected selectedOptionLabel?: string | Node;

  @queryAssignedElements({ slot: '', flatten: true })
  protected slotElements?: Array<HTMLElement>;

  protected actionkeys = ['Enter', 'Space', 'ArrowDown'];
  protected abstract listType: ListTypes;

  @query('mc-popover')
  protected mcPopover?: IMcPopover;

  @query('mc-list')
  protected mcList?: IMcList;

  @state()
  public ariaExpanded: 'true' | 'false' | 'undefined' = 'false';

  @property({ type: String })
  public optionsheight!: string;

  @property({ type: String })
  public optionswidth!: string;

  @property({ type: Boolean })
  public open = false;

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

  /* render */
  public render(): TemplateResult<1> {
    const classes = {
      open: !!this.mcPopover?.open,
      listsearch: this.listsearch,
    };
    return html`
      <div data-cy="mc-input-container" class="mc-select ${classMap(classes)}">
        ${super.render()}
        <mc-popover
          exportparts="content: popover-content"
          .customtriggerelement="${this.readonly ? null : this.inputField}"
          trigger="click"
          position="bottom-left"
          width="${this.optionswidth ? this.optionswidth : 'trigger'}"
          maxheight="${ifDefined(this.optionsheight)}"
          .open=${this.open}
          .actionkeys=${this.actionkeys}
          @show=${this.onPopoverOpen}
          @hide=${this.onPopoverClose}
          preventcloseonblur
        >
          ${this.renderListOptions()}
        </mc-popover>
      </div>
    `;
  }

  protected renderListOptions(): TemplateResult {
    return html`<mc-list
      id="listbox"
      aria-labelledby="label"
      class="content"
      noborder
      scrolltofocused
      .type="${this.listType}"
      .fit="${this.fit}"
      .value=${this.value}
      ?listsearch=${this.listsearch}
      .listsearchplaceholder=${this.listsearchplaceholder}
      .filtertype=${this.filtertype}
      .customfilter=${this.customfilter}
      ?matchlabelonly=${this.matchlabelonly}
      @listchange=${this.onOptionSelected}
    >
      ${this.renderNoOptions()} ${this.renderPlaceholderOption()}
      <slot @slotchange=${this.handleSlotChange}></slot>
    </mc-list>`;
  }

  public override renderSelectedOptionLabel(): TemplateResult<1> {
    return this.value || this.value?.toString() === 'false'
      ? html`<div
          part="selected-option"
          class="selected-option-label"
          aria-labelledby="label"
          aria-controls="listbox"
          aria-haspopup="listbox"
          aria-expanded="${this.ariaExpanded}"
          role=${ifDefined(this.listType === 'multiple' ? 'listbox' : 'list')}
          @focusin="${(): void => this.focus()}"
        >
          <div role=${ifDefined(this.listType === 'multiple' ? 'option' : undefined)}>${this.selectedOptionLabel}</div>
        </div>`
      : html``;
  }

  protected renderPlaceholderOption(): TemplateResult | null {
    return this.placeholderOption && this.placeholder !== ''
      ? html`<mc-option class="placeholder" value="null" label="${this.placeholder}"></mc-option>`
      : null;
  }

  protected renderNoOptions(): TemplateResult | null {
    return this.options?.length === 0 ? html`<div class="options-empty">No options available</div>` : null;
  }

  /* lifecycle hooks */
  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  public async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(changedProperties);
    this.inputElement.setAttribute('readonly', 'true');
  }

  public async updated(changedProperties: PropertyValues): Promise<void> {
    super.updated(changedProperties);

    if (changedProperties.has('value') && changedProperties.get('value') !== this.value) {
      await (this.mcList as LitElement).updateComplete;
      this.getSelectedOption();
      this.selectedOptionLabel = this.getDisplayLabel();
    }
  }

  /* event handlers */
  protected onKeyDown(e: KeyboardEvent): void {
    if (this.clearbutton && e.code === 'Backspace') {
      // If list search is enabled and popover is open, check if we're typing in the search input
      if (this.listsearch && this.mcPopover?.open) {
        // Check the event's composed path to see if it includes the search input
        const eventPath = e.composedPath();
        const isFromSearchInput = eventPath.some((element) => {
          const el = element as HTMLElement;
          // Check if this element is the search input or inside it
          return (
            el.classList?.contains('list-search') ||
            (el.tagName?.toLowerCase() === 'input' && el.closest?.('.list-search'))
          );
        });

        // If the event came from the search input, don't trigger clear
        if (isFromSearchInput) {
          return;
        }
      }

      // Not in search input, proceed with clear functionality
      this.onClearButtonClick(e);
      return;
    }
    if (this.mcPopover?.open && this.mcPopover.hide && e.code === 'Tab') {
      e.stopPropagation();
      this.mcPopover.hide();
      return;
    }
    const isAlphanumeric = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90);
    if (isAlphanumeric && !this.listsearch) {
      this.pressedAlphanumeric += e.key;
      this.handleAlphanumericKey();
      this.pressedAlphanumericTimeout = window.setTimeout((): void => {
        window.clearTimeout(this.pressedAlphanumericTimeout);
        this.pressedAlphanumeric = '';
      }, 500);
    }
  }

  protected onInputBlur(event?: FocusEvent) {
    super.onInputBlur();

    if (this.preventInputBlurEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public blur(): void {
    super.blur();
    this.dispatchEvent(new FocusEvent('blur'));
  }

  private onPopoverOpen(): void {
    this.preventInputBlurEvent = true;
    this.trailingicon = 'chevron-up';
    this.ariaExpanded = 'true';

    if (this.mcPopover && this.mcPopover.contentWrapper && this.mcList && this.mcList.setFocusedItem) {
      const { y, height } = this.mcPopover.contentWrapper.getBoundingClientRect();
      this.mcList.mousemovevisiblearea = { min: y, max: height + y };
      if (this.listsearch) {
        this.mcList.listSearchInput.focus();
      } else {
        const focusedOption = this.getFocusedOption();
        if (focusedOption) {
          this.mcList.setFocusedItem(focusedOption, true);
        }
      }
    }
    this.dispatchEvent(
      new CustomEvent<boolean>('opened', {
        detail: true,
      }),
    );
  }

  private onPopoverClose(): void {
    if (!this.closureDueToItemSelection) {
      this.blur();
    }
    this.closureDueToItemSelection = false;
    this.preventInputBlurEvent = false;
    this.trailingicon = 'chevron-down';
    this.ariaExpanded = 'false';

    if (this.mcList) {
      // Clear focused item to reset navigation state for next open
      if (this.mcList.clearFocusedItem) {
        this.mcList.clearFocusedItem();
      }

      if (this.listsearch && this.mcList.clearListSearch) {
        this.mcList.clearListSearch();
      }
    }

    this.dispatchEvent(
      new CustomEvent<boolean>('closed', {
        detail: true,
      }),
    );
  }

  protected onOptionSelected(el: CustomEvent): void {
    this.closureDueToItemSelection = true;
    this.setOptionSelected(el.detail.item);
  }
  protected abstract setOptionSelected(el: IMcSelectOption): Promise<void>;

  protected onClearButtonClick(event: MouseEvent | KeyboardEvent): void {
    event.stopPropagation();
    this.mcPopover?.hide();

    super.onClearButtonClick(event);
  }

  /* utils */
  protected abstract getOptions(): void;
  protected abstract getDisplayLabel(): string | Node | undefined;
  protected abstract getSelectedOption(): void;
  protected abstract getFocusedOption(): IMcSelectOption | null | undefined;
  protected abstract handleValueLabelSlotChange(): void;

  private async handleSlotChange(): Promise<void> {
    this.getOptions();
    await this.updateComplete;
    requestAnimationFrame(() => {
      this.getSelectedOption();
      this.handleValueLabelSlotChange();
    });
  }

  private handleAlphanumericKey(): void {
    if (this.options) {
      const match = this.options?.find((option: IMcSelectOption) => {
        const label = option.innerText
          ? option.innerText
          : (option.shadowRoot?.querySelector(this.labelSelector) as HTMLElement)?.innerText;
        const labelSanitized = label?.toLowerCase().trim().replace(/\n/g, '');
        return labelSanitized?.startsWith(this.pressedAlphanumeric);
      });
      if (this.mcPopover?.open && match && this.mcList?.setFocusedItem) {
        this.mcList.setFocusedItem(match, true);
      } else if (!this.mcPopover?.open && match && this.listType === 'single') {
        this.setOptionSelected(match);
      }
    }
    return;
  }
}
