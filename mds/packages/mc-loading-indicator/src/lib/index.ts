// lit-elements
import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcLoadingIndicator, Fit, LoadingIndicatorAppearance, Variant, Orientation } from './types';

export type { IMcLoadingIndicator, LoadingIndicatorAppearance } from './types';

/**
 * @element `mc-loading-indicator`
 */
export class McLoadingIndicator extends LitElement implements IMcLoadingIndicator {
  @property({ type: String })
  public appearance: LoadingIndicatorAppearance = 'primary';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @property({ type: String })
  public label = 'Loading';

  @property({ type: String })
  public variant: Variant = 'ring';

  @property({ type: String })
  public orientation: Orientation = 'vertical';

  protected get ringSize(): number {
    if (this.fit === 'small') return 20;
    if (this.fit === 'large') return 28;
    return 24;
  }

  protected get ringRadius(): number {
    if (this.fit === 'small') return 8;
    if (this.fit === 'large') return 12;
    return 10;
  }

  protected get ringDash(): number {
    if (this.fit === 'small') return 8;
    if (this.fit === 'large') return 12;
    return 10;
  }

  protected get ringStrokeDasharray(): string {
    return `${this.ringDash} 100`;
  }

  protected get ringStrokeDashoffset(): string {
    return '0';
  }

  protected get ringTransform(): string {
    return undefined;
  }

  public static get styles(): CSSResultArray {
    return styles;
  }

  protected render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      ring: this.variant === 'ring' || this.variant === 'spinner',
      bar: this.variant === 'bar',
      [`${this.orientation}`]: true,
      primary: this.appearance === 'primary' || this.appearance === 'default',
      'neutral-inverse': this.appearance === 'neutral-inverse' || this.appearance === 'inverse',
    };
    return html` <div
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="1"
      aria-label="${this.label}"
      class="mc-loading-indicator ${classMap(classes)}"
    >
      ${this.variant === 'ring' || this.variant === 'spinner' ? this.renderRing() : this.renderBar()}
      ${this.renderText()}
    </div>`;
  }

  protected renderText(): TemplateResult | null {
    return this.hiddenlabel ? null : html` <div class="label">${this.label}</div>`;
  }

  protected renderRing(): TemplateResult {
    return html` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.ringSize} ${this.ringSize}">
      <circle
        class="track"
        fill="none"
        part="track"
        cx="${this.ringSize / 2}"
        cy="${this.ringSize / 2}"
        r="${this.ringRadius}"
      ></circle>
      <circle
        class="progress"
        fill="none"
        part="progress"
        cx="${this.ringSize / 2}"
        cy="${this.ringSize / 2}"
        r="${this.ringRadius}"
        stroke-dasharray="${this.ringStrokeDasharray}"
        stroke-dashoffset="${this.ringStrokeDashoffset}"
        transform=${ifDefined(this.ringTransform) ? this.ringTransform : undefined}
      ></circle>
    </svg>`;
  }
  protected renderBar(): TemplateResult {
    return html`<div class="wrapper">
      <div class="track"></div>
      <div class="progress"></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-loading-indicator': McLoadingIndicator;
  }
}

customElements.get('mc-loading-indicator') || customElements.define('mc-loading-indicator', McLoadingIndicator);
