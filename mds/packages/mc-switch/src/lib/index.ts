// lit-elements
import { CSSResultArray, LitElement, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query } from 'lit/decorators.js';
// utils
import { FormField, setHostCssClass, DisabledState, Checkable } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, IMcSwitch } from './types';
// mds-components used with mc-switch
import '@maersk-global/mds-components-core-label';

export type { IMcSwitch } from './types';

/**
 * @element `mc-switch`
 *
 * @event {MouseEvent} click - Fired when mc-switch is clicked.
 * @event {CustomEvent<boolean>} change - Fired when mc-switch in checked/unckecked.
 * @event {FocusEvent} focus - Fired when mc-switch is focused.
 * @event {FocusEvent} blur - Fired when mc-switch is going out of focus.
 *
 * @slot `label` - The label HTML to use for the mc-switch.
 *
 * @csspart `label-container` - for changing visuals of label container
 * @csspart `label` - for changing visuals of label
 * @csspart `checkmark` - for changing visuals of checkmark
 *
 */
export class McSwitch extends DisabledState(Checkable(FormField(LitElement))) implements IMcSwitch {
  @query('button')
  private button?: HTMLButtonElement | null;

  protected controlType = 'switch';
  protected focused = false;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public label = 'Label';

  @property({ type: String, reflect: true })
  public name = '';

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render methods */
  protected render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
    };
    return html`<label
      part="label-container"
      class="mc-switch ${classMap(classes)}"
      @click=${this.stopPropagationOfClick}
      ><mc-label exportparts="label" id="label" .label=${this.label} .fit=${this.fit} ?hiddenlabel=${this.hiddenlabel}
        ><slot name="label">${this.label}</slot></mc-label
      >
      ${this.renderSwitch()}
    </label>`;
  }

  private renderSwitch(): TemplateResult {
    const classes = {
      disabled: this.disabled,
      [`${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}`]: true,
    };

    return html`
      <button
        part="checkmark"
        class="track ${classMap(classes)}"
        type="button"
        role="switch"
        aria-checked="${this.checked}"
        aria-labelledby="label"
        .disabled=${this.disabled}
        @click=${this.handleClick}
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
      >
        <div class="track-handle"></div>
      </button>
      <input
        type="checkbox"
        aria-hidden="true"
        name="${this.name}"
        .checked=${this.checked}
        .value=${this.value || ''}
        ?disabled=${this.disabled}
        @input=${this.handleInput}
      />
    `;
  }

  /* event handlers */
  private handleInput(event: InputEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private stopPropagationOfClick(event: PointerEvent): void {
    if (event.target === this.button) {
      return;
    }

    event.stopPropagation();
  }

  public handleClick(): void {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.updateValue();
    this.dispatchEvent(new CustomEvent<boolean>('change', { bubbles: true, detail: this.checked }));
  }

  /**
   * Sets focus
   */
  public focus(): void {
    const focusEvt = new FocusEvent('focus');
    this.button?.dispatchEvent(focusEvt);
    this.button?.focus();
  }

  protected onInputFocus(): void {
    this.focused = true;
  }

  /**
   * Sets focus out
   */
  public blur(): void {
    const blurEvt = new FocusEvent('blur');
    this.button?.dispatchEvent(blurEvt);
    this.button?.blur();
  }

  protected onInputBlur(): void {
    this.focused = false;
    this.button?.blur();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-switch': McSwitch;
  }
}

customElements.get('mc-switch') || customElements.define('mc-switch', McSwitch);
