import { CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './styles/index.styles';
import { IMcDrawer, Position } from './types';
import { McDialogBase } from '@maersk-global/mds-components-core-dialog';
import { PropertyValues } from 'lit';
/**
 * @element `mc-drawer`
 *
 * @event {CustomEvent<Mcdialogaction>} closed -  The closed event gets dispatched once the drawer is closed.
 * @event {CustomEvent<Mcdialogaction>} closing - The closing event gets dispatched once the drawer is closing.
 * @event {CustomEvent} opened -  The opened event gets dispatched once the drawer is opened.
 * @event {CustomEvent} opening - The opening event gets dispatched once the drawer is opening.
 * @event {MouseEvent} click - The click event gets dispatched when clicked on the dialogaction button within a drawer.
 *
 * @slot `default` - The body HTML to use for the drawer.
 * @slot `heading` - Used for the heading of the drawer.
 * @slot `footer` - Used for the footer of the drawer. Often contains the close button.
 *
 * @csspart `dialog` - for changing the whole dialog element
 * @csspart `header` - for changing the header element
 * @csspart `body-wrapper` - for changing the body wrapper
 * @csspart `footer` - for changing the footer element
 */
export class McDrawer extends McDialogBase implements IMcDrawer {
  @property({ type: String }) public position: Position = 'right';
  @property({ type: Boolean }) public backdropcloseactiondisabled = false;
  private resizeObserver: ResizeObserver | null = null;

  public static get styles(): CSSResultArray {
    return [...super.styles, styles];
  }

  protected getClasses(): Record<string, boolean> {
    return {
      ...super.getClasses(),
      [`${this.position}`]: true,
    };
  }

  public constructor() {
    super();
    this.showclosebutton = true;
    this.closeonclickoutside = true;
  }

  protected override shouldApplyWidth(): boolean {
    return this.position === 'left' || this.position === 'right';
  }

  protected override shouldApplyHeight(): boolean {
    return this.position === 'top' || this.position === 'bottom';
  }

  protected override exceedsViewportBounds(): boolean {
    if (this.position === 'left' || this.position === 'right') {
      const drawerWidth = this.dialog.offsetWidth;
      const viewportWidth = window.innerWidth;
      return drawerWidth >= viewportWidth - 30;
    }
    if (this.position === 'top' || this.position === 'bottom') {
      const drawerHeight = this.dialog.offsetHeight;
      const viewportHeight = window.innerHeight;
      return drawerHeight >= viewportHeight - 30;
    }
    return false;
  }

  private setupResizeObserver(): void {
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.open) return;

        // Only check dimensions for non-modal drawers
        if (this.nonmodal) {
          const shouldDisableScroll = this.exceedsViewportBounds();
          if (shouldDisableScroll) {
            this.injectDialogOpenStyle();
          } else {
            this.removeDialogOpenStyle();
          }
        }
      });
      this.resizeObserver.observe(this.dialog);
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.setupResizeObserver();
      } else {
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
      }
    }
  }

  public willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('backdropcloseactiondisabled')) {
      this.closeonclickoutside = !this.backdropcloseactiondisabled;
    }
  }

  // Set up variables for tracking touch events
  private touchStartX = 0;
  private touchEndX = 0;
  private touchStartY = 0;
  private touchEndY = 0;
  // Minimum swipe distance (in pixels) to trigger the drawer toggle
  private readonly minSwipeDistance = 50;

  private handleTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  private handleTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeDistanceX = this.touchEndX - this.touchStartX;
    const swipeDistanceY = this.touchEndY - this.touchStartY;

    if (Math.abs(swipeDistanceX) < this.minSwipeDistance && Math.abs(swipeDistanceY) < this.minSwipeDistance) {
      // Swipe distance too small, do nothing
      return;
    }

    switch (this.position) {
      case 'left':
        if (swipeDistanceX > this.minSwipeDistance && !this.open) {
          this.open = true;
        } else if (swipeDistanceX < -this.minSwipeDistance && this.open) {
          this.open = false;
        }
        break;
      case 'right':
        if (swipeDistanceX < -this.minSwipeDistance && !this.open) {
          this.open = true;
        } else if (swipeDistanceX > this.minSwipeDistance && this.open) {
          this.open = false;
        }
        break;
      case 'top':
        if (swipeDistanceY > this.minSwipeDistance && !this.open) {
          this.open = true;
        } else if (swipeDistanceY < -this.minSwipeDistance && this.open) {
          this.open = false;
        }
        break;
      case 'bottom':
        if (swipeDistanceY < -this.minSwipeDistance && !this.open) {
          this.open = true;
        } else if (swipeDistanceY > this.minSwipeDistance && this.open) {
          this.open = false;
        }
        break;
    }
  }

  // Add touch event listeners to the document
  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    document.removeEventListener('touchstart', this.handleTouchStart.bind(this), false);
    document.removeEventListener('touchend', this.handleTouchEnd.bind(this), false);
  }
}
customElements.get('mc-drawer') || customElements.define('mc-drawer', McDrawer);

declare global {
  interface HTMLElementTagNameMap {
    'mc-drawer': McDrawer;
  }
}
