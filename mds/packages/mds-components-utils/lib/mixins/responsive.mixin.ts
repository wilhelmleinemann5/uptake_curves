import { isServer } from 'lit';
import { state } from 'lit/decorators.js';
import type { Viewport } from '@maersk-global/mds-shared-types';

type Constructor<T> = new (...args: any[]) => T;

enum VIEWPORT {
  'x-small' = 640,
  'small' = 1024,
  'medium' = 1440,
  'large' = 1920,
  'x-large' = 1921,
}
export declare class IResponsive {
  /**
   * The current viewport size.
   */
  viewport?: Viewport | null;

  /**
   * Toggles the page level scrolling.
   * The purpose is to prevent the page body from scrolling when the modal is open in small viewport,
   */
  togglePageLevelScrollingInFullScreenModal: (isModalOpen: boolean) => void;
}

export const Responsive = <T extends Constructor<any>>(superClass: T): T & Constructor<IResponsive> => {
  class ResponsiveMixinClass extends superClass {
    private bodyOverflow?: string;
    private bodyPostion?: string;
    private windowScrollTop?: number;

    @state()
    protected viewport?: Viewport;

    public constructor(...args: any[]) {
      super(...args);

      if (!isServer) {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    }

    protected togglePageLevelScrollingInFullScreenModal(isModalOpen: boolean): void {
      if (this.viewport === 'small') {
        if (isModalOpen) {
          this.bodyOverflow = document.body.style.overflow;
          this.bodyPostion = document.body.style.position;
          this.windowScrollTop = document.documentElement.scrollTop;

          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          window.visualViewport?.addEventListener('resize', this.viewportResizeHandlerInFullScreenModal);
        } else {
          this.resetBodyUponClosingInFullScreenModal();
        }
      }
    }

    private resetBodyUponClosingInFullScreenModal(): void {
      document.body.style.overflow = this.bodyOverflow || '';
      document.body.style.position = this.bodyPostion || '';
      window.visualViewport?.removeEventListener('resize', this.viewportResizeHandlerInFullScreenModal);

      requestAnimationFrame(() => (document.documentElement.scrollTop = this.windowScrollTop || 0));
    }

    /**
     * This is to revert modal body being pushed by the keyboard when
     * modal is displayed upon focusing on an input,
     * or close the modal when doing window resize while the modal is open.
     */
    private viewportResizeHandlerInFullScreenModal = (): void => {
      if (this.viewport === 'small') {
        window.scrollTo(0, 0);
      } else {
        this.resetBodyUponClosingInFullScreenModal();
      }
    };

    protected disconnectedCallback(): void {
      super.disconnectedCallback();

      if (!isServer) {
        window.removeEventListener('resize', this.handleResize);
      }
    }

    private handleResize = (): void => {
      const windowInnerWidth = window.innerWidth;

      if (windowInnerWidth <= VIEWPORT['x-small']) {
        this.viewport = 'x-small';
      } else if (windowInnerWidth <= VIEWPORT['small']) {
        this.viewport = 'small';
      } else if (windowInnerWidth <= VIEWPORT['medium']) {
        this.viewport = 'medium';
      } else if (windowInnerWidth <= VIEWPORT['large']) {
        this.viewport = 'large';
      } else {
        this.viewport = 'x-large';
      }
    };
  }
  return ResponsiveMixinClass as T & Constructor<IResponsive>;
};
