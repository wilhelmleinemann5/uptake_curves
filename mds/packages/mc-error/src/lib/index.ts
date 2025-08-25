// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcError, Fit } from './types';

export type { IMcError } from './types';

/**
 * @element `mc-error`
 *
 * @slot - The default slot for the error message. Used to display custom text/icon
 *
 * @csspart `error` - for changing visuals of error
 */
export class McError extends LitElement implements IMcError {
  @state()
  private hasSlotError = false;

  @queryAssignedElements({ slot: '', flatten: true })
  private errorNodes!: Array<HTMLElement>;

  @property({ type: Boolean, reflect: true })
  public visible = false;

  @property({ type: String })
  public errormessage?: string;

  @property({ type: Boolean })
  public invalid?: boolean = false;

  @property({ type: String })
  public fit?: Fit = 'medium';

  public static get styles(): CSSResultArray {
    return styles;
  }

  public async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(changedProperties);
    await this.updateComplete;

    this.updateVisible();
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('errormessage') || changedProperties.has('invalid')) {
      this.updateVisible();
    }
  }

  /* render */
  public render(): TemplateResult {
    const classes = {
      visible: this.visible,
      invalid: !!this.invalid,
      [`${this.fit}`]: true,
    };
    return html`<slot part="error" class="mc-error ${classMap(classes)}" @slotchange=${this.onErrorSlotChange}
      >${this.errormessage}</slot
    >`;
  }

  private onErrorSlotChange(): void {
    this.hasSlotError = this.errorNodes.length > 0;
    this.updateVisible();
  }

  private updateVisible(): void {
    this.visible = !!(this.hasSlotError || (this.errormessage && this.errormessage !== ''));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-error': McError;
  }
}

customElements.get('mc-error') || customElements.define('mc-error', McError);
