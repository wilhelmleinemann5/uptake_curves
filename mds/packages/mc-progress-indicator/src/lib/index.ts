import { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { IMcProgressIndicator } from './types';
import { McLoadingIndicator } from '@maersk-global/mds-components-core-loading-indicator';

/**
 * @element `mc-progress-indicator`
 */
export class McProgressIndicator extends McLoadingIndicator implements IMcProgressIndicator {
  @property({ type: Number, reflect: true }) public value = 0;
  @property({ type: Number, reflect: true }) public max = 100;
  @query('[role="progressbar"]') private progressBarElement: HTMLElement;
  @query('.progress') private progressElement: HTMLElement;

  protected get ringDash(): number {
    return 2 * Math.PI * this.ringRadius;
  }

  protected override get ringStrokeDasharray(): string {
    return `${this.ringDash}`;
  }

  protected override get ringStrokeDashoffset(): string {
    const normalizedValue = Math.min(Math.max(0, this.value), this.max);
    const percentage = normalizedValue / this.max;
    return `${this.ringDash * (1 - percentage)}`;
  }

  protected override get ringTransform(): string {
    return `rotate(-90 ${this.ringSize / 2} ${this.ringSize / 2})`;
  }

  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  public render(): TemplateResult {
    return super.render();
  }

  public updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('value') || changedProperties.has('max')) {
      if (this.progressBarElement) {
        this.progressBarElement.setAttribute('aria-valuenow', this.value.toString());
        this.progressBarElement.setAttribute('aria-valuemax', this.max.toString());
      }

      if (this.variant === 'bar' && this.progressElement) {
        const percentage = (this.value / this.max) * 100;
        this.progressElement.style.width = `${percentage}%`;
      }
    }
  }
}

customElements.get('mc-progress-indicator') || customElements.define('mc-progress-indicator', McProgressIndicator);

declare global {
  interface HTMLElementTagNameMap {
    'mc-progress-indicator': McProgressIndicator;
  }
}
