// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { property, queryAssignedNodes, state } from 'lit/decorators.js';
import { animate } from 'animejs';
// styles
import { styles } from './styles/index.styles';

// types
import { IMcToast, Fit, Position, ToastAppearance, Width, McClosableComponent } from './types';
import { toastContainer, mediaQuery, injectToastGlobalCss, styleInjected } from './utils';

// mds-components-core
import '@maersk-global/mds-components-core-notification';

export type { IMcToast } from './types';

/**
 * @element `mc-toast`
 *
 * @event {CustomEvent<string>} close - Emitted when the toast is closed.
 *
 * @slot The HTML content of the mc-toast.
 * @slot `trigger` - The trigger element which triggers the toast.
 */
export class McToast extends LitElement implements IMcToast {
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private start = 0;
  private remaining = 0;
  private animeDuration = mediaQuery?.matches ? 0 : 250;
  private mcClosableComponent: McClosableComponent | null = null;
  private mcClosableComponentCloned = false;
  private allowedClosableComponents: string[] = ['mc-notification'];

  @state()
  private closeEventDispatched = false;

  @queryAssignedNodes({ slot: '', flatten: true })
  private content!: Array<Node>;

  @queryAssignedNodes({ slot: 'trigger', flatten: true })
  private trigger?: Array<HTMLElement>;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public appearance: ToastAppearance = 'neutral-default';

  @property({ type: String })
  public position: Position = 'top-right';

  @property({ type: String })
  public width: Width = 'auto';

  @property({ type: Number })
  public duration = 5000;

  @property({ type: Boolean, reflect: true })
  public open = false;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public render(): TemplateResult {
    return html`<div class="mc-toast">
      <slot name="trigger" @slotchange=${this.onTriggerSlotChange}></slot>
      <slot class="content" @slotchange=${this.onSlotChange}></slot>
    </div>`;
  }

  /* lifecycle methods */
  public connectedCallback(): void {
    super.connectedCallback();
    if (!styleInjected) {
      injectToastGlobalCss();
    }
  }

  protected willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('open') && typeof changedProperties.get('open') !== 'undefined') {
      if (this.open) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  /* event handlers */
  private onTriggerSlotChange(): void {
    if (this.trigger && this.trigger.length > 0) {
      this.trigger[0].addEventListener('click', () => this.show());
    }
  }

  private onSlotChange(): void {
    if (this.open && this.timerId === null) {
      this.show();
    }
    if (!this.content) {
      console.warn(
        `Could not set a content element. Toast needs a closable element in a default slot to function properly`,
      );
      return;
    }
  }

  /* public events to show and hide toast */
  public show(): void {
    this.remaining = this.duration;
    this.createToastContainer();
    if (this.mcClosableComponent) {
      this.attachEventsToClosableComponent();
      this.animation('in');
      this.resume();
    }
  }

  public hide(): void {
    if (this.mcClosableComponent) {
      this.dispatchCloseEvent();
      this.animation('out', () => {
        this.destroyToastContainer();
        this.pause();
      });
    }
  }

  /* functions for pause, resume and animate toast once it's visible */
  private pause(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.remaining -= Date.now() - this.start;
    }
  }

  private resume(): void {
    if (this.timerId) {
      return;
    }
    this.start = Date.now();
    this.timerId = setTimeout(() => {
      this.hide();
    }, this.remaining);
  }

  private animation(type: string, callback?: () => void): void {
    animate(this.mcClosableComponent, {
      opacity: type === 'in' ? [0, 1] : 0,
      scale: type === 'in' ? [0.5, 1] : 0.8,
      duration: this.animeDuration,
      easing: 'easeInOutExpo',
      complete: () => {
        if (callback) callback();
      },
    });
  }

  /* internal event handlers */
  private dispatchCloseEvent(): void {
    if (!this.closeEventDispatched) {
      this.dispatchEvent(new CustomEvent<string>('close', { detail: 'Close' }));
      this.closeEventDispatched = true;
    }
  }

  private attachEventsToClosableComponent(): void {
    this.closeEventDispatched = false;
    this.mcClosableComponent?.addEventListener('focus', () => this.pause());
    this.mcClosableComponent?.addEventListener('mouseover', () => this.pause());
    this.mcClosableComponent?.addEventListener('blur', () => this.resume());
    this.mcClosableComponent?.addEventListener('mouseout', () => this.resume());
    this.mcClosableComponent?.addEventListener('close', () => this.hide());
  }

  /* container DOM methods */
  private createToastContainer(): void {
    if (toastContainer[this.position]?.parentElement === null) {
      toastContainer[this.position].classList.add(`${this.fit}`);
      if (this.width) {
        toastContainer[this.position].style.width = `${this.width}px`;
      }
      document.body.append(toastContainer[this.position]);
    }
    if (!this.mcClosableComponentCloned) {
      this.mcClosableComponent = this.content.filter((node) =>
        this.allowedClosableComponents.find((e) => e === node.nodeName.toLowerCase()),
      )[0] as McClosableComponent;

      if (this.mcClosableComponent) {
        this.cloneClosableComponent();
      }
    }
  }

  private containerInDom(): boolean {
    return toastContainer[this.position] instanceof Element && document.body.contains(toastContainer[this.position]);
  }

  private destroyToastContainer(): void {
    this.open = false;
    this.mcClosableComponentCloned = false;
    if (this.containerInDom()) {
      if (this.mcClosableComponent?.parentNode && toastContainer[this.position].hasChildNodes()) {
        toastContainer[this.position].removeChild(this.mcClosableComponent as Node);
        this.appendChild(this.mcClosableComponent);
        this.mcClosableComponent = null;
      }
      if (toastContainer[this.position].children.length === 0) {
        toastContainer[this.position].remove();
      }
    }
  }

  private cloneClosableComponent(): void {
    if (this.mcClosableComponent) {
      this.mcClosableComponent.closable = true;
      this.mcClosableComponent.fit = this.fit;
      this.mcClosableComponent.appearance = this.appearance;
      this.mcClosableComponent.handleClose = (): void => this.hide();
      if (this.containerInDom()) {
        toastContainer[this.position].appendChild(this.mcClosableComponent as Node);
      }
      this.mcClosableComponentCloned = true;
    }
  }
}
customElements.get('mc-toast') || customElements.define('mc-toast', McToast);
