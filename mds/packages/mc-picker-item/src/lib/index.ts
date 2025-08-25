// lit-elements
import { html, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';

// styles
import { styles } from './styles/index.styles';

// types
import { IMcPickerItem, PickerItemWidth } from './types';
import { McListItem } from '@maersk-global/mds-components-core-list-item';

export type { IMcPickerItem } from './types';

/**
 * @element `mc-picker-item`
 * @summary Picker item represents and individual item in the mc-picker.
 * @since 2.0.0-beta.7
 *
 * @slot icon - The `icon` slot where an `mc-icon` or any other forms of graphics go.
 * @slot trailingicon - The `trailingicon` slot where an `mc-icon` or any other forms of graphics go.
 *
 * @csspart `button` - for changing visuals of button
 * @csspart `icon` - for changing visuals of icon
 *
 */
export class McPickerItem extends McListItem implements IMcPickerItem {
  @property({ type: String })
  public width?: PickerItemWidth;

  public static get styles(): CSSResultArray {
    return styles;
  }

  public constructor() {
    super();
    this.disablediconslot = true;
    this.disabledlabelslot = true;
    this.justifyitems = 'center';
    this.hiddencheckmark = true;
  }

  public render(): TemplateResult {
    const classes = {
      [`${this.fit}`]: true,
      'fixed-width': this.width === 'fixed',
    };

    return html`<div class="mc-picker-item  ${classMap(classes)}">${super.render()}</div>`;
  }
}
customElements.get('mc-picker-item') || customElements.define('mc-picker-item', McPickerItem);
