// lit-elements
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import type { CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { property, query, state } from 'lit/decorators.js';
// utils
import { Responsive } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// types
import type { Fit, Position, Trigger } from '@maersk-global/mds-shared-types';
import { IMcPopover, PopoverModalMode } from './types';
//floating-ui
import {
  arrow,
  autoUpdate,
  computePosition,
  detectOverflow,
  flip,
  limitShift,
  Middleware,
  offset,
  ReferenceElement,
  shift,
  size,
} from '@floating-ui/dom';
import type { Placement as FloatingPlacement } from '@floating-ui/dom';

export type { IMcPopover } from './types';

const OPEN_DELAY = 50;
const CLOSE_DELAY = 50;

/**
 * @element `mc-popover`
 * @summary Generic component that can be used to show popover on trigger element
 *
 * @event {CustomEvent} show - Dispatched when popover opens
 * @event {CustomEvent} hide - Dispatched when popover hides
 * @event {CustomEvent} scroll - Dispatched when popover container scrolls
 *
 * @slot - The default slot where the content of the popover displays
 * @slot `trigger` - slot where the element that will trigger popover goes
 * @slot `heading` - sets the modal heading when the popover is set to be shown as a modal for specific screen sizes, using the "modalmode" prop.
 * @slot `footer` - sets the modal footer when the popover is set to be shown as a modal for specific screen sizes, using the "modalmode" prop.
 *
 * @csspart `container` - for changing visuals of popover container
 * @csspart `content` - for changing visuals of popover content
 * @csspart `arrow` - for changing visuals of arrow
 */
export class McPopover extends Responsive(LitElement) implements IMcPopover {
  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private contentElements?: Element[];
  private hoverTimeout?: number;
  private latestClickTarget: EventTarget | null = null;
  private latestContextmenuEvent?: MouseEvent;
  private triggerElement?: HTMLElement;
  private latestOverflow = 0;
  private latestMouseOverElement: EventTarget | null = null;
  private eventReferences?: {
    onFocusIn?: () => void;
    onBlur?: (e: FocusEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onMouseOver?: (e: MouseEvent) => void;
    onMouseOut?: (e: MouseEvent | TouchEvent) => void;
    onContextMenu?: (e: MouseEvent) => void;
    onDocumentMousedown?: (e: MouseEvent | TouchEvent) => void;
    onDocumentTouchmove?: (e: TouchEvent | TouchEvent) => void;

    onTriggerMousedown?: (e: MouseEvent | TouchEvent) => void;
    onScroll?: () => void;
  } = {};

  @query('slot[name="footer"]')
  private footerSlot?: HTMLSlotElement;

  @state()
  private footerSlottedElements?: Element[];

  @property({ type: String })
  public trigger: Trigger = 'click focus';

  @property({ type: Object })
  public customtriggerelement?: HTMLElement | null;

  @property({ type: Boolean, reflect: true })
  public open = false;

  @property({ type: String })
  public position: Position = 'top-left';

  @property({ type: Boolean })
  public arrow = false;

  @property({ type: Array })
  public actionkeys = ['Enter', 'Space'];

  @property({ type: Boolean })
  public preventcloseonblur = false;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public width = 'auto';

  @property({ type: String })
  public maxwidth?: string;

  @property({ type: String })
  public maxheight?: string;

  @property({ type: String })
  public modalmode: PopoverModalMode = 'none';

  @property({ type: Boolean })
  public dontflip = false;

  @property({ type: Boolean })
  public dontshift = false;

  @property({ type: Boolean })
  public dontadjustheight = false;

  @property({ type: Number })
  public opendelay = OPEN_DELAY;

  @property({ type: Boolean })
  public contextmenuonside = false;

  @property({ type: Number }) public zindex?: number;

  @query('.content')
  public contentWrapper?: HTMLElement;

  @query('.container')
  public container?: HTMLElement;

  @query('.arrow')
  private arrowElement?: HTMLElement;

  private detectOverflowMiddleware: Middleware = {
    name: 'detectOverflowMiddleware',
    fn: async (state) => {
      const { top, bottom } = await detectOverflow(state, { padding: 8 });

      if (top > 0) {
        this.latestOverflow = top;
        const newHeight = state.rects.floating.height - top;
        if (this.container) {
          this.container.style.maxHeight = `${newHeight}px`;
        }
        return {};
      }

      if (bottom > 0) {
        this.latestOverflow = bottom;
        const newHeight = state.rects.floating.height - bottom;
        if (this.container) {
          this.container.style.maxHeight = `${newHeight}px`;
        }
        return {};
      }

      if (this.latestOverflow > 0 && top < 0 && bottom < 0 && this.container) {
        this.container.style.maxHeight = 'none';
      }

      return {};
    },
  };

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  /* render */
  protected render(): TemplateResult {
    const classes = {
      [this.fit]: true,
      open: this.open,
      'modal-on-x-small-screen': this.modalmode === 'x-small-screen',
    };

    const bodyStyles = {
      maxHeight: this.maxheight ? `calc(${this.maxheight} - var(--mds_core_popover_border-width) * 4)` : 'none',
      maxWidth: this.maxwidth || 'calc(100vw - 10px)',
    };

    const style = this.zindex ? { zIndex: this.zindex } : {};

    return html`
      <div class="mc-popover ${classMap(classes)}">
        <slot name="trigger" @slotchange=${this.onTriggerChange}></slot>
        <div
          part="content"
          data-cy="content"
          class="content"
          aria-describedby="popover-content-slot"
          style=${styleMap(style)}
        >
          <div part="container" class="container">
            ${this.renderHeading()}
            <div class="body-slot-wrapper mds-modal_body" style="${styleMap(bodyStyles)}">
              <slot @slotchange="${this.onContentChange}" id="popover-content-slot"></slot>
            </div>
            ${this.renderFooter()}
          </div>
          ${this.renderArrow()}
        </div>
      </div>
    `;
  }

  private renderHeading(): TemplateResult | null {
    return this.modalmode === 'none'
      ? null
      : html`<header>
          <slot class="mds-modal_title" name="heading"></slot>
          <mc-button
            class="mds-modal_close-button"
            label="Close"
            hiddenlabel
            appearance="neutral"
            variant="plain"
            icon="times"
            fit="${this.fit}"
            data-cy="close"
            @click="${this.hide}"
            disablediconslot
            disabledlabelslot
          ></mc-button>
        </header>`;
  }

  private renderFooter(): TemplateResult | null {
    const classes = {
      '--empty': !this.footerSlottedElements || this.footerSlottedElements.length === 0,
    };

    return this.modalmode === 'none'
      ? null
      : html`<footer class="${classMap(classes)}">
          <slot @slotchange=${this.updateFooter} name="footer"></slot>
        </footer>`;
  }

  private updateFooter(): void {
    this.footerSlottedElements = this.footerSlot?.assignedElements({ flatten: true });
  }

  private renderArrow(): TemplateResult {
    return this.arrow ? html`<div part="arrow" class="arrow" role="presentation"></div>` : html``;
  }

  /* lifecycle hooks */
  public async connectedCallback(): Promise<void> {
    super.connectedCallback();
    if (this.eventReferences) {
      this.eventReferences.onDocumentMousedown = this.onDocumentMousedown.bind(this);
      this.eventReferences.onDocumentTouchmove = this.onDocumentTouchmove.bind(this);
      this.eventReferences.onTriggerMousedown = this.onTriggerMousedown.bind(this);
      this.eventReferences.onFocusIn = this.onFocusIn.bind(this);
      this.eventReferences.onKeyDown = this.onKeyDown.bind(this);
      this.eventReferences.onMouseOver = this.onMouseOver.bind(this);
      this.eventReferences.onMouseOut = this.onMouseOut.bind(this);
      this.eventReferences.onContextMenu = this.onContextMenu.bind(this);
      this.eventReferences.onBlur = this.onBlur.bind(this);
      this.eventReferences.onScroll = this.onScroll.bind(this);
    }

    await super.updateComplete;
    this.addEventListeners();
  }

  public disconnectedCallback(): void {
    this.removeEventListeners();
    this.stop();
    this.latestClickTarget = null;
    this.latestMouseOverElement = null;
    super.disconnectedCallback();
  }

  private async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = undefined;
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }

  protected async firstUpdated(changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(changedProperties);
    this.onContentChange();

    // only to avoid the lit scheduled an update error
    await this.updateComplete;
    this.updateFooter();
  }

  protected async updated(changedProperties: PropertyValues): Promise<void> {
    super.updated(changedProperties);

    if (changedProperties.has('trigger') && this.trigger) {
      this.addRemoveTriggerEventListeners();
      this.removeEventListeners();
      this.addEventListeners();
    }

    if (changedProperties.has('customtriggerelement')) {
      if (this.customtriggerelement) {
        this.setTriggerElement();
        this.removeEventListeners();
        this.addEventListeners();
      }
    }

    if (changedProperties.has('open') && this.open !== changedProperties.get('open')) {
      if (this.modalmode === 'x-small-screen') {
        this.togglePageLevelScrollingInFullScreenModal(this.open);
      }

      if (this.open) {
        if (!this.triggerElement) {
          this.setTriggerElement();
        }
        if (!this.cleanup && this.triggerElement && this.contentWrapper) {
          this.cleanup = autoUpdate(this.triggerElement, this.contentWrapper, () => {
            requestAnimationFrame(() => this.reposition());
          });
        }
      } else {
        await this.stop();
      }
    }

    //when any prop is updated it should reposition
    this.reposition();
  }

  /* event handlers */
  private onTriggerChange(): void {
    this.setTriggerElement();
  }

  private onContentChange(): void {
    const contentSlot = this.shadowRoot?.querySelector('#popover-content-slot') as HTMLSlotElement;
    const assignedElements = contentSlot.assignedElements({ flatten: true });
    this.contentElements = this.getAllChildren(assignedElements);
    this.reposition();
  }

  private onFocusIn(): void {
    if (!this.open) {
      this.show();
    }
  }

  private onBlur(e: FocusEvent): void {
    if (this.preventcloseonblur) {
      return;
    }
    //clicking on the content causes focusout event as well, this checks if that was the case
    if (
      (e.relatedTarget && this.isTargetInComponent(e.relatedTarget)) ||
      (this.latestClickTarget && this.isTargetInComponent(this.latestClickTarget)) ||
      (this.latestMouseOverElement && this.isTargetInComponent(this.latestMouseOverElement)) ||
      e.relatedTarget === this.triggerElement
    ) {
      this.latestClickTarget = null;
      return;
    }
    this.hide();
  }

  private onDocumentMousedown(e: TouchEvent | MouseEvent): void {
    this.latestClickTarget = e.target;

    if (
      e.target !== this.triggerElement &&
      !this.contentElements?.includes(e.target as HTMLElement) &&
      !e.composedPath().includes(this)
    ) {
      if (this.customtriggerelement && e.composedPath().includes(this.customtriggerelement)) {
        return;
      }
      if (this.open) {
        this.hide();
      }
    }
  }

  private onDocumentTouchmove(e: TouchEvent): void {
    this.latestClickTarget = e.target;

    if (
      e.target !== this.triggerElement &&
      !this.contentElements?.includes(e.target as HTMLElement) &&
      !e.composedPath().includes(this)
    ) {
      if (this.customtriggerelement && e.composedPath().includes(this.customtriggerelement)) {
        return;
      }
      if (this.open) {
        this.hide();
      }
    }
  }

  private onTriggerMousedown(e: MouseEvent | TouchEvent): void {
    //return when the mouse click is not the 'main button'(LMB).
    if (e instanceof MouseEvent && e.button !== 0) {
      return;
    }

    if (this.trigger === 'contextmenu') {
      return;
    }

    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (this.open && e.code === 'Escape') {
      e.stopPropagation();
      this.hide();
      return;
    }

    const isActionable =
      this.actionkeys.includes(e.code) &&
      (e.target === this.triggerElement || this.triggerElement?.contains(e.target as HTMLElement));
    if (!isActionable) {
      return;
    }

    e.preventDefault();
    if (isActionable && this.open) {
      this.hide();
      return;
    }

    if (isActionable && !this.open) {
      this.show();
    }
  }

  private onMouseOver(e: MouseEvent): void {
    this.latestMouseOverElement = e.relatedTarget;
    if (this.hasTrigger('hover')) {
      const delay = this.opendelay ?? OPEN_DELAY;
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.show(), delay);
    }
  }

  private onMouseOut(): void {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = window.setTimeout(() => this.hide(), CLOSE_DELAY);
  }

  private onContextMenu(e: MouseEvent): void {
    const isTargetCustomTrigger = this.customtriggerelement && e.composedPath().includes(this.customtriggerelement);
    if (e.target === this.triggerElement || isTargetCustomTrigger) {
      e.preventDefault();
      this.latestContextmenuEvent = e;
      this.open = true;
      this.reposition();
      return;
    }
    this.hide();
  }

  private onScroll(): void {
    this.dispatchEvent(new Event('scroll'));
  }

  private handleScroll(): void {
    const isTouchDevice = 'touchmove' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      this.reposition();
    } else if (!isTouchDevice) {
      setTimeout(() => {
        this.hide();
      }, 200);
    }
  }

  /* utils */
  private reposition(): void {
    if (!this.open || !this.triggerElement) {
      return;
    }

    if (this.hasTrigger('contextmenu') && !this.contextmenuonside) {
      const virtualEl = {
        getBoundingClientRect(): Partial<DOMRect> {
          return {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
          };
        },
      } as ReferenceElement;

      if (this.contentWrapper) {
        computePosition(virtualEl, this.contentWrapper).then(() => {
          if (this.contentWrapper) {
            Object.assign(this.contentWrapper.style, {
              left: `${this.latestContextmenuEvent?.clientX}px`,
              top: `${this.latestContextmenuEvent?.clientY}px`,
            });
          }
        });
      }
      return;
    }

    const middleware = [
      offset({ ...this.getOffset(this.fit) }),
      this.dontflip ? null : flip(),
      this.dontshift
        ? null
        : shift({
            limiter: limitShift({
              offset: ({ rects, placement }) =>
                placement.startsWith('top') || placement.startsWith('bottom')
                  ? rects.reference.height / 2
                  : rects.reference.width / 2,
            }),
          }),
      this.dontadjustheight ? null : this.detectOverflowMiddleware,
      size({
        apply: ({ elements, rects }) => {
          Object.assign(elements.floating.style, {
            maxWidth: this.maxwidth ? this.maxwidth : 'none',
            maxHeight: this.maxheight ? this.maxheight : 'none',
            width: this.width === 'trigger' ? `${rects.reference.width}px` : this.width,
          });
        },
      }),
      this.arrow && this.arrowElement
        ? arrow({
            element: this.arrowElement,
            padding: this.getArrowPadding(this.fit),
          })
        : null,
    ];

    if (this.contentWrapper) {
      computePosition(this.triggerElement, this.contentWrapper, {
        placement: this.mapPosition(this.position),
        middleware,
        strategy: 'fixed',
      }).then(({ x, y, middlewareData, placement }): void => {
        const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]];
        if (this.contentWrapper) {
          this.contentWrapper.setAttribute('data-position', placement);

          Object.assign(this.contentWrapper.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        }

        if (this.arrow && middlewareData) {
          const arrowX = middlewareData.arrow?.x;
          const arrowY = middlewareData.arrow?.y;
          const top = typeof arrowY === 'number' ? `${arrowY}px` : '';
          const right = '';
          const bottom = '';
          const left = typeof arrowX === 'number' ? `${arrowX}px` : '';

          if (this.arrowElement && staticSide) {
            Object.assign(this.arrowElement.style, {
              top,
              right,
              bottom,
              left,
              [staticSide]: `var(--mds_core_popover_${this.fit}_arrow_margin)`,
            });
          }
        }
      });
    }
  }

  public show(): void {
    this.open = true;
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent('show', { bubbles: true, composed: true }));
    });
  }

  public hide(): void {
    this.open = false;
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent('hide', { bubbles: true, composed: true }));
    });
  }

  private addRemoveTriggerEventListeners(): void {
    if (this.eventReferences?.onTriggerMousedown) {
      if (this.trigger === 'manual') {
        this.triggerElement?.removeEventListener('mousedown', this.eventReferences.onTriggerMousedown);
      } else {
        this.triggerElement?.addEventListener('mousedown', this.eventReferences.onTriggerMousedown);
      }
    }
  }

  private setTriggerElement(): void {
    if (this.customtriggerelement) {
      this.triggerElement = this.customtriggerelement;
      this.addRemoveTriggerEventListeners();
      return;
    }

    let newTrigger = this.querySelector<HTMLElement>('[slot="trigger"]') as HTMLElement | undefined;
    if (newTrigger instanceof HTMLSlotElement) {
      newTrigger = newTrigger.assignedElements({ flatten: true })[0] as HTMLElement;
    }

    this.triggerElement = newTrigger;

    this.addRemoveTriggerEventListeners();

    if (!this.triggerElement) {
      console.warn(
        `Could not set a trigger element. Popover needs an element in a "trigger" slot to function properly`,
      );
      return;
    }
  }

  private hasTrigger(triggerType: Trigger): boolean {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  }

  private getOffset(fit: Fit): { mainAxis: number; crossAxis: number } {
    const fitOffsets: { [key in Fit]?: { mainAxis: number; crossAxis: number } } = {
      small: { mainAxis: 8, crossAxis: 0 },
      medium: { mainAxis: 8, crossAxis: 0 },
      large: { mainAxis: 8, crossAxis: 0 },
    };

    return fitOffsets[fit] || { mainAxis: 0, crossAxis: 0 };
  }

  private getArrowPadding(fit: Fit): number {
    const fitPaddings: { [key in Fit]?: number } = {
      small: 6,
      medium: 7,
      large: 8,
    };

    return fitPaddings[fit] || 7;
  }

  private mapPosition(position: Position): FloatingPlacement {
    const positionMap: { [key in Position]: FloatingPlacement } = {
      'bottom-center': 'bottom',
      'bottom-left': 'bottom-start',
      'bottom-right': 'bottom-end',
      'left-bottom': 'left-end',
      'left-center': 'left',
      'left-top': 'left-start',
      'right-bottom': 'right-end',
      'right-center': 'right',
      'right-top': 'right-start',
      'top-center': 'top',
      'top-left': 'top-start',
      'top-right': 'top-end',
    };
    return positionMap[position] || 'bottom-start';
  }

  private addEventListeners(): void {
    if (this.hasTrigger('manual')) {
      return;
    }
    const element = this.customtriggerelement ? this.customtriggerelement : this;
    //these listerens are always added to enable closing on click outside/Escape and opening on Enter
    if (this.eventReferences?.onDocumentMousedown) {
      document.addEventListener('mousedown', this.eventReferences.onDocumentMousedown, true);
    }
    if (this.eventReferences?.onDocumentTouchmove) {
      document.addEventListener('touchmove', this.eventReferences.onDocumentTouchmove, true);
    }

    if (this.eventReferences?.onKeyDown) {
      element.addEventListener('keydown', this.eventReferences.onKeyDown);
    }

    if (this.eventReferences?.onBlur) {
      element.addEventListener('blur', this.eventReferences.onBlur, true);
    }

    if (this.eventReferences?.onScroll && this.container) {
      this.container.addEventListener('scroll', this.eventReferences.onScroll, true);
    }

    if (this.eventReferences?.onMouseOver) {
      element.addEventListener('mouseover', this.eventReferences?.onMouseOver);
    }

    if (this.hasTrigger('focus') && this.eventReferences?.onFocusIn) {
      element.addEventListener('focusin', this.eventReferences.onFocusIn, true);
    }

    if ('addEventListener' in element) {
      if (this.eventReferences?.onKeyDown) {
        element.addEventListener('keydown', this.eventReferences?.onKeyDown);
      }

      if (this.eventReferences?.onBlur) {
        element.addEventListener('blur', this.eventReferences?.onBlur, true);
      }

      if (this.hasTrigger('focus') && this.eventReferences?.onFocusIn) {
        element.addEventListener('focusin', this.eventReferences?.onFocusIn, true);
      }

      if (this.hasTrigger('hover')) {
        if (this.eventReferences?.onMouseOut) {
          element.addEventListener('mouseout', this.eventReferences?.onMouseOut);
        }
      }
    }

    if (this.hasTrigger('contextmenu') && this.eventReferences?.onContextMenu) {
      document.addEventListener('contextmenu', this.eventReferences?.onContextMenu);
    }

    document.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private removeEventListeners(): void {
    const element = this.customtriggerelement ? this.customtriggerelement : this;

    if (this.eventReferences?.onDocumentMousedown) {
      document.removeEventListener('mousedown', this.eventReferences.onDocumentMousedown, true);
    }
    if (this.eventReferences?.onDocumentTouchmove) {
      document.removeEventListener('touchmove', this.eventReferences.onDocumentTouchmove, true);
    }
    if (this.eventReferences?.onKeyDown) {
      element.removeEventListener('keydown', this.eventReferences.onKeyDown);
    }

    if (this.eventReferences?.onBlur) {
      element.removeEventListener('blur', this.eventReferences?.onBlur, true);
    }

    if (this.eventReferences?.onFocusIn) {
      element.removeEventListener('focusin', this.eventReferences.onFocusIn, true);
    }

    if (this.eventReferences?.onMouseOver) {
      element.removeEventListener('mouseover', this.eventReferences.onMouseOver);
    }

    if (this.eventReferences?.onMouseOut) {
      element.removeEventListener('mouseout', this.eventReferences.onMouseOut);
    }

    if (this.eventReferences?.onContextMenu) {
      document.removeEventListener('contextmenu', this.eventReferences.onContextMenu);
    }

    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  private isTargetInComponent(target: EventTarget): boolean {
    if (!this.contentElements) {
      return false;
    }

    return this.contentElements.includes(target as HTMLElement);
  }

  private getAllChildren(elements: Element[]): Element[] {
    let result: Element[] = [];
    elements.forEach((element: Element) => {
      if (element instanceof HTMLSlotElement) {
        const nestedAssignedElements: Element[] = element.assignedElements({ flatten: true });
        result = [...result, ...this.getAllChildren(nestedAssignedElements)];
      } else {
        result.push(element);
        if (element.children) {
          const nestedElements: Element[] = Array.from(element.children);
          result = [...result, ...this.getAllChildren(nestedElements)];
        }
      }
    });
    return result;
  }
}

customElements.get('mc-popover') || customElements.define('mc-popover', McPopover);

declare global {
  interface HTMLElementTagNameMap {
    'mc-popover': McPopover;
  }
}
