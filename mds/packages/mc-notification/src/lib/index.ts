// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
// styles
import { styles } from './styles/index.styles';
// types
import { ActionsPosition, NotificationAppearance, Fit, IMcNotification, Link, VerticalAlign } from './types';
import { injectNotificationGlobalCss, styleInjected } from './utils';
// mds-components used with mc-notification
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-button';

export type { IMcNotification } from './types';

/**
 * @element `mc-notification`
 *
 * @event {CustomEvent} close - Emitted when close icon is clicked.
 *
 * @slot The body HTML to use for the notification text.
 * @slot `actions` - The actions HTML to use for the notification.
 * @slot `icon` - The actions HTML to use for the notification.
 *
 * @csspart `notification` - for changing visuals of wrapper container
 * @csspart `icon` - for changing visuals of icon
 *
 */
export class McNotification extends LitElement implements IMcNotification {
  @state()
  private hasSlotIcon = false;

  @property({ type: Array })
  public actions?: Array<Link>;

  @property({ type: String })
  public appearance: NotificationAppearance = 'neutral-weak';

  @property({ type: String })
  public body?: string;

  @property({ type: Boolean })
  public closable = false;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public heading?: string;

  @property({ type: String })
  public icon?: string;

  @property({ type: String })
  public verticalalign?: VerticalAlign = 'top';

  @property({ type: String })
  public actionsposition?: ActionsPosition = 'bottom';

  @property({ type: String })
  public width = 'auto';

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private iconSlotElements!: Array<HTMLElement>;

  public static get styles(): CSSResultArray {
    return styles;
  }

  /* lifecycle methods */
  public connectedCallback(): void {
    super.connectedCallback();
    if (!styleInjected) {
      injectNotificationGlobalCss();
    }
  }

  protected render(): TemplateResult {
    const classes = {
      [`${this.appearance}`]: true,
      'neutral-default': this.appearance === 'neutral-default',
      'neutral-weak':
        this.appearance === 'neutral-weak' || this.appearance === 'neutral-subtle' || this.appearance === 'neutral',
      'neutral-inverse': this.appearance === 'neutral-inverse',
      info: this.appearance === 'info',
      error: this.appearance === 'error',
      warning: this.appearance === 'warning',
      success: this.appearance === 'success',
      primary: this.appearance === 'primary',
      secondary: this.appearance === 'secondary',
      [`${this.fit}`]: true,
      [`${this.verticalalign}`]: true,
    };
    return html`
      <div
        class="mc-notification ${classMap(classes)}"
        style="${this.width ? `width: ${this.width}` : ''}"
        part="notification"
      >
        ${this.renderIcon()}
        <div class="content">
          ${this.renderHeading()} ${this.renderBody()} ${this.actionsposition !== 'right' ? this.renderActions() : ''}
        </div>
        ${this.actionsposition === 'right' ? this.renderActions() : ''} ${this.renderCloseButton()}
      </div>
    `;
  }

  private renderHeading(): TemplateResult | null {
    return this.heading ? html`<div class="heading" role="heading" aria-level="6">${this.heading}</div>` : null;
  }

  private renderBody(): TemplateResult {
    return html`<div class="body">${this.body}<slot></slot></div>`;
  }

  private renderActions(): TemplateResult {
    const links =
      this.actions && this.actions.length > 0
        ? this.actions.map(
            (d: Link) =>
              html`<a href="${d.url}" target="${d.target ? d.target : '_self'}" rel="${d.rel ? d.rel : ''}">
                ${d.label}
              </a>`
          )
        : null;
    return html`<slot class="actions" name="actions">${links}</slot>`;
  }

  protected renderIcon(): TemplateResult {
    const iconClassInfo = {
      icon: this.hasIcon(),
      hidden: !this.hasIcon(),
    };
    return html` <span class=${classMap(iconClassInfo)}
      >${this.icon
        ? html`<mc-icon exportparts="icon" icon=${this.icon} size=${this.fit === 'large' ? '24' : '20'}></mc-icon>`
        : null}
      <slot name="icon" @slotchange=${this.onIconSlotChange}></slot>
    </span>`;
  }

  private renderCloseButton(): TemplateResult | null {
    return this.closable
      ? html` <mc-button
          label="Close"
          data-cy="close-button"
          appearance="neutral"
          variant="plain"
          icon="times"
          hiddenlabel
          fit="${this.fit}"
          appearance="${this.appearance === 'neutral-inverse' ? 'inverse' : 'neutral'}"
          width="auto"
          padding="none"
          disablediconslot
          disabledlabelslot
          @click="${this.handleClose}"
        ></mc-button>`
      : null;
  }

  public handleClose(): void {
    this.dispatchEvent(new CustomEvent('close'));
    this.remove();
  }

  // checks for icon
  protected hasIcon(): boolean {
    return (this.icon && this.icon.length > 0) || this.hasSlotIcon;
  }

  private onIconSlotChange(): void {
    this.hasSlotIcon = this.iconSlotElements.length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-notification': McNotification;
  }
}

customElements.get('mc-notification') || customElements.define('mc-notification', McNotification);
