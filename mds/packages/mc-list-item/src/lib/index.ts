import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

// utils
import { setHostCssClass } from '@maersk-global/mds-components-utils';

// styles
import { styles } from './styles/index.styles';

// types
import { IMcListItem } from './types';
import { McListItemBase } from './base';
import { McCheckbox } from '@maersk-global/mds-components-core-checkbox';

// mds-components used with mc-list-item
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-checkbox';

export * from './base';
export type { IMcListItem } from './types';
/**
 * @element `mc-list-item`
 * @summary List item is supposed to be used and repeated inside an `mc-list`.
 *
 * @event {CustomEvent<IMcListItem>} focus - Dispatched when the list item receives focus.
 * @event {CustomEvent<IMcListItem>} blur - Dispatched when the list item loses focus.
 *
 * @slot - The default slot where main label goes.
 * @slot sublabel - The `sublabel` slot where the sublabel goes.
 * @slot icon - The `icon` slot where an `mc-icon` or any other forms of graphics go.
 * @slot trailingicon - The `trailingicon` slot where an `mc-icon` or any other forms of graphics go.
 * @slot `badge` - Used if you want to attach badge to the mc-button.
 *
 * @csspart `button` - for changing visuals of button
 * @csspart `text-and-icon` - for changing visuals of text-and-icon wrapper
 * @csspart `icon` - for changing visuals of icon
 */
export class McListItem extends McListItemBase implements IMcListItem {
  @query('mc-checkbox')
  private mcCheckbox?: McCheckbox;

  public static get styles(): CSSResultArray {
    return [super.styles, styles];
  }

  /* render */
  public render(): TemplateResult {
    if (this.visible) {
      const classes = {
        [`${this.fit}`]: true,
        selected: this.selected,
        focused: this.focused,
        vertical: this.orientation === 'vertical',
        'icon-leading': this.hasLeadingIcon(),
        [`${setHostCssClass(this.classList, ['hover', 'focus'])}`]: true,
      };
      return this.type && this.type === 'checkbox'
        ? html`<mc-checkbox
            class="mc-list-item mc-checkbox ${classMap(classes)}"
            tabindex="${ifDefined(this.tabindex)}"
            ?disabled="${this.disabled}"
            .fit="${this.fit}"
            .ariarole="${this.ariarole}"
            name="test"
            value="${ifDefined(this.value ? this.value.toString() : undefined)}"
            ?checked="${this.selected}"
            @blur=${(): boolean => (this.focused = false)}
            @focus=${(): boolean => (this.focused = true)}
            ><slot slot="label">${this.label}</slot></mc-checkbox
          >`
        : html`<mc-button
            class="mc-list-item mc-button mc-text-and-icon ${classMap(classes)}"
            exportparts="button, text-and-icon"
            appearance="neutral"
            ?disabled="${this.disabled}"
            .fit="${this.fit}"
            .href="${this.href}"
            .target="${this.target}"
            .justifyitems="${this.getJustifyItems()}"
            ?hiddenlabel=${this.hiddenlabel}
            .tabindex="${this.tabindex}"
            .ariarole="${this.ariarole}"
            ?disabledlabelslot=${this.disabledlabelslot}
            ?disablediconslot=${this.disablediconslot}
            .label="${this.label}"
            @blur=${this.onBlur}
            @focus=${this.onFocus}
            variant="plain"
            width="full-width"
          >
            ${this.disablediconslot ? null : html`<slot slot="icon" name="icon">${this.renderIcon(this.icon)}</slot>`}
            ${this.disabledlabelslot ? null : html`${this.renderText()}`}
            ${this.disablediconslot
              ? null
              : html`<slot slot="trailingicon" name="trailingicon">${this.renderIcon(this.trailingicon)}</slot>`}
            <slot slot="badge" name="badge"></slot>
          </mc-button>`;
    }
    return html``;
  }

  protected async updated(changedProperties: PropertyValues): Promise<void> {
    super.updated(changedProperties);

    // This's a workaround as the `willUpdate` hook couldn't be used any longer because the icon wouldn't
    // update timely with selected property changes, causing misalignment in dropdown options.
    // The issue was reproducible in `set and get value` example story and also reported in the #2778.
    await this.updateComplete;

    if (changedProperties.has('ariarole') || changedProperties.has('selected')) {
      if (this.ariarole === 'option' && this.type === 'button' && !this.hiddencheckmark) {
        this.trailingicon = this.selected ? 'check' : 'empty';
      }
      if (this.ariarole === 'option' && this.type === 'checkbox' && this.mcCheckbox) {
        this.mcCheckbox.checked = this.selected;
      }
    }
  }

  public focus(options?: FocusOptions): void {
    super.focus(options);
    this.mcCheckbox?.focus(options);
  }

  public blur(): void {
    this.mcCheckbox?.blur();
  }

  private onFocus(): void {
    this.focused = true;
    this.dispatchEvent(new CustomEvent<IMcListItem>('onfocus', { detail: this, bubbles: true }));
  }

  private onBlur(): void {
    this.focused = false;
    this.dispatchEvent(new CustomEvent<IMcListItem>('onblur', { detail: this, bubbles: true }));
  }
}

customElements.get('mc-list-item') || customElements.define('mc-list-item', McListItem);

declare global {
  interface HTMLElementTagNameMap {
    'mc-list-item': McListItem;
  }
}
