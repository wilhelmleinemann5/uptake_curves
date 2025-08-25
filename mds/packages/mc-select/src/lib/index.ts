// lit-elements
import { CSSResultArray, PropertyValues } from 'lit';
// styles
import { styles } from './styles/index.styles';
export { styles as selectStyles };
// types & base class
import { IMcSelect, IMcSelectOptionSelectedDetail } from './types';
import { IMcSelectOption, McSelectBase, ListTypes } from './base';

export * from './base';
export type { IMcSelect } from './types';

/**
 * @element `mc-select`
 *
 * @event {InputEvent} input - Fired when the option is selected.
 * @event {MouseEvent} click - Fired on mc-input click.
 * @event {FocusEvent} blur - Fired when mc-input is going out of focus.
 * @event {CustomEvent} clearbuttonclick - Fires when the clear button is pressed.
 * @event {CustomEvent<IMcSelectOptionSelectedDetail>} optionselected - Fired when the option is selected, includes detail option item object.
 * @event {CustomEvent<Boolean>} opened - Fired when dropdown gets opened.
 * @event {CustomEvent<Boolean>} closed - Fired when dropdown gets closed.
 *
 * @slot - The default slot where the options and dividers go
 * @slot `label` - The label HTML to use for the mc-input.
 * @slot `hint` - The hint HTML to use for the mc-input.
 * @slot `errormessage` - The errormessage HTML to use for the mc-input.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `selected-option` - for changing visuals of selected option field
 * @csspart `popover-content` - for changing i.e. z-index of popover content
 */

export class McSelect extends McSelectBase implements IMcSelect {
  protected listType: ListTypes = 'single';

  protected labelSelector = '.labels';

  /* styles */
  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  public constructor() {
    super();
    this.trailingicon = 'chevron-down';
    this.keepclearbuttonvisible = true;
  }

  /* render */

  /* event handlers */
  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('clearbutton')) {
      this.placeholderOption = !this.clearbutton;
    }
    if (changedProperties.has('value')) {
      this.selectedOption = null;
    }
  }

  protected async setOptionSelected(el: IMcSelectOption): Promise<void> {
    this.selectedOption = el;
    if (this.selectedOption) {
      this.value = this.selectedOption.value === 'null' ? '' : (this.selectedOption.value as string);
      this.selectedOptionLabel = this.getDisplayLabel();
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(
        new CustomEvent<IMcSelectOptionSelectedDetail>('optionselected', {
          detail: { value: this.value, label: this.selectedOption.innerText },
          composed: true,
          bubbles: true,
        }),
      );
      if (this.mcPopover && this.mcPopover.hide) {
        this.mcPopover.hide();
      }
      await this.updateComplete;
      this.inputElement?.focus();
    }
  }

  /* utils */
  protected getOptions(): void {
    if (this.slotElements) {
      this.options = Array.from(this.slotElements).filter((el): boolean => {
        return el.nodeName.toLowerCase() === 'mc-option';
      });
    }
  }

  protected getDisplayLabel(): string | Node | undefined {
    if (this.selectedOption) {
      if (this.placeholderOption && this.placeholder && this.selectedOption.label === this.placeholder) {
        return '';
      }
      const children = this.selectedOption.childNodes;
      let labelSlotText: IMcSelectOption | Node | null = null;
      if (children.length > 0) {
        labelSlotText = this.selectedOption.cloneNode(true);
        (labelSlotText as IMcSelectOption).fit = this.fit;
      }
      return this.selectedOption.label || !labelSlotText ? this.selectedOption.label : labelSlotText;
    }

    return '';
  }

  protected getSelectedOption(): void {
    if (this.options && this.options.length > 0) {
      const stringifiedValue = JSON.stringify(this.value);
      this.selectedOption = this.options?.find((el) => stringifiedValue === JSON.stringify(el.value));
      if (this.selectedOption) {
        this.selectedOption.selected = true;
      }
    }
  }

  protected getFocusedOption(): IMcSelectOption | null | undefined {
    if (this.selectedOption) {
      if (this.selectedOption.value === 'null' && this.placeholderOption && this.placeholder) {
        return this.options ? this.options[0] : null;
      }
      return this.selectedOption;
    }
    return this.options ? this.options[0] : null;
  }

  protected handleValueLabelSlotChange(): void {
    if (this.selectedOption) {
      this.value = this.selectedOption.value;
      this.selectedOptionLabel = this.getDisplayLabel();
    }
  }
}
customElements.get('mc-select') || customElements.define('mc-select', McSelect);
