// lit-elements
import { html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { property, query, state, queryAssignedElements } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { classMap } from 'lit/directives/class-map.js';
// utils
import { debounce, CallBackType, Responsive } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcTypeahead, IMcSelectOption, IMcTypeaheadData, IMcTypeaheadOptionSelectedDetail } from './types';
import { IMcList } from '@maersk-global/mds-components-core-list/src/lib/types';
import { IMcPopover } from '@maersk-global/mds-components-core-popover/src/lib/types';
// mds-components
import { McInput } from '@maersk-global/mds-components-core-input';
import '@maersk-global/mds-components-core-option';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-popover';

export type { IMcTypeahead } from './types';

/**
 * @element` mc-typeahead`
 *
 * @event {InputEvent} input - Fired when the character is entered.
 * @event {FocusEvent} focus - Fired when mc-input is focused.
 * @event {FocusEvent} blur - Fired when mc-input is going out of focus.
 * @event {MouseEvent} click - Fired on mc-input click.
 * @event {KeyboardEvent} keydown - Fired when a key on keydown is pressed.
 * @event {CustomEvent} clearbuttonclick - Fires when the clear button is pressed.
 * @event {CustomEvent<string>} search - Fires when user starts typing (after specified number of minchar and debounce).
 * @event {CustomEvent<IMcTypeaheadOptionSelectedDetail>} optionselected - Fires when an option is selected.
 * @event {CustomEvent} listscroll - Fires when user scrolls to the bottom of the list.
 *
 * @slot `label` - The label HTML to use for the mc-input.
 * @slot `hint` - The hint HTML to use for the mc-input.
 * @slot `errormessage` - The errormessage HTML to use for the mc-input.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `input` - for changing visuals of input field
 * @csspart `icon` - for changing visuals of icons
 */
export class McTypeahead extends Responsive(McInput) implements IMcTypeahead {
  protected dispatchSearchEvent?: CallBackType;
  protected setItemFocus?: CallBackType;
  protected lastScrollTop: number | null = null;
  protected lastFocusedItemIndex = 0;

  protected selectedOptions?: IMcSelectOption | IMcSelectOption[] | null = null;
  protected labelSelector = '.label';
  protected sublabelSelector = '.sublabel';

  protected actionkeys = [];

  @state()
  public inferredData: IMcTypeaheadData[] | null = null;

  @state()
  protected fullScreen = false;

  @state()
  protected hasInitValue = false;

  @state()
  protected isActive = false;

  @state()
  protected internalLoadingState?: boolean | null = null;

  @state()
  protected currentGroup: string | null = null;

  @state()
  protected visibleOptions: IMcTypeaheadData[] | null = null;

  @query('mc-list')
  protected mcList?: IMcList;

  @query('.mds-modal_body')
  protected modalBody?: HTMLDivElement;

  @query('mc-popover')
  protected mcPopover?: IMcPopover;

  protected mcOptions?: IMcSelectOption[] | NodeList;

  @queryAssignedElements({ slot: '', flatten: true })
  protected slotElements?: Array<HTMLElement>;

  @property({ type: Array })
  public data: IMcTypeaheadData[] | null = null;

  @property({ type: Number })
  public maxoptions = 10;

  @property({ type: Number })
  public minchars = 1;

  @property({ type: Number })
  public debounce = 500;

  @property({ type: Boolean })
  public highlight = false;

  @property({ type: String })
  public nosuggestions = 'No suggestions found';

  @property({ type: String })
  public optionsheight!: string;

  @property({ type: String })
  public optionswidth!: string;

  @property({ type: String })
  public autocomplete = 'off';

  @property({ type: Boolean })
  public open = false;

  @property({ type: Boolean })
  public disablefilter = false;

  @property({ attribute: false })
  public customfilter: ((text: string, value: string) => string[]) | undefined;

  @property({ type: Boolean })
  public matchlabelonly = false;

  @property({ type: Boolean })
  public showlistonfocus = false;

  @property({ type: String })
  public listlabel = '';

  @property({ type: Boolean })
  public infinitescroll = false;

  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  public constructor() {
    super();
    this.keepclearbuttonvisible = true;
  }

  public render(): TemplateResult {
    const classes = {
      visible:
        ((this.isActive === true &&
          this.internalLoadingState === false &&
          this.loading === false &&
          this.visibleOptions &&
          this.visibleOptions.length >= 0 &&
          this.inferredData &&
          (this.inferredData.length > 0 || (this.inputElement && this.inputElement?.value.length >= this.minchars))) ||
          this.open) === true,
      hidden: this.isActive === false,
    };

    const typeaheadClasses = {
      'full-screen': this.fullScreen,
      [`${this.fit}`]: true,
    };
    return html`
      <div
        data-cy="mc-input-container"
        class="mc-typeahead ${classMap(typeaheadClasses)}"
        @touchstart=${this.preventScrollingWhenDraggedInMobile}
      >
        ${this.fullScreenHeading()}
        <div class="${this.viewport === 'x-small' ? 'mds-modal_body' : ''}">
          ${super.render()} ${this.renderExtraContent()}
          ${this.viewport === 'x-small'
            ? html`${this.renderListOptions()}`
            : html` <mc-popover
                class="${classMap(classes)}"
                .customtriggerelement="${this.inputField}"
                .trigger=${this.showlistonfocus ? 'focus' : 'click'}
                position="bottom-left"
                width="${this.optionswidth ? this.optionswidth : 'trigger'}"
                maxheight="${ifDefined(this.optionsheight)}"
                ?open="${classes.visible}"
                .actionkeys=${this.actionkeys}
                preventcloseonblur
                @scroll=${this.handleScroll}
              >
                ${this.renderListOptions()}
              </mc-popover>`}
        </div>
      </div>
    `;
  }

  protected renderListOptions(): TemplateResult {
    this.currentGroup = null;
    return html`<mc-list
      id="listbox"
      aria-labelledby="label"
      class="content"
      noborder
      .fit="${this.fit}"
      .value=${this.value}
      .scrollablecontainer=${(this.mcPopover as unknown as HTMLElement)?.shadowRoot?.querySelector(
        '.container',
      ) as HTMLElement}
      @listchange=${this.onOptionSelected}
      @focuschange=${this.handleListItemFocusChange}
      type="typeahead"
      disablesetfocus
      @scroll=${this.handleScroll}
    >
      ${this.renderInitList(0) && this.listlabel !== '' ? html`<small>${this.listlabel}</small>` : ``}
      ${this.renderOptionsFromData()}
      <slot @slotchange=${this.handleSlotChange}></slot>
    </mc-list>`;
  }

  protected renderExtraContent(): TemplateResult | null {
    return null;
  }

  protected renderOptionsFromData(): TemplateResult | (TemplateResult<1> | null)[] | null {
    if (this.internalLoadingState === false && this.loading === false) {
      if (this.visibleOptions && this.visibleOptions?.length > 0) {
        return this.visibleOptions.map((item: IMcTypeaheadData) => {
          if (!item.mcOption) {
            return this.renderOption(item);
          }
        });
      } else if (this.inputElement && this.inputElement?.value.length >= this.minchars) {
        return html`<div data-cy="nosuggestions" class="nosuggestions">${this.nosuggestions}</div>`;
      }
    }
  }

  protected renderOption(item: IMcTypeaheadData): TemplateResult<1> {
    return html`${this.renderGroupLabel(item)}
      <mc-option .value="${item.value}" .icon="${item.icon}" ?disabled=${item.disabled}>
        ${this.highlight && item.label ? this.highlightText(item.label) : item.label}
        ${when(
          item.sublabel,
          () =>
            html`<span slot="sublabel"
              >${this.highlight && item.sublabel ? this.highlightText(item.sublabel) : item.sublabel}</span
            >`,
        )}
      </mc-option>`;
  }

  protected renderGroupLabel(item: IMcTypeaheadData): TemplateResult | null {
    if (item.group && item.group !== this.currentGroup) {
      this.currentGroup = item.group;
      return html`<small>${item.group}</small>`;
    } else {
      return null;
    }
  }

  private fullScreenHeading(): TemplateResult | null {
    return this.fullScreen
      ? html`<header>
          <h2 data-cy="modal-title" class="mds-modal_title">${this.inputLabel}</h2>
          <mc-button
            data-cy="modal-close-button"
            class="mds-modal_close-button "
            appearance="neutral"
            data-cy="close"
            hiddenlabel
            icon="times"
            label="Close"
            padding="none"
            variant="plain"
            @click="${this.closeFullScreen}"
            disablediconslot
            disabledlabelslot
          ></mc-button>
        </header>`
      : null;
  }

  /* lifecycle hooks */
  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.addEventListener('blur', this.handleBlur.bind(this));
    this.addEventListener('mouseout', this.handleMouseOut.bind(this));
    window.addEventListener('resize', this.setFullScreen);

    this.dispatchSearchEvent = debounce(
      this,
      () => {
        this.dispatchEvent(
          new CustomEvent('search', {
            detail: this.value,
          }),
        );
        this.internalLoadingState = false;
      },
      this.debounce,
    );
    this.setItemFocus = debounce(
      this,
      () => {
        this.setFocusOnItem();
      },
      this.debounce,
    );
  }

  public disconnectedCallback(): void {
    window.removeEventListener('resize', this.setFullScreen);
    super.disconnectedCallback();
  }

  public async getUpdateComplete(): Promise<boolean> {
    await super.getUpdateComplete();
    this.hasInitValue = this.value ? true : false;
    return this.hasInitValue;
  }

  public async updated(changedProperties: PropertyValues): Promise<void> {
    super.updated(changedProperties);

    if (changedProperties.has('fullScreen')) {
      this.togglePageLevelScrollingInFullScreenModal(this.fullScreen);
    }
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('data') && changedProperties.get('data') !== this.data) {
      this.inferredData = !this.data ? this.data : [...this.data];
      this.generateOptionsData();
      this.triggerFilter();
      this.visibleOptions = this.inferredData?.filter((item: IMcTypeaheadData) => item.visible);
      return;
    }
    if (
      changedProperties.has('value') &&
      changedProperties.get('value') !== undefined &&
      changedProperties.get('value') !== this.value &&
      this.value !== null
    ) {
      this.triggerFilter();
      this.visibleOptions = this.inferredData?.filter((item: IMcTypeaheadData) => item.visible);
      return;
    }
    if (
      changedProperties.has('loading') &&
      changedProperties.get('loading') !== undefined &&
      changedProperties.get('loading') !== this.loading
    ) {
      this.triggerFilter();
    }
    if (changedProperties.has('open') && this.open) {
      this.setFullScreen();
    }
  }

  /* event handlers */
  protected handleKeyDown(event: KeyboardEvent): void {
    this.isActive = true;

    if (this.viewport !== 'x-small' && ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter'].includes(event.key)) {
      if (this.mcList && this.mcList.handleKeyDown && this.mcOptions && this.mcOptions.length > 0) {
        this.mcList?.handleKeyDown(event);
      }
    }
    if (['Tab'].includes(event.key)) {
      this.updatePopoverHide();
    }
  }

  protected handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.isActive = false;
    } else {
      this.isActive = this.showlistonfocus || this.value.length >= this.minchars ? true : false;
    }
  }

  protected override handleInputClick = (): void => {
    this.setIsActiveAndFullScreen();
  };

  protected handleMouseOut(): void {
    this.setFocusOnItem();
  }

  private handleBlur(event: FocusEvent): void {
    if (event.relatedTarget && (event.relatedTarget as HTMLElement).nodeName.toLowerCase() === 'mc-option') {
      return;
    }
    if (!this.fullScreen) {
      this.isActive = false;
    }
  }

  private handleListItemFocusChange(event: CustomEvent): void {
    this.lastFocusedItemIndex = event.detail.index;
  }

  private setFullScreen = (): void => {
    requestAnimationFrame(() => {
      if (this.viewport === 'x-small' && this.isActive) {
        this.fullScreen = true;
      } else {
        this.fullScreen = false;
      }
    });
  };

  private handleScroll(event: Event): void {
    if (this.infinitescroll) {
      event.stopPropagation();
      const listEl = this.viewport === 'x-small' ? this.mcList?.list : this.mcPopover?.container;
      const scrollTop = listEl ? listEl.scrollTop : 0;
      if (listEl && this.lastScrollTop != null && scrollTop > this.lastScrollTop) {
        const triggerPoint = this.isAtBottom(listEl);
        if (triggerPoint) {
          this.dispatchEvent(new CustomEvent('listscroll'));
        }
      }
      this.lastScrollTop = scrollTop;
    }
  }

  protected override onInputFocus(): void {
    super.onInputFocus();

    this.internalLoadingState = this.showlistonfocus ? false : true;
    this.selectedOptions = null;
    this.isActive = this.showlistonfocus || this.viewport === 'x-small' ? true : false;
    if (
      (this.inputElement && this.inputElement?.value.length >= this.minchars && this.dispatchSearchEvent) ||
      this.showlistonfocus
    ) {
      this.triggerFilter();
    } else {
      this.updatePopoverHide();
    }

    if (this.showlistonfocus) {
      this.setIsActiveAndFullScreen();
    }
  }

  protected override handleInputChange(): void {
    super.handleInputChange();
    this.setFullScreen();
    this.internalLoadingState = true;

    this.resetToDefaultState();

    if (
      this.inputElement &&
      (this.inputElement?.value.length >= this.minchars || this.showlistonfocus) &&
      this.dispatchSearchEvent
    ) {
      this.dispatchSearchEvent();
    }
  }

  private handleSlotChange(): void {
    if (this.slotElements) {
      const options = Array.from(this.slotElements).filter((el): boolean => {
        return el.nodeName.toLowerCase() === 'mc-option';
      });
      const hasOnlyInput = Array.from(this.slotElements).filter((el): boolean => {
        return el.nodeName.toLowerCase() !== 'input';
      });
      if (options.length > 0) {
        this.data = options as IMcTypeaheadData[];
        this.generateOptionsData();
      } else if (
        options.length === 0 &&
        this.value.length >= this.minchars &&
        hasOnlyInput.length === 0 &&
        !this.showlistonfocus
      ) {
        this.data = [];
      }
    }
  }

  protected onOptionSelected(el: CustomEvent): void {
    requestAnimationFrame(() => (this.fullScreen = false));
    this.selectedOptions = el.detail.item as IMcSelectOption;
    const selectedOptionObject = this.inferredData?.find(
      (item: IMcTypeaheadData) => item.value === (this.selectedOptions as IMcSelectOption)?.value,
    );
    if (this.selectedOptions && this.inferredData && selectedOptionObject) {
      this.value = selectedOptionObject.label;
      this.dispatchEvent(new Event('input'));
      this.dispatchEvent(
        new CustomEvent<IMcTypeaheadOptionSelectedDetail>('optionselected', {
          detail: selectedOptionObject,
          composed: true,
          bubbles: true,
        }),
      );
      this.inferredData.forEach((item: IMcTypeaheadData) => (item.visible = false));
      this.isActive = false;
      this.updatePopoverHide();

      if (this.viewport !== 'x-small') {
        this.inputElement?.focus();
      }
    }
  }

  protected updatePopoverShow(): void {
    if (
      ((this.value && this.value?.length >= this.minchars) || this.showlistonfocus) &&
      this.mcPopover &&
      this.mcPopover.show
    ) {
      this.mcPopover.show();
      if (this.inferredData && this.inferredData?.length > 0 && this.setItemFocus) {
        this.setItemFocus();
      }
    }
  }

  protected async updatePopoverHide(): Promise<void> {
    await this.updateComplete;
    if (this.mcPopover && this.mcPopover.hide) {
      this.mcPopover.hide();
    }
  }

  /**
   * Prevents unexpected scrolling in mobile view, when
   * the modal body outside of the list was touched and dragged and the keyboard was popped up.
   */
  private preventScrollingWhenDraggedInMobile(): void {
    if (this.viewport === 'x-small') {
      this.inputElement?.blur();
    }
  }

  private closeFullScreen(): void {
    this.fullScreen = false;
    this.isActive = false;
  }

  /* utils */
  private resetToDefaultState(): void {
    this.selectedOptions = null;
    this.hasInitValue = false;
    this.currentGroup = null;
    this.visibleOptions = null;
    for (const item of this.inferredData || []) {
      if (item.mcOption) {
        item.mcOption.visible = false;
      }
      item.visible = false;
    }

    this.lastFocusedItemIndex = 0;
    if (this.infinitescroll) {
      this.lastScrollTop = 0;
      if (this.mcPopover && this.mcPopover.container) {
        this.mcPopover.container.scrollTop = 0;
      }
    }
  }

  protected triggerFilter(): void {
    if ((this.isActive && this.value?.length >= this.minchars && !this.selectedOptions) || this.showlistonfocus) {
      if (this.inferredData && this.inferredData.length >= 0) {
        this.filterOptions();
      }
    }
  }

  private generateOptionsData(): void {
    this.inferredData?.forEach((item: IMcTypeaheadData) => {
      item.label = item.nodeName
        ? this.getLabel(item as unknown as HTMLElement, this.labelSelector, item.label)
        : item.label;
      item.sublabel = item.nodeName
        ? this.getLabel(item as unknown as HTMLElement, this.sublabelSelector, item.sublabel)
        : item.sublabel;
      item.value = item.nodeName && !item.value ? item.getAttribute('value') : item.value;
      item.icon = item.nodeName && !item.icon ? item.getAttribute('icon') : item.icon;
      item.disabled = item.nodeName && !item.disabled ? item.getAttribute('disabled') === 'true' : item.disabled;
      item.group = item.nodeName && !item.group ? item.getAttribute('group') : item.group;
      item.mcOption = item.nodeName ? (item as IMcSelectOption) : null;
      item.visible = false;
    });
  }

  private getTextFromAssignedNodes(nodes: Node[]): string {
    let text = '';
    nodes.forEach((node) => {
      if (node.textContent) {
        text += node.textContent.trim().replace(/\n/g, '');
      }
    });
    return text;
  }

  private getLabel<T extends HTMLElement>(item: T, selector: string, itemProp: string): string {
    if (itemProp) return itemProp;
    const labelElement = item?.shadowRoot?.querySelector<HTMLSlotElement>(selector);
    if (labelElement) {
      return this.getTextFromAssignedNodes(labelElement.assignedNodes());
    }
    if (item.children.length > 0) {
      return this.getTextFromAssignedNodes(Array.from(item.children));
    }
    if (item.innerText && item.innerText.length > 0) {
      return item.innerText;
    }
    return '';
  }

  private setFocusOnItem(): void {
    const optionsInSlot = this.querySelectorAll('mc-option');
    const optionsInShadowRoot = this.shadowRoot?.querySelectorAll('mc-option');
    this.mcOptions = optionsInSlot.length > 0 ? optionsInSlot : optionsInShadowRoot;

    if (this.mcList && this.mcList.setFocusedItem && this.mcOptions && this.mcOptions.length > 0) {
      const focusedItem =
        (this.mcOptions[this.lastFocusedItemIndex] as IMcSelectOption)?.visible === true
          ? this.mcOptions[this.lastFocusedItemIndex]
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.from(this.mcOptions).filter((item: any) => item.visible === true)[0];
      this.mcList.setFocusedItem(focusedItem as IMcSelectOption);
    }
  }

  protected renderInitList(index: number): boolean {
    return this.showlistonfocus && index < this.maxoptions && (!this.value || this.value?.length < this.minchars);
  }

  private isAtBottom(el: HTMLElement): boolean {
    const elementScrollHeight = el.scrollHeight,
      elementScrollTop = el.scrollTop,
      elementHeight = el.offsetHeight;
    if (elementHeight === 0) {
      return true;
    }
    return Math.ceil(elementHeight + elementScrollTop) >= elementScrollHeight;
  }

  protected setIsActiveAndFullScreen(): void {
    this.isActive = this.showlistonfocus || this.isActive;
    this.setFullScreen();
  }

  // filter options
  protected matchText(text: string): string[] {
    if (!text) return [];
    const value = this.normalizeText(this.value);
    if (this.customfilter) {
      return this.customfilter(text, value);
    }
    return Array.from(new Set(text.match(new RegExp(this.escapeForRegex(value), 'gi'))));
  }

  protected filterOptions(): void {
    let matchCount = 0;
    this.inferredData?.map((item: IMcTypeaheadData, index: number) => {
      // ignore filter function when disablefilter is true
      if (this.disablefilter) {
        item.visible = true;
        return;
      }
      // ignore filter function when showlistonfocus is true
      if (this.renderInitList(index)) {
        item.visible = true;
        return;
      }
      // filter
      const matchLabel = this.matchText(item.label?.toLowerCase());
      const matchSublabel = item.sublabel && !this.matchlabelonly ? this.matchText(item.sublabel.toLowerCase()) : [];
      const matchValue = !this.matchlabelonly ? this.matchText(item.value?.toString().toLowerCase()) : [];
      if (
        ((matchLabel && matchLabel.length > 0) ||
          (matchSublabel && matchSublabel.length > 0) ||
          (matchValue && matchValue.length > 0)) &&
        matchCount < this.maxoptions &&
        this.value &&
        this.value?.length >= this.minchars
      ) {
        matchCount++;
        if (item.mcOption) {
          item.mcOption.visible = true;
        }
        item.visible = true;
      } else {
        if (item.mcOption) {
          item.mcOption.visible = false;
        }
        item.visible = false;
      }
    });
    this.updatePopoverShow();
  }

  // highlight text
  private escapeForRegex(text: string | undefined): string {
    return text?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') || '';
  }

  private normalizeText(text: string): string {
    return text?.toLowerCase() || '';
  }

  protected highlightText(text: string): TemplateResult {
    const matches = this.matchText(text);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markMatch = (text: string, matches: string[]): any => {
      if (!matches.length) {
        return text;
      }
      const m = matches.pop();
      const parts = text.split(new RegExp(this.escapeForRegex(m)), -1).map((p) => markMatch(p, matches));
      return parts.map((p, i) => [p, i < parts.length - 1 ? html`<mark>${m}</mark>` : '']);
    };

    return html`<span class="highlight">${markMatch(text, matches)}</span>`;
  }
}
customElements.get('mc-typeahead') || customElements.define('mc-typeahead', McTypeahead);
