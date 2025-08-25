import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { IMcBadge, BadgeAppearance, BadgePosition, BadgeDistance, BadgeFit, BadgeVariant, BadgeDisplay } from './types';

/**
 * A component for displaying a badge with a count or status indicator.
 * Purpose: To show notifications, messages, or relevant information.
 * When to use: When you need to display a small count or status indicator.
 * When not to use: When the information is not relevant or when a larger display is needed
 * Works with components: `mc-button`, `mc-avatar`, `mc-list`, `mc-tab`, `mc-menu`, `mc-button-group-item`, `mc-segmented-control-item`, `<a>`
 *
 * @element `mc-badge`
 *
 * @csspart `badge` - for changing visuals of dot or count of the badge
 */

const _MAX = 99;
export class McBadge extends LitElement implements IMcBadge {
  @property({ type: Number }) public max?: number;
  @property({ type: String }) public appearance?: BadgeAppearance = 'error';
  @property({ type: String }) public display?: BadgeDisplay = 'pinned';
  @property({ type: String }) public fit?: BadgeFit = 'medium';
  @property({ type: String }) public label?: number | string;
  @property({ type: String }) public distance?: BadgeDistance = 'medium';
  @property({ type: String, reflect: true }) public position?: BadgePosition;
  @property({ type: String }) public variant?: BadgeVariant = 'default';

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      [`${this.appearance}`]: true,
      [`${this.position}`]: true,
      [`distance_${this.distance}`]: true,
      [`${this.variant}`]: true,
      [`${this.display}`]: true,
    };
    return html`<div class="mc-badge ${classMap(classes)}" role="status" aria-atomic="true" part="badge">
      ${this.renderLabel()}
    </div>`;
  }

  private renderLabel() {
    if (this.variant === 'dot' || this.label === undefined) {
      return html``;
    }

    const labelValue = parseInt(this.label as string, 10);

    if (!isNaN(Number(labelValue))) {
      if (this.max !== undefined) {
        if (Number(this.max) > _MAX && Number(labelValue) > _MAX) {
          return html`${_MAX}+`;
        }
        if (Number(labelValue) > Number(this.max)) {
          return html`${this.max}+`;
        }
      }
      if (Number(labelValue) > _MAX) {
        return html`${_MAX}+`;
      }
    }

    return html`${this.label}`;
  }
}
customElements.get('mc-badge') || customElements.define('mc-badge', McBadge);

declare global {
  interface HTMLElementTagNameMap {
    'mc-badge': McBadge;
  }
}
