// lit-elements
import { html, TemplateResult, CSSResultArray, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// utils
import { setHostCssClass, DisabledState } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import { Fit, IMcTab } from './types';
import { Width } from '@maersk-global/mds-components-core-button/src/lib/types';
// mds-components used with mc-tab
import { McButton } from '@maersk-global/mds-components-core-button';

export type { IMcTab } from './types';

/**
 * @element `mc-tab`
 *
 * @event {CustomEvent} disabledchange - Fired when disabled status of a tab changes.
 *
 * @slot - The default slot where main label goes.
 * @slot `prefix` - The prefix HTML to use for the mc-tab.
 * @slot `suffix` - The suffix HTML to use for the mc-tab.
 * @slot `badge` - Used if you want to attach badge to the mc-avatar.
 *
 * @csspart `button` - for changing visuals of button.
 */
export class McTab extends DisabledState(LitElement) implements IMcTab {
  private button?: McButton | null = null;

  public index?: number;

  public haseventlisteners = false;

  @property({ type: String, attribute: false })
  public id = 'tab';

  @property({ type: String })
  public label?: string;

  @property({ type: String })
  public icon = '';

  @property({ type: String })
  public trailingicon = '';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean, reflect: true })
  public active = false;

  @property({ type: Number })
  public tabindex?: number;

  @property({ type: String, reflect: true })
  public width: Width = 'auto';

  public static get styles(): CSSResultArray {
    return styles;
  }

  public focus(): void {
    this.button?.focus();
  }

  public blur(): void {
    this.button?.blur();
  }

  /* render */
  protected render(): TemplateResult {
    return html`<div role="tablist">
      <mc-button
        exportparts="button, text-and-icon"
        arialabel="${this.label}"
        ariaselected="${this.active}"
        ariarole="tab"
        class="mc-tab ${setHostCssClass(this.classList, ['hover', 'focus'])} ${this.fit}"
        ?disabled="${this.disabled}"
        fit="${this.fit}"
        icon="${ifDefined(this.icon === '' ? undefined : this.icon)}"
        trailingicon="${ifDefined(this.trailingicon === '' ? undefined : this.trailingicon)}"
        id="${this.id}"
        .tabindex="${this.tabindex}"
        appearance="neutral"
        variant="plain"
        .width="${this.width}"
      >
        <slot></slot>
        <div class="slots-container">
          <slot name="prefix"></slot>
          ${this.label}
          <slot name="suffix"></slot>
        </div>
        <slot slot="badge" name="badge"></slot>
      </mc-button>
    </div>`;
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.initializeElements();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      this.dispatchEvent(new CustomEvent('disabledchange', { detail: this.disabled, bubbles: true }));
    }
  }

  /* selector methods */
  private initializeElements(): void {
    if (this.shadowRoot) {
      this.button = this.shadowRoot.querySelector<McButton>('mc-button');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-tab': McTab;
  }
}

customElements.get('mc-tab') || customElements.define('mc-tab', McTab);
