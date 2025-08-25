import { LitElement, html, TemplateResult, CSSResultArray, isServer } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { localStore } from '@maersk-global/shared-js';

import { Responsive } from '@maersk-global/mds-components-utils';
import { styles } from './styles/index.styles';
import { McDrawer } from '@maersk-global/mds-components-core-drawer';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-drawer';
/**
 * @element `mc-side-bar`
 *
 * @slot - The default slot for the `sidebar` content. Can be used to pass links list, banners, etc.
 *
 */
export class McSideBar extends Responsive(LitElement) {
  private category = 'mds-sidebar';
  private key = 'open';
  private scrollHandler: ((this: Window, ev: Event) => void) | null = null;
  private leaveTimeout: number | null = null;

  @query('mc-drawer')
  protected mcDrawer?: McDrawer;

  @query('.mc-side-bar')
  protected mcSideBar?: HTMLElement;

  @query('mc-button')
  protected mcButton?: HTMLElement;

  @property({ type: Boolean, reflect: true })
  public open = true;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public constructor() {
    super();
    if (!isServer) {
      // Get the user side bar state from local storage
      const localState = localStore.getItem(this.key, this.category) as boolean;
      if (localState === false) {
        this.open = false;
      }
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  public disconnectedCallback(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    super.disconnectedCallback();
  }

  public render(): TemplateResult {
    const cssClasses = {
      open: this.open,
    };

    const isInteractive = this.open;

    return html` <div class="mc-side-bar-container">
      <mc-button
        icon="bars-horizontal"
        fit="small"
        appearance="neutral"
        variant="plain"
        label="Show Navigation"
        hiddenlabel
        data-cy="toggle-nav"
        @click="${this.toggleNav}"
      ></mc-button>
      <aside class="mc-side-bar ${classMap(cssClasses)}" aria-hidden="${!isInteractive}" ?inert="${!isInteractive}">
        ${this.renderSideBar()}
      </aside>
    </div>`;
  }

  private renderSideBar(): TemplateResult {
    if (this.viewport === 'x-small' || this.viewport === 'small') {
      return html`<mc-drawer nopadding position="left" customsize="300px">
        <slot></slot>
      </mc-drawer>`;
    } else {
      return html`<slot></slot>`;
    }
  }

  private toggleNav(): void {
    if (this.viewport === 'x-small' || this.viewport === 'small') {
      this.mcDrawer.open = !this.mcDrawer.open;
      this.open = this.mcDrawer.open;
    } else {
      this.open = !this.open;
      localStore.setItem(this.key, this.open, this.category);
    }
  }

  private handleScroll(): void {
    if (this.viewport !== 'x-small') return;

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (this.mcButton) {
      if (currentScroll > 20) {
        // Scrolling down
        this.mcButton.style.opacity = '0';
        this.mcButton.style.pointerEvents = 'none';
      } else {
        this.mcButton.style.opacity = '1';
        this.mcButton.style.pointerEvents = 'auto';
      }
    }
  }
}
customElements.get('mc-side-bar') || customElements.define('mc-side-bar', McSideBar);

declare global {
  interface HTMLElementTagNameMap {
    'mc-side-bar': McSideBar;
  }
}
