import { PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';

// utils
import { DisabledState } from '@maersk-global/mds-components-utils';

// types
import {
  Orientation,
  IMcListItem,
  AriaRoles,
  McListItemType,
  JustifyItems,
  McListValueType,
  Target,
} from '@maersk-global/mds-shared-types';
import { McTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon';
import { McButton } from '@maersk-global/mds-components-core-button';

// mds-components used with mc-list-item
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-checkbox';

export class McListItemBase extends DisabledState(McTextAndIcon) implements IMcListItem {
  @query('mc-button')
  protected mcButton?: McButton;

  @property({ type: String })
  public type: McListItemType = 'button';

  @property({ type: Boolean, reflect: true })
  public selected = false;

  @property({ type: Boolean, reflect: true })
  public focused = false;

  @property({ type: String })
  public justifyitems?: JustifyItems;

  @property({ type: Boolean })
  public hiddencheckmark = false;

  @property({ type: String })
  public href = '';

  @property({ type: String })
  public target?: Target;

  @property({ type: String })
  public ariarole: AriaRoles = 'listitem';

  @property({ type: String, attribute: true, reflect: true })
  public orientation: Orientation = 'vertical';

  @property({ type: Number })
  public tabindex?: number;

  @property({ type: Boolean, reflect: true })
  public visible?: boolean = true;

  @property({ type: String, reflect: true })
  public value: McListValueType = undefined;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('icon') && this.icon && this.mcButton) {
      this.mcButton.cssclass = this.hasLeadingIcon() ? 'icon-leading' : undefined;
    }

    if (changedProperties.has('trailingicon') && this.trailingicon && this.mcButton) {
      this.mcButton.cssclass = this.hasTrailingIcon() ? 'icon-trailing' : undefined;
    }
  }

  protected getJustifyItems(): JustifyItems {
    if (this.orientation === 'horizontal' || this.hiddenlabel) {
      return 'center';
    }

    return this.justifyitems || 'left';
  }

  public focus(options?: FocusOptions): void {
    this.mcButton?.focus(options);
  }

  public blur(): void {
    this.mcButton?.blur();
  }
}
