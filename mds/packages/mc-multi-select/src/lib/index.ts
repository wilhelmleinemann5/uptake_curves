// lit-elements
import { html, TemplateResult, CSSResultArray } from 'lit';
import { property, state } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
import { selectStyles } from '@maersk-global/mds-components-core-select';
// types & base class
import { IMcMultiSelect, IMcMultiSelectOptionsSelectedDetail } from './types';
import { IMcSelectOption, McSelectBase, ListTypes } from '@maersk-global/mds-components-core-select';

import '@maersk-global/mds-components-core-option';

export type { IMcMultiSelect } from './types';

/**
 * @element `mc-multi-select`
 *
 * @event {InputEvent} input - Fired when the option is selected.
 * @event {MouseEvent} click - Fired on mc-input click.
 * @event {FocusEvent} blur - Fired when mc-input is going out of focus.
 * @event {CustomEvent} clearbuttonclick - Fires when the clear button is pressed.
 * @event {CustomEvent<IMcMultiSelectOptionsSelectedDetail>} optionselected - Fired when the option is selected, includes array of selected options labels and values.
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

export class McMultiSelect extends McSelectBase<IMcSelectOption[]> implements IMcMultiSelect {
  private clickedOption?: IMcSelectOption;

  protected listType: ListTypes = 'multiple';

  protected labelSelector = 'span[slot=label]';

  @state()
  private toggleOptions = true;

  @property({ type: Boolean })
  public hiddenselectclearlabel = false;

  @property({ type: String })
  public selectalllabel = 'Select all';

  @property({ type: String })
  public clearalllabel = 'Clear all';

  @property({ type: String })
  public summarylabel = '# out of # selected';

  /* styles */
  public static get styles(): CSSResultArray {
    return [super.styles, selectStyles, styles];
  }

  public constructor() {
    super();
    this.trailingicon = 'chevron-down';
    this.keepclearbuttonvisible = true;
    this.placeholderOption = true;
  }

  /* render */
  protected renderPlaceholderOption(): TemplateResult | null {
    return this.options && this.options.length > 1 && !this.hiddenselectclearlabel
      ? html`<mc-option type="select-clear" @click=${this.selectAllToggle} @keydown=${this.handleSelectAllKeydown}
          >${this.toggleOptions ? this.selectalllabel : this.clearalllabel}</mc-option
        >`
      : null;
  }

  /* event handlers */
  protected async setOptionSelected(el: IMcSelectOption): Promise<void> {
    this.clickedOption = el;
    if (this.clickedOption) {
      this.getSelectedOption();
      this.value = this.getSelectedOptionValue();
      this.selectedOptionLabel = this.getDisplayLabel();
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(
        new CustomEvent<IMcMultiSelectOptionsSelectedDetail>('optionselected', {
          detail: this.selectedOption?.map((option) => {
            return { value: option.value, label: option.innerHTML };
          }),
          composed: true,
          bubbles: true,
        }),
      );
      this.updateToggleOptions();
    }
  }

  /* utils */
  protected getOptions(): void {
    if (this.slotElements) {
      this.options = Array.from(this.slotElements).filter((el): boolean => {
        return el.nodeName.toLowerCase() === 'mc-option';
      }) as IMcSelectOption[];
      this.options.map((option): void => {
        option.label = this.getOptionLabel(option);
        option.name = this.name;
      });
    }
  }

  protected getDisplayLabel(): string {
    if (this.selectedOption && this.selectedOption.length > 0 && this.options) {
      const summarylabel = this.summarylabel
        .replace(/#/, this.selectedOption.length.toString())
        .replace(/#/, this.options.length.toString());
      return `${summarylabel}`;
    }
    return '';
  }

  protected getSelectedOption(): void {
    if (this.options && this.options.length > 0) {
      this.selectedOption = this.options.filter((el) => el.selected);
      this.updateToggleOptions();
    }
  }

  protected getFocusedOption(): IMcSelectOption | undefined {
    if (this.clickedOption) {
      return this.clickedOption;
    } else if (this.selectedOption && this.selectedOption.length > 0) {
      return this.selectedOption[0];
    }
    return this.options ? this.options[0] : undefined;
  }

  protected handleValueLabelSlotChange(): void {
    this.selectedOptionLabel = this.getDisplayLabel();
  }

  private updateToggleOptions(): void {
    this.toggleOptions = this.selectedOption && this.selectedOption.length < 2 ? true : false;
    this.clearButtonEnabled = !!(this.clearbutton && this.selectedOption && this.selectedOption.length > 0);
  }

  private selectAllToggle(): void {
    if (this.options) {
      this.options.map((option) => {
        if (!option.disabled) {
          option.selected = this.toggleOptions;
        }
        return option;
      });
    }
  }

  private handleSelectAllKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.selectAllToggle();
    }
  }

  private getOptionLabel(option: IMcSelectOption): string {
    const currentOption: HTMLElement & { label: string } = option as HTMLElement & { label: string };
    if (currentOption) {
      const children = currentOption.childNodes;
      let labelSlotText = null;
      if (children.length > 0) {
        const results = Array.from(children).filter((child) => child.nodeName === '#text');
        labelSlotText = results[0].textContent;
      }

      return (currentOption && currentOption.label) || !labelSlotText ? currentOption.label : labelSlotText;
    }
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getSelectedOptionValue(): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any = [];
    if (this.selectedOption) {
      this.selectedOption.map((option) => {
        value.push(option.value);
      });
    }

    return value;
  }
}
customElements.get('mc-multi-select') || customElements.define('mc-multi-select', McMultiSelect);
