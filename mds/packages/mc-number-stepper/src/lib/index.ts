// lit-elements
import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcNumberStepper, StepperDirection } from './types';
// mds-components used with mc-number-stepper
import { McInput } from '@maersk-global/mds-components-core-input';
import { Max, Min, Step } from '@maersk-global/mds-components-core-input/src/lib/types';

export type { IMcNumberStepper } from './types';

/**
 * Supports integers and decimals, positive and negative
 */
const DIGITS_PATTERN = '^-?[0-9]*\\.?[0-9]*$';

/**
 * @element` mc-number-stepper`
 * @extends McInput
 *
 * @slot `label` - The label HTML to use for the mc-number-stepper.
 * @slot `hint` - The hint HTML to use for the mc-number-stepper.
 * @slot `errormessage` - The errormessage HTML to use for the mc-number-stepper.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `input` - for changing visuals of input field
 */
export class McNumberStepper extends McInput implements IMcNumberStepper {
  private get maxdisabled(): boolean {
    return !!(this.disabled || (this.max && this.value && this.value !== '' && Number(this.value) >= Number(this.max)));
  }
  private get mindisabled(): boolean {
    return !!(this.disabled || (this.min && this.value && this.value !== '' && Number(this.value) <= Number(this.min)));
  }

  @property({ type: String })
  public max?: Max;

  @property({ type: String })
  public min?: Min;

  @property({ type: String })
  public minuslabel = 'minus';

  @property({ type: String })
  public pluslabel = 'plus';

  @property({ type: String })
  public step?: Step;

  public constructor() {
    super();
    this.type = 'text';
    this.inputmode = 'numeric';
    this.pattern = DIGITS_PATTERN;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('beforeinput', this.onBeforeInput);
  }

  /* styles */
  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  protected override renderPrefixElement(): TemplateResult {
    const prefixElement = super.renderPrefixElement();
    return html`${this.renderMinusButton()}${prefixElement}`;
  }

  protected override renderSuffixElement(): TemplateResult {
    const suffixElement = super.renderSuffixElement();
    return html`${suffixElement}${this.renderPlusButton()}`;
  }

  private renderMinusButton(): TemplateResult {
    return html`<mc-button
      .fit=${this.fit}
      label="${this.minuslabel}"
      hiddenlabel
      .disabled=${this.readonly}
      @click="${this.handleMinusClick}"
      ?disabled="${this.mindisabled}"
      icon="minus"
      appearance="neutral"
      variant="outlined"
      class="button button--minus"
      data-cy="minus"
    ></mc-button>`;
  }

  private renderPlusButton(): TemplateResult {
    return html`<mc-button
      .fit=${this.fit}
      label="${this.pluslabel}"
      hiddenlabel
      .disabled=${this.readonly}
      @click="${this.handlePlusClick}"
      ?disabled="${this.maxdisabled}"
      icon="plus"
      appearance="neutral"
      variant="outlined"
      class="button button--plus"
      data-cy="plus"
    ></mc-button>`;
  }

  protected onBeforeInput(event: InputEvent): void {
    if (this.inputmode === 'numeric') {
      const digitsRegex = new RegExp(DIGITS_PATTERN, 'g');

      // When backspace is pressed the event.data is null.
      if (event.data && !digitsRegex.test(event.data)) {
        event.preventDefault();
      }
    }
  }

  /**
   * When a user focuses on the input, this selects the text so that it's easier to replace the entire value
   */
  protected onInputFocus(): void {
    super.onInputFocus();
    super.select();
  }

  private handleMinusClick(): void {
    this.handleStepperClick('min');
  }
  private handlePlusClick(): void {
    this.handleStepperClick('max');
  }

  /**
   * Handles the plus and minus clicks. Yes, it's complex, but it's less overhead than having the same logic for min and max duplicated
   * @param direction min or max - direction the increment/decrement is headed in. Maps to the internal min/max property
   */
  private handleStepperClick(direction: StepperDirection): void {
    // All the same comments as in handleMinusClick apply here
    const valueChanged = Number(this.value);
    let valueToSet;
    if ((this.value || (this.value as unknown) === 0) && !Number.isNaN(valueChanged)) {
      // If the value is outside of the valid range, immediately bring it back inside the range
      if (this.min && this.min !== '' && valueChanged < Number(this.min)) {
        valueToSet = this.min; // Set to the min
      } else if (this.max && this.max !== '' && valueChanged > Number(this.max)) {
        valueToSet = this.max; // Set to the max
      } else if (this.step) {
        const precision = this.getStepPrecision();
        valueToSet =
          direction === 'min'
            ? (valueChanged - Number(this.step)).toFixed(precision)
            : (valueChanged + Number(this.step)).toFixed(precision);
      } else {
        valueToSet = direction === 'min' ? valueChanged - 1 : valueChanged + 1;
      }
    } else {
      // If there is no value, we should start the user at the minimum, or zero if there is no min
      if (this.min && this.min !== '') {
        valueToSet = this.min;
      } else {
        valueToSet = 0;
      }
    }
    // Only apply the update if it's possible based on the direction
    if (
      !this[direction] ||
      this[direction] === '' ||
      (this[direction] !== '' && direction === 'max' && Number(valueToSet) <= Number(this.max)) ||
      (direction === 'min' && Number(valueToSet) >= Number(this.min))
    ) {
      // Before we make the assignment, we need to check if the number has reached the limit in that direction
      // If it has, we should set the limit value - and not the precise version i.e. 10 not 10.0
      if (
        (direction === 'min' && this[direction] && Number(valueToSet) <= Number(this[direction])) ||
        (direction === 'max' && this[direction] && Number(valueToSet) >= Number(this[direction]))
      ) {
        valueToSet = this[direction];
      }
      if (this.inputElement) {
        this.inputElement.value = `${valueToSet}` || '';
      }
      this.handleInputChange();
      this.blur();
      this.dispatchEvent(new InputEvent('input'));
    }
  }

  private getStepPrecision(): number {
    if (!this.step) {
      return 0;
    }

    // This gets around the horror that is floating point math
    // We force the result to be the correct number of decimal places
    const stepStr = this.step.toString();

    const decimalIdx = stepStr.indexOf('.');
    return decimalIdx === -1 ? 0 : stepStr.substr(decimalIdx + 1).length;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-number-stepper': McNumberStepper;
  }
}

customElements.get('mc-number-stepper') || customElements.define('mc-number-stepper', McNumberStepper);
