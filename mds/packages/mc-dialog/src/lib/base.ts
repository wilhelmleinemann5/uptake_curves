import { LitElement, html, TemplateResult, PropertyValues, CSSResultArray } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Fit } from '@maersk-global/mds-shared-types';
import { BreakpointSizes, DialogAction, Dimension, CustomSize } from './types';
import { baseStyles } from './styles/index.styles';
import { uuid, isIOS } from '@maersk-global/mds-components-utils';
import '@maersk-global/mds-components-core-button';

const DIALOG_OPEN_STYLE_ID = `dialog-open-style-${uuid()}`;

export abstract class McDialogBase extends LitElement {
  @property({ type: Boolean, reflect: true }) public open = false;
  @property({ type: String }) public fit: Exclude<Fit, 'large'> = 'medium';
  @property({ type: String, reflect: true }) public dimension: Dimension = 'medium';
  @property({ type: String }) public width: string | BreakpointSizes = '';
  @property({ type: String }) public height: string | BreakpointSizes = '';
  @property({ type: String }) public customsize: CustomSize = '';
  @property({ type: Boolean }) public escapecloseactiondisabled = false;
  @property({ type: String }) public heading = '';
  @property({ type: String }) public body = '';
  @property({ type: Number }) public zindex = 999;
  @property({ type: Boolean }) public showclosebutton = false;
  @property({ type: Boolean }) public disablepagescroll = true;
  @property({ type: Boolean }) public closeonclickoutside = false;
  @property({ type: Boolean }) public disablestickyfooter = false;
  @property({ type: Boolean }) public nonmodal = false;
  @property({ type: Boolean }) public nopadding = false;

  @query('dialog') protected dialog!: HTMLDialogElement;

  @state() protected hasHeadingSlotContent = false;
  @state() protected hasBodySlotContent = false;
  @state() protected hasFooterSlotContent = false;

  protected _actionAttribute = 'dialogaction';
  private _savedScrollY = 0;

  public static get styles(): CSSResultArray {
    return baseStyles;
  }

  protected getClasses(): Record<string, boolean> {
    return {
      [`${this.fit}`]: true,
      [`dimension--${this.dimension}`]: true,
      'disable-page-scroll': this.disablepagescroll,
      'no-header': !this.heading && !this.hasHeadingSlotContent,
      'no-body': !this.body && !this.hasBodySlotContent,
      'no-footer': !this.hasFooterSlotContent,
      'non-modal': this.nonmodal,
      'no-padding': this.nopadding,
      'breakpoint-widths':
        (typeof this.width === 'object' || typeof this.customsize === 'object') && this.shouldApplyWidth(),
      'breakpoint-heights':
        (typeof this.height === 'object' || typeof this.customsize === 'object') && this.shouldApplyHeight(),
      'no-header-footer': !this.heading && !this.hasHeadingSlotContent && !this.hasFooterSlotContent,
    };
  }

  protected shouldApplyWidth(): boolean {
    //To be overridden by the extending class
    return true;
  }

  protected shouldApplyHeight(): boolean {
    //To be overridden by the extending class
    return true;
  }

  protected getStyles(): Record<string, string | undefined> {
    return {
      zIndex: this.zindex.toString(),
      ...this.getBreakpointStyles('width', this.customsize || this.width),
      ...this.getBreakpointStyles('height', this.customsize || this.height),
    };
  }

  protected getBreakpointStyles(property: 'width' | 'height', size: string | BreakpointSizes): Record<string, string> {
    if (typeof size === 'string') {
      if ((property === 'width' && !this.shouldApplyWidth()) || (property === 'height' && !this.shouldApplyHeight())) {
        return {};
      }
      const finalSize = size === 'auto' ? 'fit-content' : size;
      return { [property]: finalSize };
    }

    if (typeof size === 'object') {
      return Object.entries(size).reduce((styles, [breakpoint, value]) => {
        return { ...styles, [`--dialog-${property}-${breakpoint}`]: value };
      }, {});
    }

    return {};
  }

  protected render(): TemplateResult {
    return html`
      <dialog
        class="${classMap(this.getClasses())}"
        style=${styleMap(this.getStyles())}
        @click="${this.handleClick}"
        @keydown="${this.handleKeyDown}"
        part="dialog"
        data-cy="dialog"
      >
        ${this.renderHeader()} ${this.renderBody()} ${this.disablestickyfooter ? '' : this.renderFooter()}
      </dialog>
    `;
  }

  protected renderHeader(): TemplateResult {
    //h1 needs tabindex -1 to make the initial focus work on Safari.
    return html`
      <header part="header">
        <h1 tabindex="-1">
          <slot name="heading" @slotchange=${this.handleSlotChange}>${this.heading}</slot>
        </h1>
        ${this.showclosebutton ? this.renderCloseButton() : ''}
      </header>
    `;
  }

  protected renderCloseButton(): TemplateResult {
    return html`
      <mc-button
        @click="${() => this.closeWithEvents('cancel')}"
        class="close"
        label="Close"
        hiddenlabel
        appearance="neutral"
        variant="plain"
        icon="times"
        fit="${this.fit}"
        data-cy="close"
      ></mc-button>
    `;
  }

  protected renderBody(): TemplateResult {
    return html`
      <div class="body-wrapper" part="body-wrapper">
        <div class="body" part="body">
          <slot id="default-slot" class="default-slot" @slotchange=${this.handleSlotChange}></slot>
          ${this.renderBodyText()}
        </div>
        ${this.disablestickyfooter ? this.renderFooter() : ''}
      </div>
    `;
  }

  protected renderBodyText(): TemplateResult {
    if (this.body && !this.hasBodySlotContent) {
      return html`<span class="body-text">${this.body}</span>`;
    }
  }

  protected renderFooter(): TemplateResult {
    return html`
      <footer part="footer">
        <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
      </footer>
    `;
  }

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    }
  }

  private openDialog(): void {
    // Create the opening event with cancelable set to true
    const openingEvent = new CustomEvent('opening', { cancelable: true });
    this.dispatchEvent(openingEvent);

    // Check if preventDefault was called on the opening event
    if (openingEvent.defaultPrevented) {
      return;
    }

    if (this.nonmodal) {
      const shouldDisableScroll = this.disablepagescroll && this.exceedsViewportBounds();
      if (shouldDisableScroll) {
        this.injectDialogOpenStyle();
      }
      this.dialog.show();
    } else {
      if (this.disablepagescroll) {
        this.injectDialogOpenStyle();
      }
      this.dialog.showModal();
    }

    this.focusFirstElement();
    this.dispatchEvent(new CustomEvent('opened'));
  }

  private closeDialog(): void {
    this.removeDialogOpenStyle();
    this.dialog.close();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeDialogOpenStyle();
  }

  protected injectDialogOpenStyle(): void {
    if (!document.getElementById(DIALOG_OPEN_STYLE_ID)) {
      // Save scroll position first - before any DOM manipulation
      this._savedScrollY = window.scrollY;

      const style = document.createElement('style');
      style.id = DIALOG_OPEN_STYLE_ID;
      style.textContent = `html { overflow: hidden; }`;
      document.head.appendChild(style);

      // Add position: fixed to body for iOS - apply after style insertion
      if (isIOS()) {
        // Apply fixed positioning without disrupting current view
        requestAnimationFrame(() => {
          document.body.style.position = 'fixed';
          document.body.style.top = `-${this._savedScrollY}px`;
          document.body.style.width = '100%';
          document.body.style.left = '0';
        });
      }
    }
  }

  protected removeDialogOpenStyle(): void {
    const styleElement = document.getElementById(DIALOG_OPEN_STYLE_ID);
    if (styleElement) {
      document.head.removeChild(styleElement);

      // Restore scrolling for iOS
      if (isIOS()) {
        // Remove position fixed first
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.left = '';

        // Then restore scroll in next frame
        requestAnimationFrame(() => {
          window.scrollTo(0, this._savedScrollY);
        });
      }
    }
  }

  protected handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.hasAttribute(this._actionAttribute)) {
      const action = target.getAttribute(this._actionAttribute) as DialogAction;
      this.closeWithEvents(action);
    } else {
      if (this.closeonclickoutside && target.tagName === 'DIALOG') {
        this.closeWithEvents('click outside');
      }
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.escapecloseactiondisabled) {
        event.preventDefault();
        return;
      }
      this.closeWithEvents('cancel');
      this.open = false;
    }
  }

  protected closeWithEvents(action: DialogAction): void {
    // Create the closing event with cancelable set to true
    const closingEvent = new CustomEvent('closing', { detail: { action }, cancelable: true });
    this.dispatchEvent(closingEvent);

    // Check if preventDefault was called on the closing event
    if (!closingEvent.defaultPrevented) {
      // If not, proceed to close the dialog and dispatch the closed event
      this.open = false;
      this.dispatchEvent(new CustomEvent('closed', { detail: { action } }));
    }
  }

  protected focusFirstElement(): void {
    //Native autofocus gets transformed to autoFocus in the React wrapper.
    const autofocusElement =
      (this.querySelector('[autofocus]') as HTMLElement) || (this.querySelector('[autoFocus]') as HTMLElement);
    if (autofocusElement) {
      autofocusElement.focus();
      return;
    }
    const firstFocusableElement = this.dialog.querySelector('h1, [tabindex="-1"]') as HTMLElement;
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  protected handleSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const slotName = slot.name || 'default';
    const hasContent = (slot: HTMLSlotElement) => {
      const assignedNodes = slot.assignedNodes({ flatten: true });
      return assignedNodes.some((node) => {
        return (
          node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
        );
      });
    };

    switch (slotName) {
      case 'heading':
        this.hasHeadingSlotContent = hasContent(slot);
        break;
      case 'footer':
      case 'primaryAction':
      case 'secondaryAction':
        this.hasFooterSlotContent = hasContent(slot);
        break;
      default:
        this.hasBodySlotContent = hasContent(slot);
        break;
    }
  }

  protected exceedsViewportBounds(): boolean {
    return this.disablepagescroll;
  }
}
