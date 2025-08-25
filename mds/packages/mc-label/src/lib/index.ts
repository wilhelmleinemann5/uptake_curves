// lit
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, IMcLabel, LabelPosition } from './types';

export type { IMcLabel } from './types';

/**
 * @element `mc-label`
 *
 * @slot - The default slot for the label text. Used to display custom text/icon
 *
 * @csspart `label` - for changing visuals of label
 */
export class McLabel extends LitElement implements IMcLabel {
  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public label = 'Label';

  @property({ type: String })
  public labelposition: LabelPosition = 'top';

  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render */
  protected render(): TemplateResult {
    return html`<slot part="label" class="mc-label ${this.fit} ${this.labelposition}">${this.label}</slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-label': McLabel;
  }
}

customElements.get('mc-label') || customElements.define('mc-label', McLabel);
