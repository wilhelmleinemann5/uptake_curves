import { CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

// utils
import { setHostCssClass } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { IMcSegmentedControlItem } from './types';
import { McListItemBase } from '@maersk-global/mds-components-core-list-item';

// mds-components used with mc-segmented-control-item
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-checkbox';

export type { IMcSegmentedControlItem } from './types';

/**
 * @element `mc-segmented-control-item`
 * @summary The segmented control item is supposed to be used and repeated inside an `mc-segmented-control`.
 * @since 2.29.0
 *
 * @event {CustomEvent<IMcSegmentedControlItem>} onfocus - Dispatched when the toggle button receives focus.
 * @event {CustomEvent<IMcSegmentedControlItem>} onblur - Dispatched when the toggle button loses focus.
 *
 * @slot - The default slot where main label goes.
 * @slot sublabel - The `sublabel` slot where the sublabel goes.
 * @slot icon - The `icon` slot where an `mc-icon` or any other forms of graphics go.
 * @slot trailingicon - The `trailingicon` slot where an `mc-icon` or any other forms of graphics go.
 *
 * @csspart `button` - for changing visuals of button
 * @csspart `text-and-icon` - for changing visuals of text-and-icon wrapper
 * @csspart `icon` - for changing visuals of icon
 */
export class McSegmentedControlItem extends McListItemBase implements IMcSegmentedControlItem {
  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  /* render */
  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      selected: this.selected,
      focused: this.focused,
      [`${setHostCssClass(this.classList, ['hover', 'focus'])}`]: true,
    };

    return html`<mc-button
      class="mc-segmented-control-item mc-button mc-text-and-icon ${classMap(classes)}"
      exportparts="button, text-and-icon"
      appearance="${this.selected ? 'inverse' : 'neutral'}"
      .fit="${this.fit}"
      .href="${this.href}"
      justifyitems="${super.getJustifyItems()}"
      ?hiddenlabel=${this.hiddenlabel}
      .tabindex="${this.disabled ? -1 : this.tabindex}"
      .ariarole="${this.ariarole}"
      .label="${this.label}"
      variant="${this.selected ? 'filled' : 'plain'}"
      width="full-width"
    >
      <slot slot="icon" name="icon">${this.renderIcon(this.icon)}</slot>
      ${this.renderText()}
      <slot slot="trailingicon" name="trailingicon">${this.renderIcon(this.trailingicon)}</slot>
      <slot slot="badge" name="badge"></slot>
    </mc-button>`;
  }
}

customElements.get('mc-segmented-control-item') ||
  customElements.define('mc-segmented-control-item', McSegmentedControlItem);

declare global {
  interface HTMLElementTagNameMap {
    'mc-segmented-control-item': McSegmentedControlItem;
  }
}
