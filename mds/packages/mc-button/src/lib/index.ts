// lit
import { CSSResultArray, html, TemplateResult, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// utils
import { setHostCssClass, attachElementInternalsPolyfill, DisabledState } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import {
  ButtonAppearance,
  AriaCurrent,
  AriaSelected,
  ButtonVariants,
  IMcButton,
  JustifyItems,
  ButtonPadding,
  ButtonBorder,
  Target,
  Type,
  Width,
} from './types';

// mds-components used with mc-button
import { McTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon';
import '@maersk-global/mds-components-core-loading-indicator';

export type { ButtonAppearance } from './types';

attachElementInternalsPolyfill();

/**
 * A customizable button component that supports various appearances, states, and interactions.
 *
 * Purpose: Trigger actions and navigate between pages
 *
 * Category: Interactive
 *
 * When to use: Form submissions, Navigation actions, Triggering events
 *
 * When not to use: Navigation links, Text formatting
 *
 * @element `mc-button`
 *
 * @event {MouseEvent} `click` - Emitted when the button is clicked.
 * @event {FocusEvent} `focus` - Emitted when the button is focused.
 * @event {FocusEvent} `blur` - Emitted when the button is blurred.
 *
 * @slot - The default slot for the `button`. Used to display custom text/icon in the middle of the button.
 * @slot `icon` - The icon HTML to use for the `button`.
 * @slot `trailingicon` - The trailing icon HTML to use for the `button`.
 * @slot `badge` - Used if you want to attach badge to the mc-button.
 *
 * @csspart `button` - for changing visuals of button
 * @csspart `icon` - for changing visuals of icon
 * @csspart `text-and-icon` - for changing visuals of text and icons container
 * @csspart `text-and-icon-labels` - for changing visuals of text
 * @csspart `text-and-icon-label` - for changing visuals of label text
 * @csspart `text-and-icon-sublabel` - for changing visuals of sublabel text
 */
export class McButton extends DisabledState(McTextAndIcon) implements IMcButton {
  private button: HTMLButtonElement | null = null;

  @property({ type: String, attribute: false })
  private get computedAriaLabel(): string {
    const labelOrIcon = this.label || this.icon;
    return this.arialabel ? this.arialabel : labelOrIcon;
  }

  @property({ type: String, attribute: false })
  public cssclass? = '';

  @property({ type: Boolean })
  public active = false;

  @property({ type: String, reflect: true })
  public appearance: ButtonAppearance = 'primary';

  @property({ type: String })
  public ariaselected: AriaSelected | undefined;

  @property({ type: String })
  public ariacurrent: AriaCurrent = 'false';

  @property({ type: String })
  public arialabel = '';

  @property({ type: String, reflect: true })
  public dialogaction?: string;

  @property({ type: String })
  public href = '';

  @property({ type: String })
  public justifyitems: JustifyItems = 'center';

  @property({ type: Boolean, reflect: true })
  public loading = false;

  @property({ type: String })
  public padding?: ButtonPadding = 'default';

  @property({ type: String })
  public border?: ButtonBorder = 'default';

  @property({ type: String })
  public rel = '';

  @property({ type: Number })
  public tabindex: number | undefined;

  @property({ type: String })
  public target: Target | undefined;

  @property({ type: String })
  public type: Type = 'button';

  @property({ type: String })
  public name?: string;

  @property({ type: String, reflect: true })
  public variant: ButtonVariants = 'filled';

  @property({ type: String, reflect: true })
  public width: Width = 'auto';

  /**
   * @deprecated The modal now handles the focus trap internally. Use `autofocus` if you want to focus an element when the modal is opened.
   */
  @property({ type: Boolean })
  public focusstartanchor = false;

  /**
   * @deprecated The modal now handles the focus trap internally.
   */
  @property({ type: Boolean })
  public focusendanchor = false;

  private _internals: ElementInternals;

  private static get formAssociated(): boolean {
    return true;
  }

  public static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  public constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /* render methods */
  protected render(): TemplateResult {
    const classes = {
      'full-width': this.width === 'full-width',
      'padding-none': this.padding === 'none',
      'padding-compact': this.padding === 'compact',
      'border-none': this.border === 'none',
      'icon-button': this.hiddenlabel,
      [`${this.fit}`]: true,
      [`${this.appearance}-${this.variant}`]: true,
      active: this.active,
      loading: this.loading,
      [`${this.cssclass}`]: this.cssclass ? true : false,
    };
    return html` <div
      role="${ifDefined(this.ariarole !== 'listitem' ? undefined : this.ariarole)}"
      class="mc-button ${classMap(classes)}"
      @click="${this.onClick}"
    >
      ${!this.disabled && this.href.length > 0 ? this.renderAnchor() : this.renderButton()}
      ${this.renderLoadingIndicator()}
    </div>`;
  }

  protected renderButton(): TemplateResult {
    if (this.hasLabelLinkSlot) {
      return html` <span
        part="button"
        class="link-button items-${this.justifyitems} ${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}"
        ?disabled="${this.disabled}"
      >
        ${this.renderTextAndIcon()}
      </span>`;
    } else {
      return html` <button
        part="button"
        class="items-${this.justifyitems} ${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}"
        ?disabled="${this.disabled}"
        aria-label="${this.computedAriaLabel}"
        aria-current="${this.ariacurrent}"
        aria-selected="${ifDefined(!this.ariaselected ? undefined : this.ariaselected)}"
        role="${ifDefined(this.ariarole === 'listitem' ? undefined : this.ariarole)}"
        tabindex="${ifDefined(this.tabindex)}"
        .type="${this.type}"
        name="${ifDefined(this.name)}"
      >
        ${this.renderTextAndIcon()}
      </button>`;
    }
  }

  protected renderAnchor(): TemplateResult {
    return html` <a
      part="button"
      class="items-${this.justifyitems} ${setHostCssClass(this.classList, ['hover', 'focus', 'active'])}"
      ?disabled="${this.disabled}"
      aria-label="${this.computedAriaLabel}"
      aria-current="${this.ariacurrent}"
      role="${ifDefined(this.ariarole === 'listitem' ? undefined : this.ariarole)}"
      href="${this.href}"
      rel="${ifDefined(this.rel === '' ? undefined : this.rel)}"
      tabindex="${ifDefined(this.tabindex)}"
      target="${ifDefined(!this.target ? undefined : this.target)}"
    >
      ${this.renderTextAndIcon()}
    </a>`;
  }

  private renderLoadingIndicator(): TemplateResult | null {
    return this.loading
      ? html`<div class="loading-icon">
          <mc-loading-indicator
            .fit="${this.fit}"
            .label="${this.label} in progress"
            hiddenlabel
            class="${setHostCssClass(this.classList, ['no-animation'])}"
          ></mc-loading-indicator>
        </div>`
      : null;
  }

  /* lifecycle methods */
  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    // For backward compatibility, remove when the `focusstartanchor` and `focusendanchor` properties are removed.
    if (_changedProperties.has('focusstartanchor')) {
      if (this.focusstartanchor) {
        this.autofocus = true;
      }
    }
  }

  public async firstUpdated(): Promise<void> {
    await this.updateComplete;
    this.initializeElements();
    this.requestUpdate();
  }

  /* events */
  private onClick(): void {
    this.handleSubmit();
  }

  /** Clicks on the inner button */
  public click(): void {
    const buttonElement = this.button;
    if (buttonElement) {
      buttonElement.click();
    }
  }

  /** Sets the focus to the button */
  public focus(options?: FocusOptions): void {
    const buttonElement = this.button;
    if (this.hasLabelLinkSlot) {
      this.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    }
    if (buttonElement) {
      buttonElement.focus(options);
    }
  }
  /** Takes focus out of the button */
  public blur(): void {
    const buttonElement = this.button;
    if (this.hasLabelLinkSlot) {
      this.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    }
    if (buttonElement) {
      buttonElement.blur();
    }
  }

  private handleSubmit(): void {
    if (this.type === 'submit') {
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      this._internals.form.dispatchEvent(submitEvent);
    }
  }

  /* selector methods */
  private initializeElements(): void {
    if (this.hasLabelLinkSlot && !this.disabled) {
      this.button = this.querySelector('a[href]');
      if (this.button) {
        this.button.addEventListener('focus', this.focus.bind(this));
        this.button.addEventListener('blur', this.blur.bind(this));
      }
    } else {
      this.button = (
        !this.disabled && this.href.length > 0
          ? this.shadowRoot?.querySelector('a[href]')
          : this.shadowRoot?.querySelector('button')
      ) as HTMLButtonElement;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-button': McButton;
  }
}

customElements.get('mc-button') || customElements.define('mc-button', McButton);
