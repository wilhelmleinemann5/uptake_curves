// lit-elements
import { CSSResultArray, LitElement, PropertyValues, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, Orientation } from '@maersk-global/mds-shared-types';
import { IMcStepIndicator } from './types';
import { State } from '@maersk-global/mds-components-core-step-indicator-item/src/lib/types';
// mds-components used with mc-step-indicator
import '@maersk-global/mds-components-core-step-indicator-item';
import { McStepIndicatorItem } from '@maersk-global/mds-components-core-step-indicator-item';

export type { IMcStepIndicator } from './types';

/**
 * @element `mc-step-indicator`
 *
 * @slot - The default slot where you can pass single step items
 */
export class McStepIndicator extends LitElement implements IMcStepIndicator {
  @state()
  private stepIndicatorItems?: McStepIndicatorItem[];

  @queryAssignedElements({ slot: '', flatten: true })
  private slottedElements?: HTMLElement[];

  @property({ type: Boolean, attribute: true, reflect: true })
  public autolayoutdisabled = false;

  @property({ type: Boolean })
  public alignitemsdisabled = false;

  @property({ type: Number })
  public currentindex = 0;

  @property({ type: String, attribute: true, reflect: true })
  public fit: Fit = 'medium';

  @property({ type: Array })
  public labels: Array<string> = [];

  @property({ type: String, attribute: true, reflect: true })
  public orientation: Orientation = 'horizontal';

  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render */
  protected render(): TemplateResult {
    const classes = {
      [`${this.orientation}`]: true,
    };
    return html`<ol role="list" class="mc-step-indicator ${classMap(classes)}" aria-label="steps progress indicator">
      ${this.renderSteps()}
    </ol>`;
  }

  private renderSteps(): TemplateResult[] | TemplateResult {
    return html`<slot @slotchange=${this.initializeLabels}>
      ${this.labels &&
      this.labels.map((label, index) => {
        return html`
          <mc-step-indicator-item
            ?autolayoutdisabled=${this.autolayoutdisabled}
            ?alignitemsdisabled=${this.alignitemsdisabled && (index === 0 || index === this.labels.length - 1)}
            orientation=${this.orientation}
            fit=${this.fit}
            state=${this.getStateName(index)}
            label=${label}
          >
          </mc-step-indicator-item>
        `;
      })}
    </slot>`;
  }

  /* lifecycle methods */
  protected async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    this.initializeLabels();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this.updateLabelsProps(changedProperties);
  }

  /* selector methods */
  private initializeLabels = (): void => {
    if (this.slottedElements) {
      this.stepIndicatorItems = this.getOnlyStepIndicatorItems();
      this.updateLabelsProps();
    }
  };

  private getOnlyStepIndicatorItems(): McStepIndicatorItem[] {
    return this.slottedElements?.filter((el) => this.isStepIndicatorItem(el)) as McStepIndicatorItem[];
  }

  private isStepIndicatorItem(item: HTMLElement): boolean {
    return item.tagName?.toLowerCase() === 'mc-step-indicator-item';
  }

  /* utils */
  private updateLabelsProps = (changedProperties?: PropertyValues): void => {
    if (
      this.stepIndicatorItems &&
      (!changedProperties ||
        changedProperties.get('autolayoutdisabled') ||
        changedProperties.get('fit') ||
        changedProperties.get('orientation'))
    ) {
      for (const step of this.stepIndicatorItems) {
        step.autolayoutdisabled = this.autolayoutdisabled;
        step.fit = this.fit;
        step.orientation = this.orientation;
      }
    }
  };

  private getStateName(index: number): State {
    const current = index === this.currentindex;
    const completed = index < this.currentindex;

    return current ? 'current' : completed ? 'completed' : 'pending';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-step-indicator': McStepIndicator;
  }
}

customElements.get('mc-step-indicator') || customElements.define('mc-step-indicator', McStepIndicator);
