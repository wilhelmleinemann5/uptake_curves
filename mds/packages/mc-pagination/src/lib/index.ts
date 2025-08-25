// lit-elements
import { LitElement, html, TemplateResult, PropertyValues, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// styles
import { styles } from './styles/index.styles';
// types
import { IMcPagination, Fit, NavButtonType, EllipsisVisibility } from './types';
// mds-components used with mc-pagination
import { McButton } from '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-button';

export type { IMcPagination } from './types';

/**
 * @element `mc-pagination`
 *
 * @slot - The default slot for the router links
 *
 * @event {CustomEvent<number>} `pagechange` - Emitted when the page is changed.
 */
export class McPagination extends LitElement implements IMcPagination {
  private _currentPage = 1;
  private _totalpages = -1;
  private _linkElements: Array<HTMLElement> = [];

  @state()
  private currentFocusIndex?: number;

  @state()
  private hasLinkSlot = false;

  @queryAssignedElements({ slot: '', flatten: true })
  private linkSlotElements!: Array<HTMLElement>;

  @property({ type: String })
  public arialabel = 'Navigate pages';

  public set currentpage(value: number) {
    const oldValue = this._currentPage;
    if (isNaN(value)) {
      console.warn('currentpage must be a number.');
      return;
    }
    this._currentPage = Math.ceil(value) || 1;
    this.requestUpdate('currentpage', oldValue);

    this.dispatchEvent(
      new CustomEvent('pagechange', {
        detail: this.currentpage,
      }),
    );
  }

  @property({ type: Number, reflect: true })
  public get currentpage(): number {
    return this._currentPage;
  }

  @property({ type: Boolean })
  public disabledtruncation = false;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public hiddenlabels = false;

  @property({ type: String })
  public nextlabel = 'Next';

  @property({ type: String })
  public previouslabel = 'Previous';

  @property({ type: Number })
  public visiblepages = 10;

  @property({ type: Number })
  public set totalpages(pagesAmount: number) {
    const oldValue = this._totalpages;
    if (isNaN(pagesAmount)) {
      console.warn('totalpages must be a number.');
      return;
    }
    this._totalpages = Math.ceil(pagesAmount) || 0;
    this.requestUpdate('totalpages', oldValue);
  }

  public get totalpages(): number {
    return this._totalpages;
  }

  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render methods */
  protected render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
    };
    return html`
      <nav role="navigation" aria-label="${this.arialabel}" class="mc-pagination ${classMap(classes)}">
        <ul>
          ${this.renderNavButton('prev')} ${this.renderNavList()} ${this.renderNavButton('next')}
        </ul>
      </nav>
      <slot @slotchange=${this.onLinkSlotChange}></slot>
    `;
  }

  protected renderNavButton(type: NavButtonType): TemplateResult {
    const buttonlabel = type === 'prev' ? this.previouslabel : this.nextlabel;
    const disabled =
      (type === 'prev' ? this.currentpage === 1 : this.currentpage === this.totalpages) || this.totalpages < 1;

    return html`<li>
      <mc-button
        data-cy=${type}
        ?disabled="${disabled}"
        ?hiddenlabel="${this.hiddenlabels}"
        label="${buttonlabel}"
        @click="${(): void => this.handleNavButtonClick(type === 'prev' ? 'prev' : 'next')}"
        appearance="neutral"
        variant="plain"
        fit="${this.fit}"
        icon="${ifDefined(type === 'prev' ? 'chevron-left' : undefined)}"
        trailingicon="${ifDefined(type === 'next' ? 'chevron-right' : undefined)}"
        id="pagination-button-${type === 'prev' ? 0 : this.totalpages + 1}"
        disablediconslot
        disabledlabelslot
      ></mc-button>
    </li>`;
  }

  protected renderNavList(): Array<TemplateResult> {
    const incorrectValues = [this.totalpages < 1, this.visiblepages < 1, !this.totalpages];
    if (incorrectValues.some(Boolean)) {
      return [];
    }

    if (this.totalpages === 1) {
      return this.buildPageButtons([1]);
    }

    if (this.visiblepages === 1) {
      return this.buildPageButtons([this.currentpage]);
    }

    const ellipsisVisibility = this.calculateElipsisVisibilty((this.visiblepages - 1) / 2);

    if (!ellipsisVisibility.left && ellipsisVisibility.right) {
      const middlePages = this.range(2, this.visiblepages - 2);
      const middlePagesLastItem = middlePages[middlePages.length - 1];

      return this.disabledtruncation
        ? [
            ...this.buildPageButtons([middlePages[0] - 1, ...middlePages]),
            ...this.buildPageButtons([middlePagesLastItem + 1, middlePagesLastItem + 2]),
          ]
        : [
            ...this.buildPageButtons([1, ...middlePages]),
            this.buildEllipsis(),
            ...this.buildPageButtons([this.totalpages]),
          ];
    }

    if (ellipsisVisibility.left && ellipsisVisibility.right) {
      const offset = Math.floor(this.visiblepages / 2) - 1;
      const middlePages = this.range(this.currentpage - offset + 1, this.currentpage + offset - 1);
      const middlePagesFirstItem = middlePages[0];
      const middlePagesLastItem = middlePages[middlePages.length - 1];

      return this.disabledtruncation
        ? [
            ...this.buildPageButtons([middlePagesFirstItem - 2, middlePagesFirstItem - 1, ...middlePages]),
            ...this.buildPageButtons([middlePagesLastItem + 1, middlePagesLastItem + 2]),
          ]
        : [
            ...this.buildPageButtons([1]),
            this.buildEllipsis(),
            ...this.buildPageButtons(middlePages),
            this.buildEllipsis(),
            ...this.buildPageButtons([this.totalpages]),
          ];
    }

    if (ellipsisVisibility.left && !ellipsisVisibility.right) {
      const startPage = this.totalpages - (this.visiblepages - 3);
      const startPages = this.range(startPage, this.totalpages - 1);
      const startPagesFirstItem = startPages[0];

      return this.disabledtruncation
        ? [
            ...this.buildPageButtons([startPagesFirstItem - 2, startPagesFirstItem - 1]),
            ...this.buildPageButtons([...startPages, this.totalpages]),
          ]
        : [
            ...this.buildPageButtons([1]),
            this.buildEllipsis(),
            ...this.buildPageButtons([...startPages, this.totalpages]),
          ];
    }

    const middlePages = this.range(2, this.totalpages - 1);
    return [...this.buildPageButtons([1, ...middlePages, this.totalpages])];
  }

  private calculateElipsisVisibilty(halfMaxPages: number): EllipsisVisibility {
    return this.totalpages > this.visiblepages
      ? {
          left: this.currentpage > this.visiblepages - halfMaxPages,
          right: this.currentpage < this.totalpages - halfMaxPages,
        }
      : {
          left: false,
          right: false,
        };
  }

  private buildEllipsis(): TemplateResult {
    return html` <li>
      <span class="ellipsis" role="img" aria-label="ellipsis">...</span>
    </li>`;
  }

  private buildPageButtons(pages: Array<number>): Array<TemplateResult> {
    return pages.map((page) => this.buildPageButton(page));
  }

  private buildPageButton(page: number): TemplateResult {
    const isCurrentPage = this.currentpage === page;
    const liClasses = { active: isCurrentPage };
    return html`
      <li class="${classMap(liClasses)}">
        <mc-button
          @click="${(): void => this.handlePageButtonClick(Number(page))}"
          .label="${page.toString()}"
          ariacurrent="${isCurrentPage}"
          arialabel="${isCurrentPage ? `Current Page, Page ${page}` : `Go to Page ${page}`}"
          data-cy="page-button"
          fit="${this.fit}"
          id="pagination-button-${page}"
          appearance="${isCurrentPage ? 'primary' : 'neutral'}"
          variant="${isCurrentPage ? 'filled' : 'plain'}"
          disablediconslot
          >${this.hasLinkSlot && this._linkElements.length > 0 ? this._linkElements[page - 1] : null}</mc-button
        >
      </li>
    `;
  }

  /* lifecycle methods */
  public firstUpdated(): void {
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('keyup', this.handleKeyUp);
  }

  public disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('keyup', this.handleKeyDown);
    super.disconnectedCallback();
  }

  public updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentFocusIndex')) {
      const elementToFocus: McButton | null | undefined = this.shadowRoot?.querySelector(
        `mc-button#pagination-button-${this.currentFocusIndex}`,
      );
      elementToFocus?.focus();
    }
  }

  /* event handlers */
  private handleNavButtonClick(type: NavButtonType): void {
    if (!this.isChangingPagePossible(type)) return;

    this.currentpage = type === 'prev' ? this.currentpage - 1 : this.currentpage + 1;
    this.currentFocusIndex = type === 'prev' ? 0 : this.totalpages + 1;
  }

  private isChangingPagePossible(type: NavButtonType): boolean {
    return (type === 'prev' && this.currentpage !== 1) || (type === 'next' && this.currentpage !== this.totalpages);
  }

  private handlePageButtonClick(page: number): void {
    this.currentFocusIndex = page;
    if (this.currentpage === page) return;
    this.currentpage = page;
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (e.code === 'Space' || e.code === 'Enter') {
      const focusedButton: McButton | null | undefined = this.shadowRoot?.querySelector(':focus');

      if (focusedButton) {
        focusedButton.click();
      }
    }
  }

  /* util methods */
  private range(start: number, end: number): Array<number> {
    const range = [];

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }

  // checks for links in default slot
  private onLinkSlotChange(): void {
    if (this.linkSlotElements.length > 0) {
      this.hasLinkSlot = this.linkSlotElements[0].nodeName.toLocaleLowerCase() === 'a';
      if (this.hasLinkSlot && this._linkElements.length === 0) {
        this._linkElements = this.linkSlotElements;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-pagination': McPagination;
  }
}

customElements.get('mc-pagination') || customElements.define('mc-pagination', McPagination);
