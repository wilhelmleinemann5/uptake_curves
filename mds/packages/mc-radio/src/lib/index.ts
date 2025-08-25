// lit-elements
import { CSSResultArray, LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// utils
import {
  SingleSelectionController,
  FormField,
  setHostCssClass,
  DisabledState,
} from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, IMcRadio } from './types';
// mds-components used with mc-radio
import '@maersk-global/mds-components-core-label';

export type { IMcRadio } from './types';

/**
 * @element `mc-radio`
 *
 * @event {MouseEvent} click - Fired when mc-radio is clicked.
 * @event {CustomEvent<boolean>} change - Fired when mc-radio in checked/unckecked.
 * @event {FocusEvent} focus - Fired when mc-radio is focused.
 * @event {FocusEvent} blur - Fired when mc-radio is going out of focus.
 *
 * @slot `label` - The label HTML to use for the mc-radio.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `checkmark` - for changing visuals of checkmark
 *
 */
export class McRadio extends DisabledState(FormField(LitElement)) implements IMcRadio {
  private _selectionController?: SingleSelectionController | null;
  private _checked = false;

  protected controlType = 'radio';
  protected focused = false;

  @query('input')
  public input?: HTMLInputElement | null;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public label = 'Label';

  @property({ type: Number })
  public tabindex = 0;

  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Gets the state of the radio.
   * @returns {boolean}
   */
  @property({ type: Boolean, reflect: true })
  public get checked(): boolean {
    return this._checked;
  }
  public set checked(isChecked: boolean) {
    const oldValue = this._checked;
    if (isChecked === oldValue) {
      return;
    }
    this._checked = isChecked;

    if (this.input) {
      this.input.checked = isChecked;
    }

    this._selectionController?.update(this);

    if (isChecked === false) {
      this.input?.blur();
    }

    this.requestUpdate('checked', oldValue);
    this.dispatchChangeIfChecked();
  }

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render methods */
  protected render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      disabled: this.disabled,
      [`${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}`]: true,
    };
    return html` <label part="label-container" class="mc-radio ${classMap(classes)}" @click=${this.preventClick}>
      <input
        tabindex="${this.tabindex}"
        type="radio"
        aria-labelledby="label"
        name="${ifDefined(this.name || undefined)}"
        data-cy="radio"
        .checked="${this.checked}"
        .value="${this.value}"
        ?disabled="${this.disabled}"
        @change="${this.changeHandler}"
        @click="${this.onInputClick}"
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input=${this.handleInput}
      />
      <div part="checkmark" class="checkmark">
        <div class="bullet"></div>
      </div>
      <mc-label exportparts="label" id="label" .label=${this.label} .fit=${this.fit} ?hiddenlabel=${this.hiddenlabel}
        ><slot name="label">${this.label}</slot></mc-label
      ></label
    >`;
  }

  public firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.registerSingleSelectionController();
  }

  public disconnectedCallback(): void {
    this.unregisterSingleSelectionController();
    super.disconnectedCallback();
  }

  /* event handlers */
  private handleInput(event: InputEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  public focus(): void {
    const focusEvt = new FocusEvent('focus');
    this.input?.dispatchEvent(focusEvt);
    this.input?.focus();
  }

  protected onInputFocus(): void {
    this.focused = true;
  }

  public blur(): void {
    const blurEvt = new FocusEvent('blur');
    this.input?.dispatchEvent(blurEvt);
    this.input?.blur();
  }

  protected onInputBlur(): void {
    this.focused = false;
    this.input?.blur();
  }

  public click(): void {
    const clickEvt = new MouseEvent('click');
    this.input?.dispatchEvent(clickEvt);
    this.input?.click();
  }

  private preventClick(event: PointerEvent): void {
    if (event.target === this.input) {
      return;
    }

    event.stopPropagation();
  }

  private onInputClick(): void {
    // Firefox has weird behavior with radios if they are not focused
    this.input?.focus();
  }

  public changeHandler(): void {
    this.checked = !!this.input?.checked;
  }

  private registerSingleSelectionController(): void {
    this._selectionController = SingleSelectionController.getController(this);
    this._selectionController?.register(this);
    this._selectionController?.update(this);
  }

  private unregisterSingleSelectionController(): void {
    if (this._selectionController) {
      this._selectionController.unregister(this);
      this._selectionController = undefined;
    }
  }

  private dispatchChangeIfChecked(): void {
    if (this.input && this.checked) {
      this.input.dispatchEvent(
        new CustomEvent<boolean>('change', { bubbles: true, composed: true, detail: this.checked }),
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-radio': McRadio;
  }
}

customElements.get('mc-radio') || customElements.define('mc-radio', McRadio);
