// lit-elements
import { LitElement, CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';

// utils
import { FormField, setHostCssClass, DisabledState } from '@maersk-global/mds-components-utils';
// styles
import { inputStyles } from '@maersk-global/mds-components-core-input';
import { styles } from './styles/index.styles';
// types
import { Fit, IMcTextarea, LabelPosition } from './types';
// mds-components used with mc-textarea
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-label';

export type { IMcTextarea } from './types';

/**
 * @element `mc-textarea`
 *
 * @event {InputEvent} input - Fired when the character is entered.
 * @event {FocusEvent} focus - Fired when mc-input is focused.
 * @event {FocusEvent} blur - Fired when mc-input is going out of focus.
 * @event {MouseEvent} click - Fired on mc-textarea click.
 * @event {KeyboardEvent} keydown - Fired when a key on keydown is pressed.
 *
 * @csspart `textarea` - for changing visuals of textarea
 * @csspart `field` - for changing visuals of field container
 *
 * @slot `label` - The label HTML to use for the mc-textarea.
 * @slot `hint` - The hint HTML to use for the mc-textarea.
 * @slot `errormessage` - The errormessage HTML to use for the mc-textarea.
 */
export class McTextarea extends DisabledState(FormField(LitElement)) implements IMcTextarea {
  private charCounter = false;
  @query('textarea')
  private textarea?: HTMLTextAreaElement;

  protected controlType = 'textarea';
  protected focused = false;

  @property({ type: Boolean, reflect: true })
  public autofocus = false;

  @property({ type: Number })
  public cols = 20;

  @property({ type: String })
  public errormessage = '';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public hint = '';

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

  @property({ type: Number })
  public maxlength? = -1;

  @property({ type: Number })
  public minlength = -1;

  @property({ type: String, reflect: true })
  public name = '';

  @property({ type: String })
  public placeholder = '';

  @property({ type: Boolean })
  public readonly = false;

  @property({ type: Boolean, reflect: true })
  public required = false;

  @property({ type: Number })
  public rows = 2;

  @property({ type: String, reflect: true })
  public value?: string | null;

  @property({ type: String })
  public width = 'auto';

  /* styles */
  public static get styles(): CSSResultArray {
    return [inputStyles, styles];
  }

  /* render methods */
  public render(): TemplateResult {
    if (this.maxlength && this.maxlength !== -1) {
      this.charCounter = true;
    } else {
      this.maxlength = undefined;
      this.charCounter = false;
    }
    const shouldRenderCharCounter = this.charCounter && this.maxlength !== -1;
    const classes = {
      [`${this.fit}`]: true,
      [`${this.labelposition}`]: true,
    };
    return html` <div class="mc-input ${classMap(classes)}">
      ${this.renderLabel()}
      <div class="container ${classMap(classes)}">
        <div class="inner">
          <div
            class="field ${this.disabled ? 'disabled' : null}"
            part="field"
            style="${this.width === 'auto' ? '' : `width:${this.width}%`}"
          >
            ${this.renderInput()}
          </div>
        </div>
        <div class="footer">
          <div>${this.renderError()} ${this.renderHint()}</div>
          ${this.renderCharCounter(shouldRenderCharCounter)}
        </div>
      </div>
    </div>`;
  }

  protected renderInput(): TemplateResult | string {
    const minOrUndef = this.minlength === -1 ? undefined : this.minlength;
    const maxOrUndef = this.maxlength === -1 ? undefined : this.maxlength;
    return html` <textarea
      part="textarea"
      aria-labelledby="label"
      aria-describedby="hint"
      class="input ${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}"
      .value="${this.value || ''}"
      rows="${this.rows}"
      cols="${this.cols}"
      ?autofocus="${this.autofocus}"
      ?disabled="${this.disabled}"
      ?invalid="${this.invalid}"
      id="${this.inputId}"
      aria-invalid="${ifDefined(this.invalid ? this.invalid : undefined)}"
      placeholder="${this.placeholder}"
      ?required="${this.required}"
      ?readonly="${this.readonly}"
      minlength="${ifDefined(minOrUndef)}"
      maxlength="${ifDefined(maxOrUndef)}"
      name="${ifDefined(this.name === '' ? undefined : this.name)}"
      @input="${this.handleInputChange}"
      @blur="${this.onInputBlur}"
    >
    </textarea>`;
  }

  protected renderLabel(): TemplateResult {
    return html`<label class="${this.hiddenlabel ? 'hiddenlabel' : ''}" for=${this.inputId}
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

  protected renderCharCounter(shouldRenderCharCounter: boolean): TemplateResult | null {
    if (!this.maxlength) return null;

    const length = Math.min(this.value ? this.value.length : 0, this.maxlength);
    return !shouldRenderCharCounter
      ? null
      : html` <span class="character-counter" data-cy="character-counter"
          >${length}&nbsp;/&nbsp;${this.maxlength}</span
        >`;
  }

  /* event handlers */
  public focus(): void {
    const focusEvt = new FocusEvent('focus');
    this.textarea?.dispatchEvent(focusEvt);
    this.textarea?.focus();
  }

  protected onInputFocus(): void {
    this.focused = true;
  }

  public blur(): void {
    const blurEvt = new FocusEvent('blur');
    this.textarea?.dispatchEvent(blurEvt);
    this.textarea?.blur();
  }

  protected onInputBlur(): void {
    this.focused = false;
  }

  protected handleInputChange(): void {
    if (this.textarea) {
      this.value = this.textarea.value;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-textarea': McTextarea;
  }
}

customElements.get('mc-textarea') || customElements.define('mc-textarea', McTextarea);
