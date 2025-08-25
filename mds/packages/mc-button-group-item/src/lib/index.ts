import { CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

// utils
import { setHostCssClass } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { IMcButtonGroupItem } from './types';
import { McListItemBase } from '@maersk-global/mds-components-core-list-item';

// mds-components used with mc-button-group-item
import '@maersk-global/mds-components-core-button';

export type { IMcButtonGroupItem } from './types';

/**
 * @element `mc-button-group-item`
 * @summary The button group item is supposed to be used and repeated inside an `mc-button-group`.
 * @since 2.27.0
 *
 * @event {CustomEvent<IMcButtonGroupItem>} focus - Dispatched when the toggle button receives focus.
 * @event {CustomEvent<IMcButtonGroupItem>} blur - Dispatched when the toggle button loses focus.
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
export class McButtonGroupItem extends McListItemBase implements IMcButtonGroupItem {
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
      class="mc-button-group-item mc-button mc-text-and-icon ${classMap(classes)}"
      exportparts="button, text-and-icon"
      appearance="${this.selected ? 'primary' : 'neutral'}"
      .fit="${this.fit}"
      .href="${this.href}"
      .justifyitems="${super.getJustifyItems()}"
      ?hiddenlabel=${this.hiddenlabel}
      .tabindex="${this.disabled ? -1 : this.tabindex}"
      .ariarole="${this.ariarole}"
      .label="${this.label}"
      variant="${this.selected ? 'filled' : 'outlined'}"
      width="full-width"
    >
      <slot slot="icon" name="icon">${this.renderIcon(this.icon)}</slot>
      ${this.renderText()}
      <slot slot="trailingicon" name="trailingicon">${this.renderIcon(this.trailingicon)}</slot>
      <slot slot="badge" name="badge"></slot>
    </mc-button>`;
  }
}

customElements.get('mc-button-group-item') || customElements.define('mc-button-group-item', McButtonGroupItem);

declare global {
  interface HTMLElementTagNameMap {
    'mc-button-group-item': McButtonGroupItem;
  }
}
