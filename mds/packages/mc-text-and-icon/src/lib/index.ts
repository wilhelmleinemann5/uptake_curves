// lit-elements
import { LitElement, html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// styles
import { styles } from './styles/index.styles';

// types
import { IMcTextAndIcon, FitToIconSize, AriaRoles } from './types';
import type { Fit } from '@maersk-global/mds-shared-types';
import { IMcBadge } from '@maersk-global/mds-components-core-badge/src/lib/types';

// mds-components used with mc-text-and-icon
import '@maersk-global/mds-components-core-icon';

export type { IMcTextAndIcon } from './types';

/**
 * @element `mc-text-and-icon`
 *
 * @slot - The default slot for the label text. Used to display custom text/icon
 * @slot `sublabel` - Used to display custom custom sublabel text
 * @slot `icon` - The icon HTML
 * @slot `trailingicon` - The trailing icon HTML
 * @slot `badge` - Used if you want to attach badge to the mc-button.
 *
 * @csspart `text-and-icon` - for changing visuals of text and icons container
 * @csspart `text-and-icon-labels` - for changing visuals of text
 * @csspart `text-and-icon-label` - for changing visuals of label text
 * @csspart `text-and-icon-sublabel` - for changing visuals of sublabel text
 * @csspart `icon` - for changing visuals of icon
 */

enum SlotNames {
  LeadingIcon = 'icon',
  TrailingIcon = 'trailingicon',
  Badge = 'badge',
}

export class McTextAndIcon extends LitElement implements IMcTextAndIcon {
  protected fitToIconSize: FitToIconSize = {
    large: '24',
    medium: '20',
    small: '20',
  };

  @property({ type: Boolean })
  public disablediconslot = false;

  @property({ type: Boolean })
  public disabledlabelslot = false;

  @property({ type: String })
  public ariarole: AriaRoles | undefined;

  @state()
  private hasLabelSlot = false;

  @state()
  public hasLabelLinkSlot = false;

  @state()
  private hasLeadingIconSlot = false;

  @state()
  private hasTrailingIconSlot = false;

  @state()
  private badgeCssClasses: { [key: string]: boolean } = {};

  @property({ type: String, reflect: true })
  public fit: Fit = 'medium';

  @property({ type: String })
  public icon = '';

  @property({ type: String })
  public trailingicon = '';

  @property({ type: String })
  public label = '';

  @property({ type: String })
  public sublabel = '';

  @property({ type: Boolean })
  public hiddenlabel = false;

  @queryAssignedElements({ slot: '', flatten: true })
  private labelSlotElements!: Array<HTMLElement>;

  @queryAssignedElements({ slot: SlotNames.LeadingIcon, flatten: true })
  private leadingIconSlotElements!: Array<HTMLElement>;

  @queryAssignedElements({ slot: SlotNames.TrailingIcon, flatten: true })
  private trailingIconSlotElements!: Array<HTMLElement>;

  @queryAssignedElements({ slot: SlotNames.Badge, flatten: true })
  private badgeSlotElements!: Array<HTMLElement>;

  public static get styles(): CSSResultArray {
    return styles;
  }

  protected render(): TemplateResult {
    return this.renderTextAndIcon();
  }

  public renderTextAndIcon(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      'hidden-label': this.hiddenlabel,
      'icon-leading': this.hasLeadingIcon(),
      'icon-trailing': this.hasTrailingIcon(),
      ...this.badgeCssClasses,
    };
    return html`<div part="text-and-icon" class="mc-text-and-icon ${classMap(classes)}">
        ${this.renderLeadingIcon()} ${this.renderText()} ${this.renderTrailingIcon()}
      </div>
      <slot class="badge" @slotchange=${this.onBadgeSlotChange} name="${SlotNames.Badge}"></slot>`;
  }

  protected renderText(): TemplateResult {
    return this.disabledlabelslot
      ? html`${this.label}`
      : html`<span class="labels" part="text-and-icon-labels">
          <slot @slotchange=${this.onLabelSlotChange} part="text-and-icon-label" class="label" data-cy="label"
            >${this.label}</slot
          >
          <slot part="text-and-icon-sublabel" name="sublabel" class="sublabel">${this.sublabel}</slot>
        </span>`;
  }

  protected renderLeadingIcon(): TemplateResult | null {
    return this.disablediconslot
      ? this.icon
        ? this.renderIcon(this.icon)
        : null
      : html`<slot class="leading-icon" name="${SlotNames.LeadingIcon}" @slotchange=${this.onLeadingIconSlotChange}
          >${this.icon ? this.renderIcon(this.icon) : ''}</slot
        >`;
  }

  protected renderTrailingIcon(): TemplateResult | null {
    return this.disablediconslot
      ? this.trailingicon
        ? this.renderIcon(this.trailingicon)
        : null
      : html`<slot
          class="trailing-icon"
          part="trailing-icon"
          name="${SlotNames.TrailingIcon}"
          @slotchange=${this.onTrailingIconSlotChange}
          >${this.trailingicon ? this.renderIcon(this.trailingicon) : ''}</slot
        >`;
  }

  protected renderIcon(icon: string): TemplateResult | null {
    return icon || icon === 'empty'
      ? html`<mc-icon
          exportparts="icon"
          aria-hidden="true"
          icon=${icon === 'empty' ? '' : icon}
          size=${ifDefined(this.fitToIconSize[this.fit])}
        ></mc-icon>`
      : null;
  }

  // checks for label
  protected hasLabel(): boolean {
    return (this.label && this.label.length > 0) || this.hasLabelSlot;
  }

  private onLabelSlotChange(): void {
    if (this.labelSlotElements.length > 0) {
      const hasLink = this.labelSlotElements[0].nodeName.toLocaleLowerCase() === 'a';
      const parentHasLink =
        (this.labelSlotElements[0].parentElement.querySelector('slot.label') as HTMLSlotElement)
          ?.assignedElements({
            flatten: true,
          })[0]
          ?.nodeName.toLocaleLowerCase() === 'a';
      this.hasLabelLinkSlot = hasLink || parentHasLink;
      if (this.ariarole && this.ariarole !== 'listitem' && this.hasLabelLinkSlot) {
        this.labelSlotElements[0].setAttribute('role', this.ariarole);
      }
    }
    this.hasLabelSlot = this.labelSlotElements.length > 0 || (this.label && this.label.length > 0);
  }

  // checks for leading icon
  protected hasLeadingIcon(): boolean {
    return (this.icon && this.icon.length > 0) || this.hasLeadingIconSlot;
  }

  private onLeadingIconSlotChange(): void {
    this.hasLeadingIconSlot = this.leadingIconSlotElements.length > 0;
  }

  // checks for trailing icon
  protected hasTrailingIcon(): boolean {
    return (this.trailingicon && this.trailingicon.length > 0) || this.hasTrailingIconSlot;
  }

  private onTrailingIconSlotChange(): void {
    this.hasTrailingIconSlot = this.trailingIconSlotElements.length > 0;
  }

  // checks for badge
  private onBadgeSlotChange(): void {
    if (this.badgeSlotElements.length > 0) {
      const badge = this.badgeSlotElements[0] as IMcBadge;
      this.badgeCssClasses = {
        'badge-pinned': badge.display === 'pinned',
        'badge-inline': badge.display === 'inline',
        'badge-top': badge.position === 'top',
        'badge-bottom': badge.position === 'bottom',
        'badge-left': badge.position === 'left',
        'badge-right': badge.position === 'right',
      };
    }
  }
}
customElements.get('mc-text-and-icon') || customElements.define('mc-text-and-icon', McTextAndIcon);
