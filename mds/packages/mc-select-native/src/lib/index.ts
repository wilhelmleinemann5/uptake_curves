// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// utils
import { FormField, setHostCssClass, DisabledState } from '@maersk-global/mds-components-utils';
// styles
// import { styles as inputStyles } from '@maersk-global/mds-components-core-input/src/lib/styles/index.styles';
import { styles } from './styles/index.styles';
import { inputStyles } from '@maersk-global/mds-components-core-input';
// types
import type { Fit } from '@maersk-global/mds-shared-types';
import {
  IMcSelectNative,
  LabelPosition,
  McSelectNativeOptions,
  SelectOption,
  IMcSelectNativeChangeDetail,
} from './types';
// mds-components used with mc-radio
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-label';

export type { IMcSelectNative } from './types';

/**
 * @element `mc-select-native`
 *
 * @event {CustomEvent<IMcSelectNativeChangeDetail>} change - Emitted when the selected status changes.
 *
 * @slot `label` - The label HTML to use for the mc-select-native.
 * @slot `hint` - The hint HTML to use for the select.
 * @slot `errormessage` - The errormessage HTML to use for the select.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 *
 */
export class McSelectNative extends DisabledState(FormField(LitElement)) implements IMcSelectNative {
  private isFirstUpdate = true;
  private _value?: McSelectNativeOptions | null;
  private get isPlaceholderActive(): boolean {
    const isSelectedIndexEmpty = !this.selectedindex || this.selectedindex.length === 0;
    return (
      (!this._value && isSelectedIndexEmpty) ||
      (Array.isArray(this._value) && this._value.length === 0 && isSelectedIndexEmpty)
    );
  }
  private select?: HTMLSelectElement | null;

  protected focused = false;

  @property({ type: String })
  public errormessage?: string;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public hint?: string;

  @property({ type: String, reflect: true })
  public id = '';

  private get inputId(): string {
    return `${this.id ?? 'field'}-input`;
  }

  @property({ type: Boolean, reflect: true })
  public invalid = false;

  @property({ type: String })
  public label = 'Label';

  @property({ type: String })
  public labelposition: LabelPosition = 'top';

  @property({ type: Array })
  public options?: McSelectNativeOptions;

  @property({ type: String })
  public placeholder = 'Select an item';

  @property({ type: Boolean, reflect: true })
  public required = false;

  @property({ type: Array })
  public selectedindex?: number[];

  @property({ type: Array, reflect: true, hasChanged: McSelectNative.isValueValidInVue2 })
  public set value(newValue: McSelectNativeOptions | null | undefined) {
    if (McSelectNative.isValueValidInVue2(newValue)) {
      const oldValue = this._value;
      const isNewValueEmpty = !newValue || (Array.isArray(newValue) && newValue.length === 0);

      const isResettingValue = oldValue && isNewValueEmpty;

      if (isNewValueEmpty && isResettingValue) {
        this.selectedindex = undefined;
      }

      this._value = newValue;
      this.requestUpdate('value', oldValue);
    }
  }
  public get value(): McSelectNativeOptions | null | undefined {
    return this._value;
  }

  @property({ type: String })
  public variant: 'default' | 'vanity' | 'multiple' = 'default';

  @property({ type: String })
  public width = 'auto';

  public static get styles(): CSSResultArray {
    return [inputStyles, styles];
  }

  /* render */
  protected render(): TemplateResult {
    const containerClasses = {
      multiple: this.variant === 'multiple',
      suffix: this.variant !== 'multiple',
      vanity: this.variant === 'vanity',
      [`${this.fit}`]: true,
      [`${this.labelposition}`]: true,
    };

    return html` <div class="mc-input ${classMap(containerClasses)}">
      ${this.renderLabel()}
      <div class="container">${this.renderField()} ${this.renderError()} ${this.renderHint()}</div>
    </div>`;
  }

  protected renderField(): TemplateResult {
    const hostClasses = setHostCssClass(this.classList, ['hover', 'focus', 'active']);
    const inputClasses = {
      'active-placeholder': this.isPlaceholderActive && this.variant !== 'multiple',
      [hostClasses]: true,
    };
    return html`<div class="inner">
      <div
        class="field ${this.disabled ? 'disabled' : null}"
        style="${this.width === 'auto' ? '' : `width:${this.width}%`}"
      >
        <select
          id="${this.inputId}"
          aria-labelledby="label"
          aria-describedby="hint"
          @change=${this.handleOnChange}
          class="input ${classMap(inputClasses)}"
          ?multiple=${this.variant === 'multiple'}
          ?disabled=${this.disabled}
          ?invalid="${this.invalid}"
          aria-invalid="${ifDefined(this.invalid ? this.invalid : undefined)}"
          ?required=${this.required}
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}"
        >
          ${this.renderPlaceholder()} ${this.renderSelectOptions()}
        </select>
        ${this.renderIcon()}
      </div>
    </div>`;
  }

  protected renderLabel(): TemplateResult {
    return html`<label class="${this.hiddenlabel ? 'hiddenlabel' : ''}" part="label-container" for=${this.inputId}
      ><mc-label
        exportparts="label"
        id="label"
        .label=${this.label}
        .fit=${this.fit}
        ?hiddenlabel=${this.hiddenlabel}
        .labelposition=${this.labelposition}
        ><slot name="label">${this.label}</slot></mc-label
      ></label
    >`;
  }

  protected renderError(): TemplateResult {
    return html`<mc-error id="invalid" .errormessage=${this.errormessage} .fit=${this.fit} ?invalid=${this.invalid}
      ><slot name="errormessage">${this.errormessage}</slot></mc-error
    >`;
  }

  protected renderHint(): TemplateResult {
    return html`<mc-hint id="hint" .hint=${this.hint} .fit=${this.fit}><slot name="hint">${this.hint}</slot></mc-hint>`;
  }

  private renderSelectOptions(): TemplateResult[] | undefined {
    return (
      this.options &&
      this.options.map((option: string | number | SelectOption) => {
        return html`<option
          value="${option !== null && typeof option === 'object' ? option.value : option}"
          ?selected=${!this.isPlaceholderActive && this.isOptionSelected(option)}
        >
          ${option !== null && typeof option === 'object' ? option.label : option}
        </option>`;
      })
    );
  }

  private isOptionSelected(option: string | number | SelectOption): boolean {
    if (this._value) {
      const selectedValue = this._value.find((val) => {
        if (
          (typeof val === 'string' || typeof val === 'number') &&
          (typeof option === 'string' || typeof option === 'number')
        ) {
          return val == option;
        }
        if (typeof val === 'object' && typeof option === 'object') {
          return val.value == option.value;
        }
        return false;
      });

      if (this.select && selectedValue) {
        if (typeof selectedValue === 'string' || typeof selectedValue === 'number') {
          this.select.value = selectedValue.toString();
        } else {
          this.select.value = selectedValue.value.toString();
        }
      }

      return !!selectedValue;
    }
    return false;
  }

  private renderPlaceholder(): TemplateResult | null {
    return this.placeholder && this.variant !== 'multiple'
      ? html`<option value="" ?selected="${this.isPlaceholderActive}">${this.placeholder}</option>`
      : null;
  }

  private renderIcon(): TemplateResult | null {
    return this.variant === 'multiple'
      ? null
      : html`<mc-icon
          class="affix type-suffix"
          icon="chevron-down"
          size=${this.fit === 'large' ? '24' : '20'}
        ></mc-icon>`;
  }

  /* events */
  private handleOnChange(event: Event): void {
    const [selectedOptions, selectedindex] = this.getSelected();
    this.value = selectedOptions;
    this.selectedindex = selectedindex;
    this.dispatchEvent(
      new CustomEvent<IMcSelectNativeChangeDetail>('change', {
        detail: { selectedOptions, selectedindex, selectedIndex: selectedindex },
      }),
    );
    event.stopPropagation();
  }

  private getSelected(): [McSelectNativeOptions, number[]] {
    const selectedValues: McSelectNativeOptions = [];
    const selectedindexes: Array<number> = [];
    const options: HTMLOptionsCollection | undefined = this.select?.options;
    if (options) {
      const len: number = options.length;
      for (let i = 0; i < len; i++) {
        if (options[i].selected) {
          const selectedHtmlOption = options[i];
          this.options?.find((option: string | number | SelectOption, optionIndex) => {
            const isOptionSelected =
              typeof option === 'object' && option.value !== undefined
                ? option.value.toString() === selectedHtmlOption.value
                : option.toString() === selectedHtmlOption.value;

            if (isOptionSelected) {
              selectedValues.push(option);
              selectedindexes.push(optionIndex);

              return true;
            }

            return false;
          });
        }
      }
    }
    return [selectedValues, selectedindexes];
  }

  public focus(): void {
    const focusEvt = new CustomEvent('focus');
    this.select?.dispatchEvent(focusEvt);
    this.select?.focus();
  }

  protected onInputFocus(): void {
    this.focused = true;
  }

  public blur(): void {
    const blurEvt = new CustomEvent('blur');
    this.select?.dispatchEvent(blurEvt);
    this.select?.blur();
  }

  protected onInputBlur(): void {
    this.focused = false;
  }

  /* lifecycle methods */
  public firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.initializeElements();
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (
      changedProperties.has('selectedindex') &&
      this.selectedindex &&
      (!changedProperties.has('value') || !this.isFirstUpdate)
    ) {
      this.value = this.options?.filter((_, index) => this.selectedindex?.includes(index));
    }

    this.isFirstUpdate = false;
  }

  /* selector methods */
  private initializeElements(): void {
    this.select = this.shadowRoot?.querySelector('select');
  }

  /**
   * Returns true if the value is valid, otherwise false.
   * In Vue2 sometimes the new value is being supplied with invalid values.
   * Remove this function if Vue2 in our organisation is deprecated.
   * Not having this logic in place, would break vee-validate, or
   * it won't be possible to set the initial value on the select component.
   */
  private static isValueValidInVue2(newValue: McSelectNativeOptions | string | null | undefined): boolean {
    if (!newValue) return true;

    // If Vue2 has converted the value to [object Object],
    // then it's invalid and should be rejected.
    const newValueIsObjectObject = newValue === '[object Object]';

    // In select the value is always an array, so if the newValue
    // is not an array, then it means that Vue2 didn't convert it right
    // and the newValue should be rejected.
    const newValueIsNotAnArray = !Array.isArray(newValue);
    if (newValueIsObjectObject || newValueIsNotAnArray) {
      // The new value will be rejected.
      return false;
    }

    // The new value is accepted.
    return true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-select-native': McSelectNative;
  }
}

customElements.get('mc-select-native') || customElements.define('mc-select-native', McSelectNative);
