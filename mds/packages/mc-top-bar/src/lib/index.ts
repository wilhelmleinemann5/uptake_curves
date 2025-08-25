import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styles } from './styles/index.styles';
import type { IMcTopBar, Target } from './types';

/**
 * @element `mc-top-bar`
 *
 * @slot `default` - Slot where you can drop your mega menu, search bar, or any other component if needed.
 * @slot `actions` - Slot where you can drop your extra icons with actions.
 * @slot `link` - Slot where you can drop a router link to the home page in a SPA application.
 *
 */
export class McTopBar extends LitElement implements IMcTopBar {
  @property({ type: String }) public product = '';
  @property({ type: String }) public productshort = '';
  @property({ type: String }) public href = '';
  @property({ type: String }) public rel = '';
  @property({ type: String }) public target: Target | undefined;

  private productNameCharactersLimit = 40;
  private productShortNameCharactersLimit = 10;

  @queryAssignedElements({ slot: '', flatten: true })
  private defaultSlot!: Array<HTMLElement>;

  @state()
  private hasDefaultSlot = false;

  @queryAssignedElements({ slot: 'actions', flatten: true })
  private actionsSlot!: Array<HTMLElement>;

  @state()
  private hasActionsSlot = false;

  private get productName(): string {
    return this.product || this.productshort;
  }

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    const classes = {
      'with-product-name': this.productName,
    };
    return html`<header role="banner" class="mc-top-bar ${classMap(classes)}">
      ${this.renderLogoAndProduct()}
      <div class="${this.hasDefaultSlot ? 'content' : ''}">
        <slot @slotchange=${this.onDefaultSlotChange}></slot>
      </div>
      <div class="${this.hasActionsSlot ? 'actions' : ''}">
        <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
      </div>
    </header>`;
  }

  private renderLogoAndProduct(): TemplateResult {
    return this.href
      ? html`<a
          class="logo-and-product"
          aria-label="Go to home"
          href="${this.href}"
          rel="${ifDefined(this.rel === '' ? undefined : this.rel)}"
          target="${ifDefined(!this.target ? undefined : this.target)}"
          ><div class="logo"></div>
          ${this.renderProducts()}</a
        >`
      : html`<div class="logo-and-product">
          <slot name="link"></slot>
          <div class="logo"></div>
          ${this.renderProducts()}
        </div>`;
  }

  private renderProducts(): TemplateResult | null {
    if (this.productName) {
      const trimmedProductName =
        this.productName.length > this.productNameCharactersLimit
          ? this.productName.slice(0, this.productNameCharactersLimit) + '...'
          : this.productName;
      const productShortName = this.productshort || this.product;
      const trimmedProductShortName =
        productShortName.length > this.productShortNameCharactersLimit
          ? productShortName.slice(0, this.productShortNameCharactersLimit) + '...'
          : productShortName;
      return html`<div class="product">${trimmedProductName}</div>
        <div class="product-mobile">${trimmedProductShortName}</div>`;
    }
    return null;
  }

  private onDefaultSlotChange(): void {
    this.hasDefaultSlot = this.defaultSlot.length > 0;
  }

  private onActionsSlotChange(): void {
    this.hasActionsSlot = this.actionsSlot.length > 0;
  }
}
customElements.get('mc-top-bar') || customElements.define('mc-top-bar', McTopBar);

declare global {
  interface HTMLElementTagNameMap {
    'mc-top-bar': McTopBar;
  }
}
