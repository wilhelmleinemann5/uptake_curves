import { html, TemplateResult, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { McTypeahead } from '@maersk-global/mds-components-core-typeahead';
import { IMcTypeaheadMultiSelect, IMcTypeaheadMultiSelectData } from './types';
// mds-components
import '@maersk-global/mds-components-core-tag';
import '@maersk-global/mds-components-core-button';
import {
  IMcTypeaheadData,
  IMcTypeaheadOptionSelectedDetail,
  IMcSelectOption,
} from '@maersk-global/mds-components-core-typeahead/types';

/**
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
export class McTypeaheadMultiSelect extends McTypeahead implements IMcTypeaheadMultiSelect {
  private enterKeyDisabled = false;
  protected override selectedOptions?: IMcSelectOption[] | null = null;

  @property({ type: Array })
  public selecteddata: IMcTypeaheadMultiSelectData[] = [];

  @property({ type: Boolean })
  public hiddentags = false;

  @property({ type: String })
  public clearalllabel = 'Clear all';

  @property({ type: Boolean })
  public freetexttagging = false;

  /* styles */
  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  public constructor() {
    super();
    this.keepclearbuttonvisible = true;
    this.showlistonfocus = true;
  }

  public override willUpdate(changedProperties: Map<string, unknown>): void {
    super.willUpdate(changedProperties);

    // If selecteddata was changed externally, update filtering
    if (changedProperties.has('selecteddata')) {
      this.requestUpdate();
      // Trigger filtering to hide selected options from dropdown
      if (this.inferredData) {
        this.filterOptions();
        this.visibleOptions = this.inferredData?.filter((item: IMcTypeaheadData) => item.visible);
      }
    }
  }

  /* render */
  protected renderExtraContent(): TemplateResult {
    if (!this.selecteddata || this.selecteddata.length === 0 || this.hiddentags) {
      return html``;
    }

    const shouldShowClearButton =
      this.selecteddata && this.selecteddata.length >= 2 && this.clearalllabel && this.clearalllabel.trim() !== '';

    return html`
      <div class="selected-tags">
        ${this.selecteddata.map(
          (option) =>
            html`<mc-tag
              .fit="${this.fit}"
              label="${option.label}"
              withaction
              @dismiss=${() => {
                this.removeSelectedOption(option);
              }}
            ></mc-tag>`,
        )}
        ${shouldShowClearButton
          ? html`<mc-button
              appearance="secondary"
              variant="plain"
              .fit="${this.fit === 'large' ? 'large' : 'small'}"
              padding="compact"
              @click=${() => {
                this.clearAllSelectedOptions();
              }}
            >
              ${this.clearalllabel}
            </mc-button>`
          : ''}
      </div>
    `;
  }

  /* event handlers */
  protected override handleKeyDown(event: KeyboardEvent): void {
    // Handle Enter key for custom tag creation - only if no visible options in dropdown
    if (event.key === 'Enter' && this.freetexttagging && this.inputElement) {
      const inputValue = this.inputElement.value.trim();

      // Check if there are any visible options in the dropdown
      const visibleOptions = this.inferredData?.filter((option) => option.visible) || [];
      const hasVisibleOptions = visibleOptions.length > 0;

      if (
        inputValue &&
        !hasVisibleOptions &&
        !(this.selecteddata || []).some(
          (selected) =>
            selected.label?.toLowerCase() === inputValue.toLowerCase() ||
            selected.value?.toString().toLowerCase() === inputValue.toLowerCase(),
        )
      ) {
        const customTag: IMcTypeaheadMultiSelectData = {
          label: inputValue,
          value: inputValue,
          isCustomTag: true,
        };

        this.addSelectedOption(customTag);
        this.dispatchEvent(
          new CustomEvent<IMcTypeaheadOptionSelectedDetail>('optionselected', {
            detail: [...this.selecteddata],
            composed: true,
            bubbles: true,
          }),
        );

        // Clear input and close dropdown
        this.value = '';
        this.dispatchEvent(new Event('input'));
        this.isActive = false;
        this.updatePopoverHide();

        if (this.viewport !== 'x-small') {
          this.inputElement?.focus();
        }

        event.preventDefault();
        event.stopPropagation();
        this.requestUpdate();
        return;
      }
    }

    // In multi-select mode, disable Enter key if flag is set
    if (event.key === 'Enter' && this.enterKeyDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    super.handleKeyDown(event);
  }

  protected override handleInputChange(): void {
    super.handleInputChange();

    // Re-enable Enter key when user starts typing in multi-select mode
    if (this.enterKeyDisabled) {
      this.enterKeyDisabled = false;
    }

    // In multi-select mode, only reset the options visibility, not selected data
    this.resetOptionsVisibility();

    if (
      this.inputElement &&
      (this.inputElement?.value.length >= this.minchars || this.showlistonfocus) &&
      this.dispatchSearchEvent
    ) {
      this.dispatchSearchEvent();
    }
  }

  protected override onInputFocus(): void {
    super.onInputFocus();
    this.internalLoadingState = this.showlistonfocus ? false : true;
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

  protected override onOptionSelected(el: CustomEvent): void {
    requestAnimationFrame(() => (this.fullScreen = false));
    const clickedOption = el.detail.item as IMcSelectOption;
    const selectedOptionObject = this.inferredData?.find(
      (item: IMcTypeaheadData) => item.value === clickedOption?.value,
    );

    if (clickedOption && this.inferredData && selectedOptionObject) {
      // Multi-select mode
      const existingIndex = this.selecteddata.findIndex((option) => option.value === selectedOptionObject.value);

      if (existingIndex === -1) {
        this.addSelectedOption(selectedOptionObject as IMcTypeaheadMultiSelectData);
        this.dispatchEvent(
          new CustomEvent<IMcTypeaheadOptionSelectedDetail>('optionselected', {
            detail: [...this.selecteddata],
            composed: true,
            bubbles: true,
          }),
        );

        // Disable Enter key after selection
        this.enterKeyDisabled = true;

        this.value = '';
        this.dispatchEvent(new Event('input'));
        this.isActive = false;
        this.updatePopoverHide();
        this.filterOptions();
        this.visibleOptions = this.inferredData?.filter((item: IMcTypeaheadData) => item.visible);

        if (this.viewport !== 'x-small') {
          this.inputElement?.focus();
        }
      }

      this.requestUpdate();
    }
  }

  /* utils */
  public removeSelectedOption(optionToRemove: IMcTypeaheadMultiSelectData): void {
    this.removeSelectedOptionByData(optionToRemove);
    this.dispatchEvent(
      new CustomEvent<IMcTypeaheadOptionSelectedDetail>('optionselected', {
        detail: [...this.selecteddata],
        composed: true,
        bubbles: true,
      }),
    );
    this.triggerFilter();
    this.visibleOptions = this.inferredData?.filter((item: IMcTypeaheadData) => item.visible);
    this.updatePopoverHide();
    this.requestUpdate();
  }

  public clearAllSelectedOptions(): void {
    this.selecteddata = [];
    this.dispatchEvent(
      new CustomEvent<IMcTypeaheadOptionSelectedDetail>('optionselected', {
        detail: [],
        composed: true,
        bubbles: true,
      }),
    );
    this.triggerFilter();
    this.visibleOptions = this.inferredData?.filter((item: IMcTypeaheadData) => item.visible);
    this.updatePopoverHide();
    this.requestUpdate();
  }

  protected override filterOptions(): void {
    let matchCount = 0;

    this.inferredData?.map((item: IMcTypeaheadData, index: number) => {
      // In multiselect mode, exclude already selected options (but only non-custom tags)
      // Custom tags should not affect the dropdown options since they're user-created
      if ((this.selecteddata || []).some((selected) => selected.value === item.value && !selected.isCustomTag)) {
        item.visible = false;
        if (item.mcOption) {
          item.mcOption.visible = false;
        }
        return;
      }

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

      // In multiselect mode with empty input, show all non-selected options
      const shouldShowInMultiselect = !this.value || this.value.length === 0;

      if (
        (shouldShowInMultiselect ||
          (((matchLabel && matchLabel.length > 0) ||
            (matchSublabel && matchSublabel.length > 0) ||
            (matchValue && matchValue.length > 0)) &&
            this.value &&
            this.value?.length >= this.minchars)) &&
        matchCount < this.maxoptions
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

  protected resetOptionsVisibility(): void {
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

  private addSelectedOption(option: IMcTypeaheadMultiSelectData): void {
    if (!(this.selecteddata || []).some((selected) => selected.value === option.value)) {
      this.selecteddata = [...(this.selecteddata || []), option];
    }
  }

  private removeSelectedOptionByData(optionToRemove: IMcTypeaheadMultiSelectData): void {
    this.selecteddata = (this.selecteddata || []).filter((option) => option.value !== optionToRemove.value);
  }
}
customElements.get('mc-typeahead-multi-select') ||
  customElements.define('mc-typeahead-multi-select', McTypeaheadMultiSelect);

declare global {
  interface HTMLElementTagNameMap {
    'mc-typeahead-multi-select': McTypeaheadMultiSelect;
  }
}
