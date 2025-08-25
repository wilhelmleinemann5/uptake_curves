// lit-elements
import { CSSResultArray, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state, queryAssignedElements, query } from 'lit/decorators.js';

// utils
import { setPropsForSlottedComponents } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { Fit, IMcTabBar, Variant } from './types';

// mds-components used with mc-tab-bar
import { McTab } from '@maersk-global/mds-components-core-tab';
import '@maersk-global/mds-components-core-button';

export type { IMcTabBar } from './types';

/**
 * @element `mc-tab-bar`
 *
 * @event {CustomEvent<number>} tabchange - Emitted when the any of the tabs is selected.
 *
 * @slot `tab` - The mc-tab element to use as a tab.
 * @slot `panel` - The panel HTML to use for the corresponsing mc-tab.
 *
 * @csspart `tabs` - for changing visuals of the tab buttons container.
 * @csspart `panels` - for changing visuals of the panels container.
 */
export class McTabBar extends LitElement implements IMcTabBar {
  private transitionType: 'smooth' | 'none' = 'none';

  @state()
  private currentFocusIndex = 0;

  @queryAssignedElements({ slot: 'tab' })
  private tabs?: McTab[];

  @queryAssignedElements({ slot: 'panel' })
  private panels?: Element[];

  // overflow tabs properties:
  @query('.inner')
  private tabsBox?: HTMLDivElement;

  @query('.mc-tabs')
  private tabsHost?: HTMLDivElement;

  @query('#scroll-button-right')
  private scrollButtonRight?: HTMLButtonElement;

  @query('#scroll-button-left')
  private scrollButtonLeft?: HTMLButtonElement;

  @state()
  private renderScrollButtons = false;
  private tabsClientWidth = 0;
  private tabsScrollWidth = 0;
  private currentScrollPosition = 0;
  private tabObserver?: IntersectionObserver;
  private tabObserverEnabled = false;

  @property({ type: Number })
  public currentindex = 0;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public variant: Variant = 'default';

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.transitionType = 'none';
  }

  /* render methods */
  protected render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
    };

    const tabsClasses = {
      desktop: !this.renderScrollButtons,
    };

    const tabInnerClasses = {
      stretched: this.variant === 'stretched',
    };

    return html`
      <div class="mc-tab-bar ${classMap(classes)}">
        <div class="tabs ${classMap(tabsClasses)}" part="tabs">
          ${this.renderScrollButtonTemplate('left')}
          <div class="inner ${classMap(tabInnerClasses)}">
            <slot @slotchange=${this.handleTabSlotChange} name="tab" @disabledchange="${this.setActiveStatus}"></slot>
          </div>
          ${this.renderScrollButtonTemplate('right')}
        </div>
        <div class="panels" part="panels">
          <slot @slotchange=${this.handlePanelSlotChange} name="panel"></slot>
        </div>
      </div>
    `;
  }

  /* selector methods */
  private renderScrollButtonTemplate(scrollDirection: 'right' | 'left'): TemplateResult | null {
    return this.renderScrollButtons
      ? html`<mc-button
          appearance="neutral"
          variant="plain"
          class="scroll-button"
          arialabel="scroll ${scrollDirection}"
          id="scroll-button-${scrollDirection}"
          data-cy="scroll-button-${scrollDirection}"
          icon="chevron-${scrollDirection}"
          hiddenlabel
          disablediconslot
          disabledlabelslot
          @click=${(): void => this.handleScrollButtonClick(scrollDirection)}
        >
        </mc-button>`
      : null;
  }

  private handleScrollButtonClick(scrollDirection: 'right' | 'left'): void {
    this.transitionType = 'smooth';
    const scrollStep = 100;

    if (scrollDirection === 'left') {
      this.currentScrollPosition -= scrollStep;
    }
    if (scrollDirection === 'right') {
      this.currentScrollPosition += scrollStep;
    }

    this.scrollTabBar();
  }

  /* lifecycle methods */
  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addScrollEventListeners();

    this.initializeTabIntersectionObserver();
    this.tabObserver?.observe(this.tabsBox as Element);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('renderScrollButtons')) {
      if (this.renderScrollButtons) {
        this.initializeScrollButtons();

        for (const tab of this.tabs as Element[]) {
          this.tabObserver?.observe(tab);
        }
      } else {
        this.removeTabIntersectionObserver();
      }
    }

    if (changedProperties.has('variant')) {
      this.setTabWidths();
    }

    if (changedProperties.has('currentindex')) {
      this.setActiveStatus();
      this.scrollToCurrentIndex();
    }

    if (this.tabs) setPropsForSlottedComponents(this.tabs, 'fit', this.fit);
  }

  public disconnectedCallback(): void {
    this.removeScrollEventListeners();
    this.tabObserver && this.tabObserver.disconnect();
    this.removeTabIntersectionObserver(true);
    super.disconnectedCallback();
  }

  /* selectors & initializers */
  private initializeScrollButtons(): void {
    if (this.scrollButtonLeft) {
      this.scrollButtonLeft.disabled = true;
    }
  }

  private initializeTabElements(): void {
    this.setActiveStatus();
    if (this.tabs) {
      const tabs = this.tabs.entries();

      if (this.tabs.length !== this.panels?.length) {
        console.warn(`There is a different amount of tabs & panels`);
      }
      for (const [index, tab] of tabs) {
        const randomId = Math.floor(Math.random() * 100000000).toString();
        tab.id = `tab${randomId}`;
        tab.index = index;
        tab.width = this.variant === 'stretched' ? 'full-width' : 'auto';
        (tab as Element).setAttribute('aria-controls', `tab${randomId}-tab`);
        this.setTabActiveStatus(tab, index);
        this.setTabIndex(tab, index);
        this.addEventListeners(tab);
      }
    }
  }

  private initializePanelElements(): void {
    if (this.tabs) {
      const tabs = this.tabs.entries();

      if (this.tabs.length !== this.panels?.length) {
        console.warn(`There is a different amount of tabs & panels`);
      } else {
        for (const [index, tab] of tabs) {
          if (this.panels) {
            const panel = this.panels[index];
            this.setPanelActiveStatus(panel, index);
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('id', `${tab.id}-tab`);
            panel.setAttribute('aria-labelledby', `${tab.id}`);
          }
        }
      }
    }
  }

  private initializeTabIntersectionObserver(): void {
    this.tabObserver = new IntersectionObserver(
      (entries) => {
        entries &&
          entries.forEach((entry, entryIndex) => {
            if (entry.isIntersecting) {
              if (entry.target === this.tabsBox) {
                this.updateScroll();
              } else if (this.tabObserverEnabled) {
                const elem = entry.target as McTab & HTMLElement;
                if (elem.index) {
                  this.currentFocusIndex = elem.index;
                }

                if (entryIndex === entries.length - 1) {
                  this.setTabIndexes();
                }
              }
            }
          });
      },
      {
        root: this.tabsHost,
        rootMargin: '0px',
        threshold: 0.75,
      },
    );
  }

  /* elements setters for active tab */
  private setCurrentActiveStatus(): void {
    if (this.tabs) {
      for (const [index, tab] of this.tabs.entries()) {
        this.setTabActiveStatus(tab, index);
        if (this.panels) {
          this.setPanelActiveStatus(this.panels[index], index);
        }
      }
    }
  }

  private setTabWidths(): void {
    if (this.tabs) {
      for (const [, tab] of this.tabs.entries()) {
        tab.width = this.variant === 'stretched' ? 'full-width' : 'auto';
      }
    }
  }

  private setTabActiveStatus(tab: McTab, index: number): void {
    tab.active = this.currentindex === index;
  }

  private setPanelActiveStatus(panel: Element, index: number): void {
    if (!panel) {
      return;
    }
    if (panel.hasAttribute('selected')) {
      panel.removeAttribute('selected');
    }

    if (this.currentindex === index) {
      panel.setAttribute('selected', 'true');
    }
  }

  private setActiveStatus(): void {
    this.currentFocusIndex = this.currentindex;
    if (this.tabs) {
      const tabs = this.tabs.entries();
      if (tabs) {
        for (const [index, tab] of tabs) {
          this.setTabActiveStatus(tab, index);
          this.setTabIndex(tab, index);
          if (this.panels) {
            this.setPanelActiveStatus(this.panels[index], index);
          }
        }
      }
    }
  }

  private setTabIndexes(setFocus?: boolean): void {
    if (this.tabs) {
      const tabs = this.tabs.entries();

      for (const [index, tab] of tabs) {
        if (setFocus) {
          if (this.currentFocusIndex === index) {
            tab.focus();
          } else {
            tab.blur();
          }
        }
        this.setTabIndex(tab, index);
      }
    }
  }

  private setTabIndex(tab: McTab, tabIndex: number): void {
    tab.tabindex = this.currentFocusIndex === tabIndex ? 0 : -1;
  }

  /* event handlers */
  private handleTabClick(event: Event): void {
    const parent = (event.target as HTMLElement).closest('mc-tab');
    this.currentFocusIndex = (parent as McTab).index;
    this.handleCurrentIndexChanged();
  }

  private handleTabKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && (e.target as HTMLElement).nodeName.toLowerCase() === 'a') {
      return;
    }
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowUp':
      case ' ':
      case 'Enter':
      case 'Home':
      case 'End':
        e.preventDefault();
    }
  }

  private handleTabKeyUp(e: KeyboardEvent): void {
    switch (e.code) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.focusOnNextFocusableTab();
        this.setTabIndexes(true);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.focusOnPriorFocusableTab();
        this.setTabIndexes(true);
        break;
      case 'Home':
        this.focusOnFirstFocusableTab();
        this.setTabIndexes(true);
        break;
      case 'End':
        this.focusOnLastFocusableTab();
        this.setTabIndexes(true);
        break;
      case 'Space':
      case 'Enter':
        this.handleCurrentIndexChanged();
        break;
    }
  }

  private focusOnNextFocusableTab(): void {
    if (this.tabs) {
      const tabsLength = this.tabs.length;
      let nextFocusIndex = this.currentFocusIndex;

      do {
        nextFocusIndex++;

        if (nextFocusIndex > tabsLength - 1) {
          nextFocusIndex = 0;
        }
      } while (this.tabs[nextFocusIndex].disabled && nextFocusIndex !== this.currentFocusIndex);

      this.currentFocusIndex = nextFocusIndex;
    }
  }

  private focusOnPriorFocusableTab(): void {
    if (this.tabs) {
      const tabsLength = this.tabs.length;
      let priorFocusIndex = this.currentFocusIndex;

      do {
        priorFocusIndex--;

        if (priorFocusIndex < 0) {
          priorFocusIndex = tabsLength - 1;
        }
      } while (this.tabs[priorFocusIndex].disabled && priorFocusIndex !== this.currentFocusIndex);

      this.currentFocusIndex = priorFocusIndex;
    }
  }

  private focusOnLastFocusableTab(): void {
    if (this.tabs) {
      const tabsLength = this.tabs.length;
      let lastFocusableTabIndex = tabsLength - 1;
      while (lastFocusableTabIndex !== 0 && this.tabs[lastFocusableTabIndex].disabled) {
        lastFocusableTabIndex--;
      }
      this.currentFocusIndex = lastFocusableTabIndex;
    }
  }

  private focusOnFirstFocusableTab(): void {
    if (this.tabs) {
      const tabsLength = this.tabs.length;
      let firstFocusableTabIndex = 0;
      while (firstFocusableTabIndex !== tabsLength - 1 && this.tabs[firstFocusableTabIndex].disabled) {
        firstFocusableTabIndex++;
      }
      this.currentFocusIndex = firstFocusableTabIndex;
    }
  }

  private handleCurrentIndexChanged(): void {
    this.currentindex = this.currentFocusIndex;
    this.setCurrentActiveStatus();
    this.setTabIndexes(true);
    this.dispatchEvent(new CustomEvent<number>('tabchange', { detail: this.currentindex }));
  }

  private handleTabSlotChange(): void {
    this.initializeTabElements();
  }

  private handlePanelSlotChange(): void {
    this.initializePanelElements();
  }

  /* events listeners */
  private addEventListeners(tab): void {
    if (!tab.haseventlisteners) {
      tab.addEventListener('click', this.handleTabClick.bind(this));
      tab.addEventListener('keydown', this.handleTabKeyDown.bind(this));
      tab.addEventListener('keyup', this.handleTabKeyUp.bind(this));
      tab.haseventlisteners = true;
    }
  }

  private addScrollEventListeners(): void {
    window.addEventListener('resize', this.updateScroll.bind(this));
  }

  private removeScrollEventListeners(): void {
    window.removeEventListener('resize', this.updateScroll.bind(this));
  }

  private removeTabIntersectionObserver(removeObserverOfTabsBox?: boolean): void {
    if (this.tabObserver && this.tabs) {
      if (removeObserverOfTabsBox) {
        this.tabObserver.unobserve(this.tabsBox as Element);
      }

      for (const tab of this.tabs) {
        this.tabObserver.unobserve(tab as Element);
      }
    }
  }

  private scrollToCurrentIndex(): void {
    requestAnimationFrame(() => {
      if (this.tabs && this.tabsBox) {
        this.currentScrollPosition =
          !this.currentindex || !this.tabs[this.currentindex]
            ? 0
            : this.tabs[this.currentindex].offsetLeft - this.tabs[0].offsetLeft;
        this.scrollTabBar();
      }
    });
  }

  private scrollTabBar(): void {
    if (this.tabsBox) {
      this.tabsClientWidth = this.tabsBox.clientWidth;
    }
    this.tabObserverEnabled = true;
    // enable scroll buttons
    if (this.scrollButtonLeft) {
      this.scrollButtonLeft.disabled = false;
    }

    if (this.scrollButtonRight) {
      this.scrollButtonRight.disabled = false;
    }

    // max and min scroll
    const scrollMin = 0;
    const scrollMax = this.tabsScrollWidth - this.tabsClientWidth;

    if (this.currentScrollPosition <= scrollMin) {
      if (this.scrollButtonLeft) {
        this.scrollButtonLeft.disabled = true;
      }

      this.currentScrollPosition = scrollMin;
    }

    if (this.currentScrollPosition > scrollMax) {
      if (this.scrollButtonRight) {
        this.scrollButtonRight.disabled = true;
      }
      this.currentScrollPosition = scrollMax;
    }

    window.requestAnimationFrame(() => {
      this.tabsBox?.scrollTo({
        left: this.currentScrollPosition,
        ...(this.transitionType === 'none' ? {} : { behavior: this.transitionType }),
      });
    });
  }

  private updateScroll(): void {
    requestAnimationFrame(() => {
      if (this.tabsBox) {
        this.tabsScrollWidth = this.tabsBox.scrollWidth;
        this.renderScrollButtons = this.tabsScrollWidth > this.tabsBox.offsetWidth;
        this.scrollToCurrentIndex();
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-tab-bar': McTabBar;
  }
}

customElements.get('mc-tab-bar') || customElements.define('mc-tab-bar', McTabBar);
