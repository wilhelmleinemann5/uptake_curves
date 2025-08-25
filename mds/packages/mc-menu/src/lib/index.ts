import { html, TemplateResult, LitElement, PropertyValues } from 'lit';
import { property, queryAssignedElements, query } from 'lit/decorators.js';

// types
import { IMcMenu } from './types';
import { IMcPopover } from '@maersk-global/mds-components-core-popover/src/lib/types';
import { Position, Trigger, Fit } from '@maersk-global/mds-shared-types';
import { McList } from '@maersk-global/mds-components-core-list';

// mds-components used with mc-menu
import '@maersk-global/mds-components-core-popover';

export type { IMcMenu } from './types';

/**
 * @element `mc-menu`
 * @summary Menu in which a list of items is shown in a popover that is triggered by an element.
 *
 * @slot - The default slot where the content of the list goes, including list items or dividers.
 * @slot trigger - The trigger slot where the element which triggers the menu must go.
 */
export class McMenu extends LitElement implements IMcMenu {
  @queryAssignedElements({ slot: '', flatten: true })
  private mcList?: Array<McList>;

  @query('mc-popover')
  protected mcPopover?: IMcPopover;

  @property({ type: Boolean })
  public arrow = false;

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: String })
  public maxwidth?: string;

  @property({ type: String })
  public maxheight?: string;

  @property({ type: Boolean, reflect: true })
  public open = false;

  @property({ type: String })
  public position: Position = 'bottom-left';

  @property({ type: String })
  public trigger: Trigger = 'click';

  @property({ type: Boolean })
  public contextmenuonside = false;

  @property({ type: Number }) public zindex?: number;

  public firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (this.mcList) {
      this.mcList[0].role = 'menu';
      this.mcList[0].scrolltofocused = true;
      this.mcList[0].noborder = true;
      this.mcList[0].addEventListener('listchange', () => {
        if (this.mcPopover && this.mcPopover.hide) {
          this.mcPopover.hide();
        }
      });
    }
  }

  public updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('fit') && this.mcList) {
      this.mcList[0].fit = this.fit;
    }
  }

  protected render(): TemplateResult {
    return html`<mc-popover
      class="mc-menu"
      ?arrow="${this.arrow}"
      .fit="${this.fit}"
      .maxheight="${this.maxheight}"
      .maxwidth="${this.maxwidth}"
      ?open="${this.open}"
      ?contextmenuonside="${this.contextmenuonside}"
      .position="${this.position}"
      .trigger="${this.trigger}"
      .zindex="${this.zindex}"
      @show="${this.handlePopoverShow}"
      @hide="${this.handlePopoverHide}"
    >
      <slot slot="trigger" name="trigger"></slot>
      <slot></slot>
    </mc-popover>`;
  }

  private handlePopoverShow(): void {
    this.open = true;
  }

  private handlePopoverHide(): void {
    this.open = false;
  }
}

customElements.get('mc-menu') || customElements.define('mc-menu', McMenu);
declare global {
  interface HTMLElementTagNameMap {
    'mc-menu': McMenu;
  }
}
