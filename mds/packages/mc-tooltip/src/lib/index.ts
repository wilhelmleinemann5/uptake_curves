// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// types
import { TooltipAppearance, Fit, IMcTooltip, TooltipPosition, TooltipWidth } from './types';
// styles
import { styles } from './styles/index.styles';
// mds components
import '@maersk-global/mds-components-core-popover';
import { classMap } from 'lit/directives/class-map.js';

export type { IMcTooltip } from './types';

const OPEN_DELAY = 50;
const CLOSE_DELAY = 50;

/**
 * @element `mc-tooltip`

 * @event {CustomEvent} show - Dispatched when tooltip opens
 * @event {CustomEvent} hide - Dispatched when tooltip hides
 *
 * @csspart `tooltip-content` - for changing visuals of the tooltip content area.
 * @csspart `tooltip-arrow` - for changing visuals of the tooltip arrow.
 *
 * @slot The HTML content of the mc-tooltip.
 * @slot `trigger` - The trigger element which toggles the tooltip.
 */
export class McTooltip extends LitElement implements IMcTooltip {
  @property({ type: String })
  public appearance: TooltipAppearance = 'neutral-default';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public open = false;

  @property({ type: String })
  public position: TooltipPosition = 'top-left';

  @property({ type: String })
  public width: TooltipWidth = 'auto';

  @property({ type: Boolean })
  public dontflip = false;

  @property({ type: Boolean })
  public dontshift = false;

  @property({ type: Number })
  public opendelay = OPEN_DELAY;

  @property({ type: Number }) public zindex?: number;

  @queryAssignedElements({ slot: '', flatten: true })
  private contentSlot!: Array<HTMLElement>;

  @state()
  private hasContentSlot = false;

  /* styles */
  public static get styles(): CSSResultArray {
    return styles;
  }

  protected render(): TemplateResult {
    const classes = {
      [this.fit]: true,
      neutral: this.appearance === 'neutral-default' || this.appearance === 'default',
      'neutral-inverse': this.appearance === 'neutral-inverse' || this.appearance === 'inverse',
      'hidden-content': !this.hasContentSlot,
    };
    return html` <div class="mc-tooltip ${classMap(classes)}">
      <mc-popover
        exportparts="container: popover-container, arrow: popover-arrow"
        ?dontflip=${this.dontflip}
        ?open="${this.open}"
        ?arrow="${this.hasContentSlot ? true : false}"
        .fit="${this.fit}"
        .position="${this.position}"
        .opendelay="${this.opendelay}"
        .closedelay="${CLOSE_DELAY}"
        .zindex="${this.zindex}"
        maxwidth="${ifDefined(this.width ? this.computeWidth(this.width) : undefined)}"
        trigger="hover focus click"
      >
        <slot name="trigger" slot="trigger"></slot>
        <div class="content"><slot @slotchange=${this.onContentSlotChange}></slot></div>
      </mc-popover>
    </div>`;
  }

  private computeWidth(width: 'auto' | number): string {
    return width === 'auto' ? '' : `${width}px`;
  }

  protected onContentSlotChange(): void {
    this.hasContentSlot = this.contentSlot.length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-tooltip': McTooltip;
  }
}

customElements.get('mc-tooltip') || customElements.define('mc-tooltip', McTooltip);
