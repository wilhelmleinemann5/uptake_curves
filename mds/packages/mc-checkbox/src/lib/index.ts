// lit-elements
import { CSSResultArray, LitElement, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// utils
import { renderSvg, FormField, setHostCssClass, DisabledState, Checkable } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcCheckbox, Fit, AriaRoles } from './types';
// mds-components used with mc-checkbox
import '@maersk-global/mds-components-core-label';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-error';

export type { IMcCheckbox } from './types';

/**
 * @element `mc-checkbox`
 *
 * @event {MouseEvent} click - Fired when mc-checkbox is clicked.
 * @event {CustomEvent<boolean>} change - Fired when mc-checkbox in checked/unckecked.
 * @event {FocusEvent} focus - Fired when mc-checkbox is focused.
 * @event {FocusEvent} blur - Fired when mc-checkbox is going out of focus.
 *
 * @slot `label` - The label HTML to use for the mc-checkbox.
 * @slot `hint` - The hint HTML to use for the mc-checkbox.
 * @slot `errormessage` - The errormessage HTML to use for the mc-checkbox.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `checkmark` - for changing visuals of checkmark
 *
 */
export class McCheckbox extends DisabledState(Checkable(FormField(LitElement))) implements IMcCheckbox {
  @query('input')
  private input?: HTMLInputElement;

  protected controlType = 'checkbox';
  protected focused = false;

  @property({ type: String })
  public ariarole: AriaRoles | undefined;

  @property({ type: String })
  public errormessage?: string;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public hint?: string;

  @property({ type: String, attribute: false })
  public icon?: string;

  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  @property({ type: Boolean, reflect: true })
  public invalid = false;

  @property({ type: String })
  public label = 'Label';

  @property({ type: Number })
  public tabindex?: number;

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render methods */
  protected render(): TemplateResult {
    return html`${this.renderCheckbox()}
      <mc-error id="invalid" .errormessage=${this.errormessage} .fit=${this.fit} ?invalid=${this.invalid}
        ><slot name="errormessage">${this.errormessage}</slot></mc-error
      >
      <mc-hint id="hint" .hint=${this.hint} .fit=${this.fit}><slot name="hint">${this.hint}</slot></mc-hint> `;
  }

  private renderCheckbox(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      disabled: this.disabled,
      [`${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}`]: true,
    };

    return html`<label
      part="label-container"
      class="mc-checkbox  ${classMap(classes)} "
      @click=${this.stopPropagationOfClick}
    >
      <input
        aria-labelledby="label"
        aria-describedby="hint"
        ?invalid="${this.invalid}"
        aria-invalid="${ifDefined(this.invalid ? this.invalid : undefined)}"
        role="${ifDefined(this.ariarole)}"
        type="checkbox"
        name="${ifDefined(this.name)}"
        ?disabled="${this.disabled}"
        .indeterminate="${this.indeterminate}"
        .checked=${this.checked}
        ?checked=${this.checked}
        value="${ifDefined(this.value)}"
        tabindex="${ifDefined(this.tabindex)}"
        @change="${this.handleChange}"
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input=${this.handleInput}
        data-cy="checkbox"
      />
      <div
        part="checkmark"
        class="checkmark"
        data-cy="checkmark"
        @click=${(e: PointerEvent): void => e.stopPropagation()}
      >
        ${this.renderCheckmark()}
      </div>
      <mc-label exportparts="label" .label=${this.label} .fit=${this.fit} ?hiddenlabel=${this.hiddenlabel}
        ><slot name="label">${this.label}</slot></mc-label
      >
    </label>`;
  }

  private renderCheckmark(): TemplateResult {
    switch (this.fit) {
      case 'small':
        if (this.indeterminate) {
          return renderSvg('<path d="M0 1H8" stroke-width="2" />', 8, 2);
        }
        return renderSvg(
          '<path d="M1.5 5.5L4.92615 8.92615C4.96641 8.96641 5.0321 8.96498 5.07057 8.92301L10.5 3" stroke-width="2" />',
          12,
          12,
        );
      case 'large':
        if (this.indeterminate) {
          return renderSvg('<path d="M0 1H12" stroke-width="2" />', 12, 2);
        }
        return renderSvg(
          '<path d="M3.5 9.5L8.92765 13.9408C8.96837 13.9741 9.02795 13.9702 9.06393 13.9318L16.5 6" stroke-width="2" />',
          20,
          20,
        );
      default:
        if (this.indeterminate) {
          return renderSvg('<path d="M0 1H10" stroke-width="2" />', 10, 2);
        }
        return renderSvg(
          '<path d="M2.5 7.5L6.92687 11.435C6.96751 11.4711 7.02958 11.4681 7.06658 11.4283L13.5 4.5" stroke-width="2" />',
          16,
          16,
        );
    }
  }

  /* event handlers */
  private handleInput(event: InputEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private handleChange(): void {
    this.checked = !!this.input?.checked;
    this.updateValue();
    this.indeterminate = !!this.input?.indeterminate;
    this.dispatchEvent(new CustomEvent<boolean>('change', { bubbles: true, composed: true, detail: this.checked }));
  }

  /** Focuses the checkbox. */
  public click(): void {
    this.input?.focus();
  }

  /** Sets focus */
  public focus(options?: FocusOptions): void {
    const focusEvt = new FocusEvent('focus');
    this.input?.dispatchEvent(focusEvt);
    this.input?.focus(options);
  }

  protected onInputFocus(): void {
    this.focused = true;
  }

  /** Sets focus out */
  public blur(): void {
    const blurEvt = new FocusEvent('blur');
    this.input?.dispatchEvent(blurEvt);
    this.input?.blur();
  }

  protected onInputBlur(): void {
    this.focused = false;
    this.input?.blur();
  }

  private stopPropagationOfClick(event: PointerEvent): void {
    if (event.target === this.input) {
      return;
    }

    event.stopPropagation();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-checkbox': McCheckbox;
  }
}

customElements.get('mc-checkbox') || customElements.define('mc-checkbox', McCheckbox);
