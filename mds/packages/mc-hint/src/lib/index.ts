// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcHint, Fit } from './types';

export type { IMcHint } from './types';

/**
 * @element `mc-hint`
 *
 * @slot - The default slot for the hint message. Used to display custom text/icon
 *
 * @csspart `hint` - for changing visuals of hint
 */
export class McHint extends LitElement implements IMcHint {
  @state()
  private hasSlotHint = false;

  @queryAssignedElements({ slot: '', flatten: true })
  private hintNodes!: Array<HTMLElement>;

  @property({ type: Boolean, reflect: true })
  public visible = false;

  @property({ type: String })
  public hint?: string;

  @property({ type: String })
  public fit: Fit = 'medium';

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

    if (changedProperties.has('hint')) {
      this.updateVisible();
    }
  }

  /* render */
  public render(): TemplateResult {
    const classes = {
      visible: this.visible,
      [`${this.fit}`]: true,
    };
    return html`<slot part="hint" class="mc-hint ${classMap(classes)}" @slotchange=${this.onHintSlotChange}
      >${this.hint}</slot
    >`;
  }

  private onHintSlotChange(): void {
    this.hasSlotHint = this.hintNodes.length > 0;
    this.updateVisible();
  }

  private updateVisible(): void {
    this.visible = !!(this.hasSlotHint || (this.hint && this.hint !== ''));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-hint': McHint;
  }
}

customElements.get('mc-hint') || customElements.define('mc-hint', McHint);
